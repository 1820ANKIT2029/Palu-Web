import { Manrope } from 'next/font/google';
import { Metadata } from 'next';

import { ClerkProvider } from '@clerk/nextjs';

import './globals.css';
import { ThemeProvider } from '@/components/theme';
import ReactQueryProvider from '@/react-query';
import { ReduxProvider } from '@/redux/provider';
import { Toaster } from 'sonner';

const manrope = Manrope({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "Palu",
  description: "Share AI powered videos with your friends",
  icons: {
    icon: '/palu-logo.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return(
    <ClerkProvider>

      <html lang='en' suppressHydrationWarning>
        <body className={`${manrope.className} bg-color1`}>
          <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
            
            <ReduxProvider>
              <ReactQueryProvider>
                {children}
                <Toaster />
              </ReactQueryProvider>
            </ReduxProvider>
            
          </ThemeProvider>
        </body>
      </html>

    </ClerkProvider>
  );
};