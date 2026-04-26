import './globals.css';

export const metadata = {
  title: 'Tripooly | Community Driven Travel',
  description: 'A non-profit platform for travelers to showcase packages, find local stays, and connect offline.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
