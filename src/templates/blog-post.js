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
    profiles.forEach(p => console.log(p.node.fields))
    const currOwner = profiles.find(prof => prof.node.fields.owner === post.frontmatter.owner).node
    setOwner(currOwner.frontmatter.name);
  }, [])

  const post = data.post
  let img = post.frontmatter.project_pic.childImageSharp.gatsbyImageData

  //Sorry for this absolute hack, but its much easier than doing a graphql query for the profile file
  // I'm aware that if we had someone with a hyphenated name, this would be awful. It's a horrible hack and I'm not proud.
  // const author = (post.frontmatter.owner).replace("-", " ");

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

// export const OtherDesigners = ({ profiles }) => {

//   return (
//     <div className={`row ${styles.otherDesignersContainer}`}>

//       <h1>Other Designers</h1>
//       {profiles.map(profile => {
//         const { frontmatter } = profile.node
//         let img = frontmatter.profile_pic.childImageSharp.gatsbyImageData

//         return (
//           <Link to={profile.node.fields.slug} className={`col-lg-4 col-md-6 ${styles.otherDesigner}`}>
//             <GatsbyImage
//               className={styles.otherDesignerImage}
//               image={img}
//             />
//             <div>
//               <h2>
//                 {frontmatter.name}
//               </h2>
//               <p>
//                 {frontmatter.biog}
//               </p>
//             </div>
//           </Link>
//         )
//       })}
//     </div>
//   )
// }


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
