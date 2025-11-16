require('dotenv').config();
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.antaranews.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.antaranews.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.suara.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'asset.kompas.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'asset-1.tribunnews.com',
        port: '',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'media.beritajatim.com',
        port: '',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'static.republika.co.id',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'asset.tribunnews.com',
        port: '',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'pict.sindonews.net',
        port: '',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'rm.id',
        port: '',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'cdn0-production-images-kly.akamaized.net',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
