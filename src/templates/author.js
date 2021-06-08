import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/Layout"
import * as styles from './author.module.sass'
import FeatherIcon from 'feather-icons-react'
import { SocialIcon } from 'react-social-icons';
import OtherDesigners from '../components/OtherDesigners';

export default function Author({ data }) {

    const author = data.thisPage
    const blogPages = data.blogPages

    const profile_img = author.frontmatter.profile_pic.childImageSharp.gatsbyImageData
    const { twitter = false, instagram = false, github = false, site = false } = author.frontmatter

    return (
        <Layout goBack={{ path: '/', text: 'See other designers' }}>
            <div className={`row ${styles.container}`}>


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

                        {site &&
                            <div className={styles.site}>
                                <a href={site} target="_blank" rel="noopener noreferrer">
                                    <p><FeatherIcon icon="globe" style={{ marginRight: '.5em' }} />Website</p>
                                </a>
                            </div>
                        }

                        <div className={styles.social}>
                            {[twitter, instagram, github].map(link => link && <SocialIcon key={link} url={link} />)}
                        </div>
                    </div>
                </div>

                <div className={`col-md-8 row ${styles.projects}`}>

                    <div className={`col-8 ${styles.content}`} dangerouslySetInnerHTML={{ __html: author.html }} />

                    {blogPages.edges.map(({ node }) => {
                        const project_img = node.frontmatter.project_pic.childImageSharp.gatsbyImageData
                        return (
                            <Link to={node.fields.slug} key={node.id}>
                                <div className={`row ${styles.project}`}>
                                    <div className={` ${styles.img}`}>
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

            <OtherDesigners
                currDesigner={author.fields.tag}
            />
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
                fields {
                    slug 
                    tag
                }
                frontmatter {
                    name
                    biog
                    twitter
                    site
                    linkedin
                    instagram
                    github
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
