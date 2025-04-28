/** @type {import('next').NextConfig} */
const withNextIntl = require("next-intl/plugin")();
const withAntdLess = require("next-plugin-antd-less");
const nextConfig = withNextIntl(
  withAntdLess({
    reactStrictMode: true,
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    experimental: {
      forceSwcTransforms: true,
      missingSuspenseWithCSRBailout: false,
    },
    webpack: (config) => {
      config.resolve = {
        ...config.resolve,
        fallback: {
          fs: false,
          path: false,
          os: false,
        },
      };
      return config;
    },
  })
);

module.exports = nextConfig;
