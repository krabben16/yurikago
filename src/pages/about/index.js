import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

class AboutPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="About" />
        <p><u>プロフィール</u></p>
        <p>Hiroki Kawaguchi</p>
        <p>大阪府在住</p>
        <p>Webエンジニア3年目</p>

        <p><u>スキル</u></p>
        <p>カッコ内は業務で経験した年数</p>
        <p>アプリケーション</p>
        <ul>
          <li>PHP（2年）</li>
          <li>MySQL（2年）</li>
          <li>Zend Framework（2年）</li>
          <li>Laravel（勉強中）</li>
          <li>Vue.js（勉強中）</li>
        </ul>
        <p>インフラ</p>
        <ul>
          <li>Vagrant（2年）</li>
          <li>Virtual Box（2年）</li>
          <li>Docker（勉強中）</li>
          <li>AWS EC2（1年）</li>
          <li>AWS CloudFront（1年）</li>
        </ul>
        <p>その他</p>
        <ul>
          <li>Google Analytics（勉強中）</li>
          <li>Google Search Console（2年）</li>
        </ul>
      </Layout>
    )
  }
}

export default AboutPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
