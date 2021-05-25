import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import * as styles from './index.module.sass'
import Layout from "../components/Layout"

export default function Home({ data }) {

  const [hovered, setHovered] = useState(false);
  return (
    <Layout>

      <div className={styles.container}>

        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div
            key={node.id}
            onMouseEnter={() => setHovered(node.frontmatter.title)}
            onMouseLeave={() => setHovered(false)}
          >
            <Link to={node.fields.slug}>
              <h1 className={styles.designerTitle}>{node.frontmatter.name}</h1>
            </Link>
          </div>
        ))}
      </div>

      {hovered &&
        <div className="hoverState">
          <h1>{hovered}</h1>
          <img src="" alt="" />
        </div>
      }
    </Layout>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata{
        title
      }
    }
    allMarkdownRemark(filter: {frontmatter: {key: {eq: "profile"}}},
                      sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            name
            date(formatString: "DD MMMM, YYYY")
            colour
            price
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
