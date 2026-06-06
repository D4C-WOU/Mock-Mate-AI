import "./globals.css";

export const metadata = {
  title: "MockMate AI",
  description: "AI Interview Coach",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="light"
      style={{ colorScheme: "light" }}
    >
      <body className="bg-white text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}