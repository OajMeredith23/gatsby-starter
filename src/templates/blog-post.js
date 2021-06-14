import React, { useEffect, useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { Helmet } from "react-helmet"
import Layout from "../components/Layout"
import * as styles from './blogpost.module.sass';
import OtherDesigners from '../components/OtherDesigners'
export default function BlogPost({ data }) {

  const [owner, setOwner] = useState(null);
  const profiles = data.profiles.edges

  useEffect(() => {
    // I import all the designer profiles in my graphql query, then find the relevant one. 
    profiles.forEach(p => console.log(p.node.fields))
    const currOwner = profiles.find(prof => prof.node.fields.owner === post.frontmatter.owner).node
    setOwner(currOwner.frontmatter.name);
  }, [])

  const post = data.post
  let img = post?.frontmatter?.project_pic?.childImageSharp.gatsbyImageData

  return (

    <Layout goBack={{ path: `/${post.frontmatter.owner}/`, text: owner }}>

      <Helmet>
        <title>{post.frontmatter.title}</title>
        <meta name="description" content="Free Web tutorials"></meta>
      </Helmet>

      <div className={`${styles.title}`}>
        <h1>{post.frontmatter.title}</h1>
        <Link to={`/${post.frontmatter.owner}/`}>
          <h3>By {owner}</h3>
        </Link>
        {post.frontmatter.unit &&
          <p>
            Unit: {post.frontmatter.unit}
          </p>
        }
      </div>

      <div className={styles.cover}>
        <GatsbyImage image={img} alt={post.frontmatter.title} />
      </div>

      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      <OtherDesigners currDesigner={post.frontmatter.owner} />

    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    profiles: allMarkdownRemark(
      filter: {frontmatter: {key: {eq: "profile"}}}
    ) {
      edges {
        node {
          fields {
            owner
            tag
            slug
          }
          frontmatter {
            profile_pic {
              childImageSharp {
                gatsbyImageData(
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                    )
              }
            }
            name
            biog
          }
          id
        }
      }
    }
  post: markdownRemark(fields: { slug: { eq: $slug }}) {
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
