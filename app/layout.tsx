import type { Metadata } from 'next'
import { Josefin_Sans, Montserrat } from 'next/font/google'
import './globals.css'
import { SmoothScrollProvider } from '@/components/animations/smooth-scroll-provider'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Toaster } from '@/components/ui/toaster'
import { getSiteContent } from '@/lib/data/site-content-db'
import { FloatingWhatsApp } from '@/components/ui/floating-whatsapp'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { BackToTop } from '@/components/ui/back-to-top'
import { CustomCursor } from '@/components/ui/custom-cursor'
import { IntroScreen } from '@/components/ui/intro-screen'
import { CookieConsent } from '@/components/ui/cookie-consent'
import { PageTransition } from '@/components/ui/page-transition'

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent()
  const siteName = content.seo_site_name ?? 'LORVA Fine Chocolate'
  return {
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description: content.seo_site_description ?? 'Handcrafted artisan chocolate — bonbons, breakable hearts, wedding favours, and custom gift boxes. Available in 12pc & 16pc.',
    keywords: ['artisan chocolate', 'bonbons', 'breakable hearts', 'wedding favours', 'custom chocolate boxes'],
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const content = await getSiteContent()
  const waNumber = content.contact_whatsapp || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '1XXXXXXXXXX'
  const waMessage = content.footer_whatsapp_message || "Hi Lorva! I'd love to place an order."

  return (
    <html lang="en" className={`${josefinSans.variable} ${montserrat.variable}`}>
      <body className="font-inter antialiased bg-cream text-deep-cocoa">
        <SmoothScrollProvider>
          <IntroScreen />
          <ScrollProgress />
          <CustomCursor />
          <Navbar content={content} />
          <PageTransition>
            <main>{children}</main>
          </PageTransition>
          <Footer content={content} />
          <FloatingWhatsApp phoneNumber={waNumber} message={waMessage} />
          <BackToTop />
          <CookieConsent />
          <Toaster />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
