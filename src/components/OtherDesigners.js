import React, { useEffect, useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from './otherDesigners.module.sass';


const OtherDesigners = ({ currDesigner = false }) => {
    console.log({ currDesigner })


    const profiles = useStaticQuery(graphql`
        query {
            allMarkdownRemark(filter: {frontmatter: {key: {eq: "profile"}}}) {
                edges {
                node {
                    frontmatter {
                        name
                        profile_pic {
                            childImageSharp {
                                gatsbyImageData(
                                    placeholder: BLURRED
                                    formats: [AUTO, WEBP, AVIF]
                                    )
                                }
                        }
                        biog
                    }
                    id
                    fields {
                        owner
                        tag
                        slug
                    }
                }
                }
            }
            }
    `
    )



    return (
        <div className={`${styles.otherDesignerContainer} group`}>

            <h1>Other Designers</h1>
            <listDesigners className={`row ${styles.listDesigners}`}>

                {profiles && profiles.allMarkdownRemark.edges
                    .filter(profile => profile.node.fields.owner !== currDesigner) // 
                    .map(profile => {

                        const { frontmatter } = profile.node
                        let img = frontmatter.profile_pic.childImageSharp.gatsbyImageData

                        return (
                            <li key={profile.node.fields.slug} className={`col-lg-4 col-md-6`}>
                                <Link to={profile.node.fields.slug} className={styles.otherDesigner}>
                                    <GatsbyImage
                                        className={styles.otherDesignerImage}
                                        image={img}
                                    />
                                    <div>
                                        <h2>
                                            {frontmatter.name}
                                        </h2>
                                        <p>
                                            {frontmatter.biog}
                                        </p>
                                    </div>
                                </Link>
                            </li>
                        )
                    })}

            </listDesigners>
        </div>
    )
}

export default OtherDesigners