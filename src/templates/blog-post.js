import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/Layout"

export default function BlogPost({ data }) {
  const post = data.markdownRemark
  let img = post.frontmatter.featuredImage.childImageSharp.gatsbyImageData

  return (
    <Layout>

      <div>
        <GatsbyImage image={img} alt="" />
      </div>

      { /* Reconstitute owner frontmatter tag into a slug: */}
      <h4><Link to={`/${post.frontmatter.owner}/`}>{post.frontmatter.owner}</Link></h4>

      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </Layout>
  )
}
export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug }}) {
      html
      frontmatter {
        title
        owner
        featuredImage {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED) 
          }
        }
      }
    }
  }
`
