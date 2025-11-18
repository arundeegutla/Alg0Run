import React, { lazy, Suspense } from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import './fonts.css';
import { TRPCProvider } from '~/server/trpc/client';
import { AuthProvider } from '@/contexts/AuthContext';
const Loading = lazy(() => import('../components/Loading'));

const _geist = Geist({ subsets: ['latin'] });
const _geistMono = Geist_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Alg0Run - Algorithm Speed Typing',
  description: 'Type algorithms, race against peers, dominate the leaderboard',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`font-sans antialiased`}>
        <AuthProvider>
          <TRPCProvider>
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </TRPCProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
