import localFont from '@next/font/local'

import { StoreProvider } from '../redux/StoreProvider'

import App from '@/components/App'

import './globals.css'

export const metadata = {
  title: 'Shopping Cart',
  description: 'Next.js 13 Shopping Cart',
}

const vazirFont = localFont({
  src: '../../public/fonts/Vazirmatn-Regular.woff2',
})

export default function RootLayout({ children }) {
  return (
    <html
      lang='en'
      className={`${vazirFont.className} bg-slate-950 text-slate-100`}
    >
      <body>
        <StoreProvider>
          <App>{children}</App>
        </StoreProvider>
      </body>
    </html>
  )
}
