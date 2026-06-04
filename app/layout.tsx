import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'FURANO - Giải pháp chăm sóc toàn diện cho người niềng răng',
  description: 'Furano cung cấp các sản phẩm chăm sóc răng miệng chuyên biệt cho người niềng răng như kem đánh răng cho người niềng răng, giúp răng chắc khỏe, trắng sáng và bảo vệ nướu toàn diện.',
  keywords: 'furano, kem đánh răng cho người niềng răng, niềng răng, sản phẩm niềng răng, chăm sóc răng miệng, chỉnh nha',
  openGraph: {
    siteName: 'FURANO - Chăm sóc hàm răng chuyên biệt',
    images: ['https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1200'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
