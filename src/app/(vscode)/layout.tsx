import NavigationBar from '@/components/NavigationBar';
import React from 'react';

export default function VsCodeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='h-screen w-screen overflow-hidden flex flex-row'>
      <NavigationBar />
      {children}
    </div>
  );
}
