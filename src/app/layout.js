import { Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Head from 'next/head';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata = {
  title: {
    template: '%s | Desa Sirnaraja',
    default: 'Desa Sirnaraja - Portal Resmi Pemerintah Desa',
  },
  description:
    'Portal informasi resmi Pemerintah Desa Sirnaraja, Kecamatan Cigalontang, Kabupaten Tasikmalaya. Mewujudkan desa digital yang transparan, inovatif, dan mandiri.',
  keywords: ['Desa Sirnaraja', 'Cigalontang', 'Tasikmalaya', 'Website Desa', 'KKN UNPER'],
  authors: [{ name: 'Tim KKN UNPER 2026' }],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'Desa Sirnaraja',
  },
  verification: {
    google: "HDAmTLcAuWaF3FOphG-oLUlGqd8NVMzhWGFBZXoXaCM",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={poppins.variable}>
      <Head>
        <meta name="google-site-verification" content="AlkWlfdLxJH76AXoe5HbtgqUwjdjhk_olnZItcLzLbU" />
      </Head>
      <body>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
