/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `Ravensbourne UX/UI 2021`,
  },
  plugins: [{
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `src`,
      path: `${__dirname}/src`,
    },
  },
    `gatsby-transformer-remark`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sass`,
  {
    resolve: `gatsby-plugin-google-fonts`,
    options: {
      fonts: [
        `jost\:400, 400i`,
        `montserrat\:300,400,400i,700` // you can also specify font weights and styles
      ],
      display: 'swap'
    }
  }
  ]
}
