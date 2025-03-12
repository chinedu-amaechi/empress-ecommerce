import "./globals.css";

export const metadata = {
  title: "Empress E-commerce Application",
  description: "A scalable e-commerce app built with Next.js and Supabase.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
