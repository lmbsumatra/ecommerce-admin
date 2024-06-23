// app/layout.js
import SessionProviderWrapper from "./SessionProviderWrapper";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SessionProviderWrapper>
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
