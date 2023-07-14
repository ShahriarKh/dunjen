import "./globals.scss";

export const metadata = {
  title: "Dunjen",
  description: "A maze game",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <link rel="icon" href="/favicon.png" sizes="any" />
      <body>{children}</body>
    </html>
  );
}
