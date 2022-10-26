/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  env: {
    // DB_API: 'http://10.110.10.101:5501/service/',
    DB_API: 'https://test.palembang.go.id/sipperistgapi/',
  },
}

module.exports = nextConfig
