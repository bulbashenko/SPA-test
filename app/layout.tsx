import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <header className="border-b sticky top-0 bg-background z-50">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
              <Link href="/products" className="text-xl font-bold">
                My Store
              </Link>
              <nav className="flex gap-4">
                <Link href="/products">
                  <Button variant="ghost">Продукты</Button>
                </Link>
                <Link href="/create-product">
                  <Button>Создать продукт</Button>
                </Link>
              </nav>
            </div>
          </header>

          <main className="container mx-auto px-4 py-6">{children}</main>

          <footer className="mt-10 border-t py-4 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} My Store. All rights reserved.</p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
