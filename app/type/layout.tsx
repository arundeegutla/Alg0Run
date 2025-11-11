import React from 'react';

export default function TypeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className='h-screen w-screen overflow-hidden'>{children}</div>;
}
