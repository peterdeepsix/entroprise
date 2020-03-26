module.exports = {
  siteMetadata: {
    title: `Entroprise`,
    description: `Entroprise`,
    author: `Peter Arnold`,
  },
  plugins: [
    "gatsby-plugin-root-import",
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`muli`],
        display: "swap",
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/app/*`] },
    },
    {
      resolve: "gatsby-plugin-transition-link",
      options: {
        // layout: require.resolve(`./src/layouts/InterfaceLayout`),
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
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Entroprise`,
        short_name: `Entroprise`,
        description: `Entroprise`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#219a49`,
        display: `minimal-ui`,
        icon: `src/images/logo.png`,
      },
    },
  ],
}
