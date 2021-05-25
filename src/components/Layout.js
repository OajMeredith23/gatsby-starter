import React from "react"
import * as styles from "./layout.module.sass"
import { graphql, useStaticQuery, Link } from 'gatsby';

// Anonymous function export is a warning, though I prefer it.
export default function Layout({ children }) {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata{
          title
        }
      }
    }
  `
  )

  const { title } = data.site.siteMetadata

  return (
    <div className={styles.container}>
      <header className={styles.title}>
        <Link to="/">
          <h3>
            {title}
          </h3>
        </Link>
      </header>
      {children}
    </div>
  )
}
