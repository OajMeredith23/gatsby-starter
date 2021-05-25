import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Container from "../components/container"

export default function Author({ data }) {
  const author = data.thisPage
  const blogPages = data.blogPages

  const img = author.frontmatter.featuredImage.childImageSharp.gatsbyImageData

  return (
    <Container>
        <h1>{author.frontmatter.title}</h1>

        {blogPages.edges.map(x =>
            <div key={x.node.id} className="row">
                <Link to={x.node.fields.slug}>{x.node.frontmatter.title}</Link>
            </div>
        )}

        <div>
            <GatsbyImage image={img} alt=""/>
        </div>

        <div dangerouslySetInnerHTML={{ __html: author.html }} />
    </Container>
  )
}

export const query = graphql`
    query($slug: String!, $tag: String!)
    {
        # Fetch the (single) Markdown node associated with this slug:
        thisPage:
            markdownRemark(fields: { slug: { eq: $slug } }) {
                html
                frontmatter {
                    title
                    featuredImage {
                        childImageSharp {
                            gatsbyImageData(layout: CONSTRAINED) 
                        }
                    }
                }
            },
        # Fetch all Markdown nodes whose frontmatter owner is tag:
        blogPages:
            allMarkdownRemark(
                filter: { frontmatter: { owner: { eq: $tag }}}
            ) {
                edges {
                    node {
                        id
                        fields {
                            slug
                        }
                        frontmatter {
                            title
                        }
                    }
                }
            }
    }
`
