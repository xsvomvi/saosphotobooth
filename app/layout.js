import './globals.css'
import { Spectral, Handjet, Roboto_Condensed } from 'next/font/google'

// Fonts
const spectral = Spectral({ subsets: ['latin'], weight: '400' })
const handjet = Handjet({ subsets: ['latin'], weight: '400' })
const robotoCondensed = Roboto_Condensed({ subsets: ['latin'], weight: '400' })

// Metadata
export const metadata = {
  title: "sao's photobooth ⋆˙⟡",
  description: 'my online photobooth',
}

// Root layout
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${robotoCondensed.className}`}>
        {children}
      </body>
    </html>
  )
}