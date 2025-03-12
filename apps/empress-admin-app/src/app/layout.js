import "./globals.css";

export const metadata = {
  title: "Empress Admin Panel",
  description: "Admin panel for managing the Empress e-commerce platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
