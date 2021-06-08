/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `Rave UX/UI 2021`,
  },
  plugins: [{
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `src`,
      path: `${__dirname}/src`,
    },
  },

    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sass`,
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-images`,
          options: {
            // It's important to specify the maxWidth (in pixels) of
            // the content container as this plugin uses this as the
            // base for generating different widths of each image.
            maxWidth: 2590,
          },
        },
        {
          resolve: "gatsby-remark-embed-video",
          options: { related: false }
        },
        `gatsby-remark-responsive-iframe`
      ],
    },
  },

  {
    resolve: `gatsby-plugin-google-fonts`,
    options: {
      fonts: [
        `jost\:400, 400i`,
        `montserrat\:300,400,400i,700` // you can also specify font weights and styles
      ],
      display: 'swap'
    }
  },
    `gatsby-plugin-react-helmet`

  ]
}