/** @type {import('next').NextConfig} */
// const withNextIntl = require("next-intl/plugin")();
// const withAntdLess = require("next-plugin-antd-less");
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
    webpack: (config: { resolve: any; }) => {
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
function withNextIntl(arg0: any) {
  throw new Error("Function not implemented.");
}

function withAntdLess(arg0: { reactStrictMode: boolean; typescript: { ignoreBuildErrors: boolean; }; eslint: { ignoreDuringBuilds: boolean; }; experimental: { forceSwcTransforms: boolean; missingSuspenseWithCSRBailout: boolean; }; webpack: (config: { resolve: any; }) => { resolve: any; }; }): any {
  throw new Error("Function not implemented.");
}

