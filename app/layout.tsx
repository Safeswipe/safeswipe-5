import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'SafeSwipe',
  description: 'Reverse image & identity lookup',
  icons: {
    icon: '/favicon.png',
  },
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}