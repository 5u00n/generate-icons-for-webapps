module.exports = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Disable output file tracing to prevent micromatch stack overflow on Vercel
  outputFileTracing: false,
}