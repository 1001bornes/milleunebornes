export default {
  reactStrictMode: false,
  async redirects() {
    return [
      // // Basic redirect
      // {
      //   source: '/',
      //   destination: '/randonnees',
      //   permanent: true,
      // },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        search: ''
      }
    ]
  }
};
