require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

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
      resolve: "gatsby-plugin-firebase",
      options: {
        features: {
          auth: true,
          database: true,
          firestore: true,
          storage: true,
          messaging: true,
          functions: true,
          performance: true,
          analytics: true,
        },
        credentials: {
          apiKey: process.env._F_APIKEY,
          authDomain: process.env._F_AUTHDOMAIN,
          databaseURL: process.env._F_DATABASEURL,
          projectId: process.env._F_PROJECTID,
          storageBucket: process.env._F_STORAGEBUCKET,
          messagingSenderId: process.env._F_MESSAGINGSENDERID,
          appId: process.env._F_APPID,
          measurementId: process.env._F_MEASUREMENTID,
        },
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {},
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/app/*`] },
    },
    {
      resolve: "gatsby-plugin-transition-link",
      options: {},
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
