import { AlgoProvider } from '@/contexts/AlgoContext';
import React from 'react';

export default function VsCodeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AlgoProvider>{children}</AlgoProvider>;
}
