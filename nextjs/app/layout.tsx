import "./globals.css";

export const metadata = {
  title: "Next.js App",
  description: "DaisyUI + TailwindCSS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <body>{children}</body>
    </html>
  );
}
