# Booking Appointment System - Implementation Guide

## 🎯 Recommended Solution: Supabase

### Why Supabase?
- ✅ **Scalable**: PostgreSQL database that grows with your business
- ✅ **Secure**: Row-level security, built-in authentication, HIPAA considerations
- ✅ **Maintainable**: Type-safe with TypeScript, easy to manage
- ✅ **Cost-effective**: Free tier, then pay-as-you-scale
- ✅ **Feature-rich**: Database, real-time subscriptions, edge functions, storage

---

## 📋 Implementation Steps

### Step 1: Install Supabase

```bash
npm install @supabase/supabase-js
npm install @supabase/ssr  # For Next.js App Router
```

### Step 2: Set Up Environment Variables

Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key  # Server-side only
```

### Step 3: Create Supabase Client Utilities

**File: `lib/supabase/client.ts`**
```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

**File: `lib/supabase/server.ts`**
```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
```

### Step 4: Create Database Schema

Run this SQL in Supabase SQL Editor:

```sql
-- Create appointments table
CREATE TABLE appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  location TEXT NOT NULL CHECK (location IN ('lagos', 'abuja')),
  service TEXT NOT NULL,
  date DATE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_appointments_date ON appointments(date);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_appointments_email ON appointments(email);

-- Enable Row Level Security
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert (for booking form)
CREATE POLICY "Allow public insert" ON appointments
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Only service role can read (for admin)
CREATE POLICY "Service role can read all" ON appointments
  FOR SELECT
  TO service_role
  USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at
CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### Step 5: Create API Route for Booking

**File: `app/api/appointments/route.ts`**
```typescript
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const appointmentSchema = z.object({
  location: z.enum(['lagos', 'abuja']),
  service: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  name: z.string().min(2).max(100),
  phone: z.string().min(10).max(20),
  email: z.string().email(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = appointmentSchema.parse(body)
    
    // Check if date is in the future
    const appointmentDate = new Date(validatedData.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (appointmentDate < today) {
      return NextResponse.json(
        { error: 'Appointment date must be in the future' },
        { status: 400 }
      )
    }
    
    // Create Supabase client
    const supabase = await createClient()
    
    // Insert appointment
    const { data, error } = await supabase
      .from('appointments')
      .insert([validatedData])
      .select()
      .single()
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to create appointment' },
        { status: 500 }
      )
    }
    
    // TODO: Send email notification (see Step 6)
    
    return NextResponse.json(
      { 
        success: true, 
        appointment: data,
        message: 'Appointment booked successfully!' 
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }
    
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

### Step 6: Update BookAppointmentCard Component

**Key changes to make:**
1. Add loading state
2. Add error/success handling
3. Call API route
4. Show user feedback
5. Reset form on success

**Example update to `handleSubmit`:**
```typescript
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitError, setSubmitError] = useState<string | null>(null);
const [submitSuccess, setSubmitSuccess] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitError(null);
  setSubmitSuccess(false);

  try {
    const response = await fetch('/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to book appointment');
    }

    // Success!
    setSubmitSuccess(true);
    setFormData({
      location: "lagos",
      service: "",
      date: "",
      name: "",
      phone: "",
      email: "",
    });

    // Close modal after 2 seconds
    setTimeout(() => {
      closeAppointment();
      setSubmitSuccess(false);
    }, 2000);
  } catch (error) {
    setSubmitError(error instanceof Error ? error.message : 'An error occurred');
  } finally {
    setIsSubmitting(false);
  }
};
```

### Step 7: Add Email Notifications (Optional but Recommended)

**Option A: Using Resend (Recommended for emails)**
```bash
npm install resend
```

**File: `app/api/appointments/notify/route.ts`**
```typescript
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const { appointment, type } = await request.json()
  
  // Send to clinic
  await resend.emails.send({
    from: 'Reverse Aesthetics <bookings@reverseaesthetics.ng>',
    to: 'reverseaestheticsng@gmail.com',
    subject: `New Appointment Booking - ${appointment.name}`,
    html: `
      <h2>New Appointment Booking</h2>
      <p><strong>Name:</strong> ${appointment.name}</p>
      <p><strong>Email:</strong> ${appointment.email}</p>
      <p><strong>Phone:</strong> ${appointment.phone}</p>
      <p><strong>Location:</strong> ${appointment.location}</p>
      <p><strong>Service:</strong> ${appointment.service}</p>
      <p><strong>Date:</strong> ${appointment.date}</p>
    `,
  })
  
  // Send confirmation to patient
  await resend.emails.send({
    from: 'Reverse Aesthetics <bookings@reverseaesthetics.ng>',
    to: appointment.email,
    subject: 'Appointment Confirmation - Reverse Aesthetics',
    html: `
      <h2>Thank you for booking with Reverse Aesthetics!</h2>
      <p>We've received your appointment request and will confirm shortly.</p>
      <p><strong>Your Details:</strong></p>
      <ul>
        <li>Location: ${appointment.location}</li>
        <li>Service: ${appointment.service}</li>
        <li>Date: ${appointment.date}</li>
      </ul>
    `,
  })
  
  return NextResponse.json({ success: true })
}
```

**Option B: Using Supabase Edge Functions**
- More complex but keeps everything in Supabase
- Good for advanced workflows

---

## 🔒 Security Best Practices

1. **Input Validation**: Always validate on server (Zod schema)
2. **Rate Limiting**: Add rate limiting to prevent spam
3. **CSRF Protection**: Next.js has built-in CSRF protection
4. **SQL Injection**: Supabase handles this automatically
5. **Environment Variables**: Never commit keys to git

---

## 📊 Database Management

### View Appointments in Supabase Dashboard
- Go to Table Editor → `appointments`
- Filter by status, date, location
- Export data as needed

### Admin Panel (Future Enhancement)
Create an admin dashboard to:
- View all appointments
- Update status
- Send reminders
- Manage calendar

---

## 🚀 Alternative: Quick MVP Solution

If you need something working immediately while setting up Supabase:

**Using Resend + Simple Storage:**
```typescript
// Quick solution - just send email, store in Supabase later
const response = await fetch('/api/appointments/quick', {
  method: 'POST',
  body: JSON.stringify(formData),
})
```

---

## 📝 Next Steps After Implementation

1. ✅ Test booking flow end-to-end
2. ✅ Set up email notifications
3. ✅ Create admin dashboard
4. ✅ Add appointment reminders
5. ✅ Integrate with calendar system
6. ✅ Add analytics tracking

---

## 🆘 Troubleshooting

**Issue**: "Failed to create appointment"
- Check Supabase connection
- Verify RLS policies
- Check environment variables

**Issue**: "Invalid input"
- Check Zod validation errors
- Verify form data format

**Issue**: Emails not sending
- Verify Resend API key
- Check email domain verification

