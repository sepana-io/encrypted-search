/** @type {import('next').NextConfig} */
const proxyUrl = "https://encrypted-api.sepana.io"

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${proxyUrl}/:path*` // Proxy to Backend
      }
    ]
  },
  webpack(config) {
         config.experiments = { syncWebAssembly: true, layers: true };
         config.output.webassemblyModuleFilename = "static/wasm/[modulehash].wasm";
         return config;
       }
  // webpack(config, { isServer, dev }) {
  //   // Enable webassembly
  //   config.experiments = { asyncWebAssembly: true };

  //   // In prod mode and in the server bundle (the place where this "chunks" bug
  //   // appears), use the client static directory for the same .wasm bundle
  //   config.output.webassemblyModuleFilename =
  //     isServer && !dev ? "../static/wasm/[id].wasm" : "static/wasm/[id].wasm";

  //   // Ensure the filename for the .wasm bundle is the same on both the client
  //   // and the server (as in any other mode the ID's won't match)
  //   config.optimization.moduleIds = "named";

  //   return config;
  // },
}

module.exports = nextConfig
