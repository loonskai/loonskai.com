module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/in-progress',
        permanent: false,
      },
      {
        source: '/about',
        destination: '/in-progress',
        permanent: false,
      },
      {
        source: '/posts/:slug',
        destination: '/in-progress',
        permanent: false,
      },
    ]
  }
}
