/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://elisapatti.it',
  generateRobotsTxt: true,
  exclude: ['/brand-review', '/brand-review/*'],
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/brand-review' },
    ],
  },
}
