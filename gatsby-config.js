module.exports = {
  siteMetadata: {
    title: `Adam Collier`,
    description: `This site is as much for me as it is for you. See what snippets I like to use, what resources I learn from and my thoughts and processes.`,
    author: `@collieradam`,
    siteUrl: `https://adamcollier.co.uk/`,
    image: '/images/meta-image.jpg',
    keywords: ['Adam Collier', 'gatsby', 'blog', 'resources', 'snippets'],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-sitemap',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `115`,
            },
          },
          `resource-format`,
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              destinationDir: `${__dirname}/content`,
              ignoreFileExtensions: [`png`, `jpg`, `jpeg`, `webp`],
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              linkImagesToOriginal: false,
              maxWidth: 740,
              withWebp: true,
              quality: 90,
            },
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Adam Collier`,
        short_name: `Adam Collier`,
        start_url: `/`,
        lang: `en`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `standalone`,
        icon: `src/icons/icon.svg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /icons/, // See below to configure properly
        },
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `115`,
            },
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'noopener noreferrer',
            },
          },
          {
            resolve: require.resolve(`./plugins/resource-format`),
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              destinationDir: `${__dirname}/content`,
              ignoreFileExtensions: [`png`, `jpg`, `jpeg`, `webp`],
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              linkImagesToOriginal: false,
              maxWidth: 740,
              withWebp: true,
              quality: 90,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-remark-images`,
      options: {
        linkImagesToOriginal: false,
        maxWidth: 740,
        withWebp: true,
        quality: 90,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
