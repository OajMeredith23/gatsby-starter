import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/Layout"
import * as styles from './author.module.sass'
import { ArrowLeft } from '@material-ui/icons'

export default function Author({ data }) {
    const author = data.thisPage
    const blogPages = data.blogPages
    console.log({ blogPages })

    const profile_img = author.frontmatter.profile_pic.childImageSharp.gatsbyImageData

    return (
        <Layout>
            <div className={`row ${styles.container}`}>
                <Link to="/">
                    <div className={styles.nav}>
                        <ArrowLeft /> <small>See other designers</small>
                    </div>
                </Link>
                <div className={`col-md-4`}>
                    <div className={styles.profile}>
                        <GatsbyImage
                            className={styles.profileImg}
                            image={profile_img}
                            alt=""
                        />
                        <div className={styles.profileText}>
                            <h1>{author.frontmatter.name}</h1>
                            <p>{author.frontmatter.biog}</p>
                        </div>
                    </div>
                </div>


                <div className={`col-md-8 ${styles.projects}`}>

                    <div dangerouslySetInnerHTML={{ __html: author.html }} />

                    <h1>Projects</h1>
                    {blogPages.edges.map(({ node }) => {
                        const project_img = node.frontmatter.project_pic.childImageSharp.gatsbyImageData
                        return (
                            <Link to={node.fields.slug} key={node.id}>
                                <div className={`row ${styles.project}`}>
                                    <div className={`col-lg-3 ${styles.title}`}>
                                        <h2>
                                            {node.frontmatter.title}
                                        </h2>
                                        {/* <small>{node.frontmatter.unit}</small> */}
                                    </div>
                                    <div className={`col-lg-9 ${styles.img}`}>
                                        <GatsbyImage
                                            image={project_img}
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </Link>
                        )
                    })}

                </div>
            </div>
        </Layout>
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
                    name
                    biog
                    profile_pic {
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
                            # unit
                            project_pic {
                                childImageSharp {
                                    gatsbyImageData(layout: CONSTRAINED) 
                                }
                            }
                        }
                    }
                }
            }
    }
`
