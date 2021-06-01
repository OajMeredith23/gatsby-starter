import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { Helmet } from "react-helmet"

import Layout from "../components/Layout"
import * as styles from './blogpost.module.sass';

export default function BlogPost({ data }) {
  // const 
  const post = data.markdownRemark
  let img = post.frontmatter.project_pic.childImageSharp.gatsbyImageData
  console.log(post.frontmatter)

  //Sorry for this absolute hack, but its much easier than doing a graphql query for the profile file
  const author = (post.frontmatter.owner).replaceAll("-", " ");
  return (
    <Layout goBack={{ path: `/${post.frontmatter.owner}/`, text: author }}>
      <Helmet>
        <title>{post.frontmatter.title}</title>
        <meta name="description" content="Free Web tutorials"></meta>
      </Helmet>

      <div className={styles.title}>
        <h1>{post.frontmatter.title}</h1>
        <h3>By {author}</h3>
        <p>
          Unit: {post.frontmatter.unit}
        </p>
      </div>

      <div className={styles.cover}>
        <GatsbyImage image={img} alt={post.frontmatter.title} />
      </div>

      <div
        className={styles.content}
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
        unit
        project_pic {
          childImageSharp {
            gatsbyImageData(
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
                )
          }
        }
      }
    }
  }
`
