import '@/styles/globals.css';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { fontSans } from '@/config/fonts';
import { Providers } from '@/providers/providers';
import { Navbar } from '@/components/navbar';
import { Link } from '@nextui-org/link';
import clsx from 'clsx';
import { Footer } from '@/components/footer';
import AuthProvider from './context/AuthProvider';
import { getServerSession } from 'next-auth/next';
 
import { authOptions } from '@/lib/utils/authOptions';
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
   
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  session ? console.log('id', session.user?.id,'PhoneNumber', session.user?.extension_PhoneNumber, 'name', session?.user?.name, 'email ', session?.user?.email) : console.log('no session');
  console.log('session', session!=null);
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <AuthProvider>
        <body
          className={clsx(
            'min-h-screen bg-background font-sans antialiased',
            fontSans.variable
          )}
        >
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <div className="relative flex flex-col h-screen">
              <Navbar isLoggedIn={session}/>
              <main className="container mx-auto px-4 sm:px-6 md:px-8 lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl flex-grow">
                {children}
              </main>
              <Footer isLoggedIn={session != null}/>
            </div>
          </Providers>
        </body>
      </AuthProvider>
    </html>
  );
}
