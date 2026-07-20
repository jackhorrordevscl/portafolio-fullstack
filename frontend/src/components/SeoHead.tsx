import React from 'react';
import { Helmet } from 'react-helmet-async';
import { APP_CONFIG } from '../utils/config';

interface SeoHeadProps {
  title: string;
  description: string;
  path: string;
}

const SeoHead: React.FC<SeoHeadProps> = ({ title, description, path }) => {
  const url = new URL(path, APP_CONFIG.siteUrl).toString();
  const image = new URL(APP_CONFIG.socialImage, APP_CONFIG.siteUrl).toString();

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
};

export default SeoHead;
