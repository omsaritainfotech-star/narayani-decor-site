import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import { getSettings } from "@/lib/content";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Narayani Decor & Furnishing",
  description: "Premium curtains, wallpapers, louvers & complete home styling in Jharsuguda.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = getSettings();
  const brand = settings?.brand || {};
  const primary = brand.primary || "#111827";
  const accent = brand.accent || "#6366F1";

  return (
    <html lang="en">
      <body>
        <style>{`:root{--brand-primary:${primary};--brand-accent:${accent};}`}</style>
        <Header />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
        <StickyCTA phone={settings?.phone} whatsapp={settings?.whatsapp} />
        {/* GA4 */}
        <script dangerouslySetInnerHTML={{__html: `
          (function(){
            var GA_ID = '${process.env.NEXT_PUBLIC_GA_ID || ""}';
            if (!GA_ID) return;
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            var s = document.createElement('script'); s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id='+GA_ID;
            document.head.appendChild(s);
            gtag('js', new Date()); gtag('config', GA_ID);
          })();
        `}} />
        {/* Meta Pixel */}
        <script dangerouslySetInnerHTML={{__html: `
          (function(){
            var PID = '${process.env.NEXT_PUBLIC_META_PIXEL || ""}';
            if (!PID) return;
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js'); fbq('init', PID); fbq('track', 'PageView');
          })();
        `}} />
      </body>
    </html>
  );
}
