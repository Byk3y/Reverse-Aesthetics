import Script from "next/script";

/**
 * GA4 / Google Tag Manager loader.
 *
 * Renders nothing until the client supplies an ID, so the site is safe to ship
 * before their Google accounts exist. Once `NEXT_PUBLIC_GA_ID` (a G-XXXX
 * measurement ID) or `NEXT_PUBLIC_GTM_ID` (a GTM-XXXX container) is set, the
 * no-op shim in app/lib/track.ts starts reporting for real — `book_click`,
 * `whatsapp_click` and `booking_submitted` become conversions you can point at
 * Google Ads and show the client in a monthly report.
 *
 * Prefer GTM if they will also run Ads remarketing tags; prefer GA4 alone if
 * this is the only tag the site will ever carry.
 *
 * Privacy note: treatment interest is inferable from the URL path (/lp/hair-
 * restoration, /treatments/acne-scar-treatment-lagos). That is health-adjacent
 * data under the NDPA, so do not add any tag that forwards personally
 * identifying form fields, and keep Google Signals off in the GA4 admin.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function Analytics() {
  if (GTM_ID) {
    return (
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>
    );
  }

  if (GA_ID) {
    return (
      <>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
        </Script>
      </>
    );
  }

  return null;
}
