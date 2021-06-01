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
          // options: { width: 1080 },
        },
      ],
    },
  },
  // {
  //   resolve: `gatsby-transformer-remark`,
  //   options: {
  //     plugins: [
  //       // gatsby-remark-relative-images-v2 must
  //       // go before gatsby-remark-images
  //       {
  //         resolve: `gatsby-remark-relative-images-v2`,
  //       },
  //       {
  //         resolve: `gatsby-remark-images`,
  //         options: {
  //           // It's important to specify the maxWidth (in pixels) of
  //           // the content container as this plugin uses this as the
  //           // base for generating different widths of each image.
  //           maxWidth: 3090,
  //         },
  //       },
  //     ],
  //   },
  // },
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

// {
//   resolve: `gatsby-transformer-remark`,
//   options: {
//     plugins: [
//       // gatsby-remark-relative-images-v2 must
//       // go before gatsby-remark-images
//       {
//         resolve: `gatsby-remark-relative-images-v2`,
//       },
//       {
//         resolve: `gatsby-remark-images`,
//         options: {
//           // It's important to specify the maxWidth (in pixels) of
//           // the content container as this plugin uses this as the
//           // base for generating different widths of each image.
//           maxWidth: 3020,
//         },
//       },
//     ],
//   },
// },