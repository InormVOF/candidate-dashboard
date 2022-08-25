require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE;

module.exports = {
  siteMetadata: {
    siteTitle: `Inorm`,
    siteHeadline: `Inorm is a valuable addition for your team or project`,
    siteUrl: `https://inorm.nl`,
    siteDescription: `Having over 20 years experience in Web Development we are able
    to distinguish which developer is the perfect fit for a project.
    We are working with a large pool of pre-screened developers from
    all over the planet.`,
    siteLanguage: `en`,
    siteImage: `/images/heroback.jpeg`,
    author: `@richardruiter`,
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Inorm is a valuable addition for your team or project`,
        short_name: `Inorm`,
        description: `Having over 20 years experience in Web Development we are able
        to distinguish which developer is the perfect fit for a project.
        We are working with a large pool of pre-screened developers from
        all over the planet.`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#003D5C`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    "gatsby-plugin-postcss",
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        analyzerMode: `static`,
        reportFilename: `_bundle.html`,
        openAnalyzer: false,
      },
    },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        concurrency: 5,
        tables: [
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Candidate`,
            queryName: `Candidate`,
            tableLinks: [`Skills`, `Experience`],
            separateNodeType: true,
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `CandidateSkill`,
            queryName: `CandidateSkill`,
            tableLinks: [`Skill`],
            separateNodeType: true,
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Skill`,
            queryName: `Skill`,
            separateNodeType: true,
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Experience`,
            queryName: `Experience`,
            separateNodeType: true,
          },
        ],
      },
    },
  ].filter(Boolean),
};
