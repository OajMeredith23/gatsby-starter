import React from "react"
import * as styles from "./layout.module.sass"
import { graphql, useStaticQuery, Link } from 'gatsby';
import FeatherIcon from 'feather-icons-react'
import { Helmet } from "react-helmet"

export default function Layout({ children, location, goBack }) {

  const isHome = typeof window !== 'undefined' ? window.location.pathname === '/' : false;

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
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        {/* <link rel="canonical" href="TODO:// update with live url" /> */}

      </Helmet>

      <header className={`${styles.navbar} ${isHome ? styles.isHome : ''}`}>
        <Link to="/" className={styles.title}>
          <h3>
            {title}
          </h3>
        </Link>

        {goBack &&
          <div className={styles.goBack}>
            <Link to={goBack.path}>
              <FeatherIcon icon="arrow-left" /> <small>{goBack.text}</small>
            </Link>
          </div>
        }

      </header>

      {children}
    </div>
  )
}
