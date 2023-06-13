/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en-GB", "en-US", "de"],
    defaultLocale: "en-GB",
  },
};

module.exports = nextConfig;
