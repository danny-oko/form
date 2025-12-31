// app/layout.jsx
import "./globals.css"; // ← THIS LINE IS MISSING

export const metadata = {
  title: "Multi-step Sign Up",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-main flex items-center justify-center">
        {children}
      </body>
    </html>
  );
}
