const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
    /* This is a bit of a hack: we trim down the slug to get a "tag"
       which is what we key off with the "owner" frontmatter key.
    */
    createNodeField({
      node,
      name: "tag",
      value: slug.replace(/\//g, "")
    })

    createNodeField({
      node,
      name: "owner",
      value: node.frontmatter.owner || slug.replace(/\//g, "")
    })
    // if (node.frontmatter.owner) {
    // } else {
    //   createNodeField({
    //     node,
    //     name: "owner",
    //     value: slug.replace(/\//g, "")
    //   })

    // }
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const result = await graphql(`
        query {
          # All Markdown nodes whose key is "post":
          posts:
            allMarkdownRemark(filter: {frontmatter: {key: {eq: "project"}}}) {
              edges { node { fields { slug } } }
            },
          # All Markdown nodes whose key is "profile":
          profiles:
            allMarkdownRemark(filter: {frontmatter: {key: {eq: "profile"}}}) {
              edges { node { fields { slug tag } } }
            }
        }
    `)

  // Create pages for all posts:
  result.data.posts.edges.forEach(({ node }) => {
    console.log("Fields:", node.fields)
    console.log("frontmatter:", node.frontmatter)
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
        owner: node.fields.owner,
        test: 'test'
      },
    })
  })

  /* Create pages for all profiles: the tag is passed in because we also
     have to list all the post pages owned according to that tag. */
  result.data.profiles.edges.forEach(({ node }) => {
    console.log({ node })
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/author.js`),
      context: {
        slug: node.fields.slug,
        tag: node.fields.tag,
        owner: node.fields.owner,
        test: 'test'

      },
    })
  })
}
