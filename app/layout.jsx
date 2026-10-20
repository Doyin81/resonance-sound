import "./globals.css";
import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";

export const metadata = {
  title: {
    default: "Resonance Sound | Explore and book sound production",
    template: "%s | Resonance Sound",
  },
  description:
    "Studio sessions, live sound, equipment rentals, church audio, and professional sound production by Resonance Sound.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try {
              const theme = localStorage.getItem("rs-theme");
              if (theme === "light" || theme === "dark") {
                document.documentElement.dataset.theme = theme;
              }
            } catch (error) {
              console.error("Unable to read the saved color theme preference.", error);
            }`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700&family=DM+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
