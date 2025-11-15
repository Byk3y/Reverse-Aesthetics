import Hero from "./components/Hero";
import Header from "./components/Header";
import BookAppointmentCard from "./components/BookAppointmentCard";

export default function Home() {
  return (
    <main suppressHydrationWarning>
      <Header />
      <Hero />
      <BookAppointmentCard />
    </main>
  );
}
