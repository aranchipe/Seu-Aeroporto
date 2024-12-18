import Bar from '@/components/Bar';
import { LanguageProvider } from '@/components/PopperLanguage';
import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Seu Aeroporto',
  description: 'Projeto ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <html>
        <body>
          <Bar type="header" />
          {children}
          <Bar type="footer" />
        </body>
      </html>
    </LanguageProvider>
  );
}
