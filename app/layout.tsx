import type { Metadata } from 'next'
import { Josefin_Sans, Montserrat } from 'next/font/google'
import './globals.css'
import { SmoothScrollProvider } from '@/components/animations/smooth-scroll-provider'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Toaster } from '@/components/ui/toaster'
import { getSiteContent } from '@/lib/data/site-content-db'

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
  return (
    <html lang="en" className={`${josefinSans.variable} ${montserrat.variable}`}>
      <body className="font-inter antialiased bg-cream text-deep-cocoa">
        <SmoothScrollProvider>
          <Navbar content={content} />
          <main>{children}</main>
          <Footer content={content} />
          <Toaster />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
