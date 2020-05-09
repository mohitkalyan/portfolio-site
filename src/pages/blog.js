import React, { useState } from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import Blogpost from "../components/Blogpost"
import Sidebar from "../components/Sidebar"

import styles from "./blog.module.scss"

const Blog = ({ data }) => {
  const tags = data.allMarkdownRemark.group

  const [posts, setFilteredPosts] = useState(data.allMarkdownRemark.edges)
  const [activeTags, setActiveTags] = useState([])

  const handleClick = e => {
    e.preventDefault()

    let tagName = e.target.textContent

    let selectedTags = activeTags.includes(tagName)
      ? activeTags.filter(x => x !== tagName)
      : [...activeTags, tagName]

    setActiveTags(selectedTags)

    let allPosts = data.allMarkdownRemark.edges

    let filteredPosts = allPosts.filter(({ node }) => {
      let { tags } = node.frontmatter
      // if post doesnt have any tags return
      if (!tags) return false
      // if there are no active tags return all posts
      if (selectedTags.length === 0) return node
      // if selectedTags include a post tag return the tag
      let matchingTags = selectedTags.filter(tag => tags.includes(tag))
      // if they have matching tags return the post
      return matchingTags.length >= 1
    })

    setFilteredPosts(filteredPosts)
  }

  return (
    <Layout container="fluid" className={styles.blog}>
      <SEO title="Blog page" />
      <Sidebar>
        <p>
          A collection of writing which can range from talking about code,
          design or life in general. Enjoy this eclectic collection of writings
        </p>
        <div className={styles.tags}>
          {tags.map(({ tag }, i) => (
            <button
              key={i}
              className={`${activeTags.includes(tag) ? styles.active : ""}`}
              onClick={handleClick}
              onKeyDown={handleClick}
            >
              {tag}
            </button>
          ))}
        </div>
      </Sidebar>
      <div className={styles.blogposts}>
        {posts.map(({ node }, i) => (
          <Blogpost node={node} key={i} />
        ))}
      </div>
    </Layout>
  )
}

export default Blog

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/blog/" } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            thumbnail {
              childImageSharp {
                fixed(width: 114, height: 114, quality: 90, toFormat: JPG) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
            }
            tags
          }
        }
      }
      group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
    }
  }
`
