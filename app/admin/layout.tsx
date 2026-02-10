import React from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont",
          backgroundColor: "#f7f7f7",
        }}
      >
        <header
          style={{
            padding: "16px 24px",
            backgroundColor: "#111827",
            color: "#ffffff",
            fontWeight: 700,
            fontSize: 18,
          }}
        >
          AEDR Learn — Admin
        </header>

        <main
          style={{
            padding: 24,
            maxWidth: 1200,
            margin: "0 auto",
            backgroundColor: "#ffffff",
            minHeight: "calc(100vh - 64px)",
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
