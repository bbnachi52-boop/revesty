import "./globals.css";
import { LanguageProvider } from "./lib/useLanguage";
import { ShopProvider } from "./store/shopStore";
import { ReviewProvider } from "./store/reviewStore";
import { MessageProvider } from "./store/messageStore";

export const metadata = {
  title: "Revesty",
  description: "Fashion marketplace"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ShopProvider>
          <LanguageProvider>
            <MessageProvider>
              <ReviewProvider>{children}</ReviewProvider>
            </MessageProvider>
          </LanguageProvider>
        </ShopProvider>
      </body>
    </html>
  );
}