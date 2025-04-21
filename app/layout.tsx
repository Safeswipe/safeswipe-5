
export const metadata = {
  title: 'SafeSwipe',
  description: 'Reverse image & identity lookup',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
