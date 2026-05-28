import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  schema?: any;
}

export default function SEO({ 
  title, 
  description, 
  keywords,
  image, 
  url, 
  type = 'website',
  schema 
}: SEOProps) {
  const { t } = useTranslation();
  const location = useLocation();

  const siteName = 'FURANO - Chăm sóc hàm răng chuyên biệt';
  const defaultTitle = 'FURANO - Giải pháp chăm sóc toàn diện cho người niềng răng';
  const defaultDescription = 'Furano cung cấp các sản phẩm chăm sóc răng miệng chuyên biệt cho người niềng răng như kem đánh răng cho người niềng răng, giúp răng chắc khỏe, trắng sáng và bảo vệ nướu toàn diện.';
  const defaultKeywords = 'furano, kem đánh răng cho người niềng răng, niềng răng, sản phẩm niềng răng, chăm sóc răng miệng, chỉnh nha';
  const defaultImage = 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1200';
  const siteUrl = window.location.origin;

  const currentUrl = url || `${siteUrl}${location.pathname}`;
  const currentTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const currentDescription = description || defaultDescription;
  const currentKeywords = keywords || defaultKeywords;
  const currentImage = image || defaultImage;

  return (
    <Helmet>
      {/* Standard metadata */}
      <title>{currentTitle}</title>
      <meta name="description" content={currentDescription} />
      <meta name="keywords" content={currentKeywords} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={currentTitle} />
      <meta property="og:description" content={currentDescription} />
      <meta property="og:image" content={currentImage} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={currentTitle} />
      <meta name="twitter:description" content={currentDescription} />
      <meta name="twitter:image" content={currentImage} />

      {/* Structured Data (JSON-LD) for Google / GEO */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
