import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/Layout"
import * as styled from './blogpost.module.sass';

export default function BlogPost({ data }) {
  const post = data.markdownRemark
  let img = post.frontmatter.project_pic.childImageSharp.gatsbyImageData

  return (
    <Layout>
      <h1>{post.frontmatter.title}</h1>
      <div>
        <GatsbyImage image={img} alt={post.frontmatter.title} />
      </div>

      <h4><Link to={`/${post.frontmatter.owner}/`}>{post.frontmatter.owner}</Link></h4>

      <div
        className={styled.content}
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
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
        project_pic {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED) 
          }
        }
      }
    }
  }
`
