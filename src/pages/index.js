import React from "react"
//import { css } from "@emotion/react"
import { Link, graphql } from "gatsby"

import Container from "../components/container"

export default function Home({ data }) {
  return (
      <Container>
        <h1>
         Class Portfolio
        </h1>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <Link to={node.fields.slug}>
              <h3>{node.frontmatter.title}</h3>
              <p>{node.excerpt}</p>
            </Link>
          </div>
        ))}
      </Container>
  )
}
export const query = graphql`
  query {
    allMarkdownRemark(filter: {frontmatter: {key: {eq: "profile"}}},
                      sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
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
