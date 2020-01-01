/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author
        }
      }
    }
  `)

  const { author } = data.site.siteMetadata
  return (
    <div>
      <p>ゆりかごから墓場まで</p>
      {author}<br />
      Osaka, Japan<br/>
      Icon by <a href="https://icooon-mono.com/" target="_blank">ICOOON MONO</a><br />
    </div>
  )
}

export default Bio
