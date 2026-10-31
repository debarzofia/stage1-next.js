import "./globals.css";

export const metadata = {
  title: "NET Menu | Caffe & Restaurant",
  description: "NET Caffe & Restaurant menu in Kurdish, Arabic, and English.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Outfit:wght@400;500;600&family=Vazirmatn:wght@400;500;700&family=Noto+Kufi+Arabic:wght@600;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
