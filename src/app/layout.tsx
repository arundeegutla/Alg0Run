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

const baseUrl = 'https://alg0run.netlify.app/';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Alg0Run';
  const description =
    'Alg0Run - type coding algorithms in a fun and competitive way!';

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    openGraph: {
      title,
      description,
      url: baseUrl,
      images: [
        {
          url: `/og_new.png?v=2`,
          secureUrl: `/og_new.png?v=2`,
          height: 1080,
          width: 1920,
          alt: 'Preview image for Alg0Run',
        },
      ],
      type: 'website',
      siteName: 'Alg0Run',
    },
    icons: {
      icon: '/favicons/favicon.ico',
      shortcut: '/favicons/apple-touch-icon.png',
      apple: '/favicons/apple-touch-icon.png',
    },
    manifest: '/favicons/site.webmanifest',
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`font-sans antialiased`}>
        <TRPCProvider>
          <AuthProvider>
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </AuthProvider>
        </TRPCProvider>
      </body>
    </html>
  );
}
