require(`dotenv`).config();

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE;

module.exports = {
  siteMetadata: {
    // You can overwrite values here that are used for the SEO component
    // You can also add new values here to query them like usual
    // See all options: https://github.com/LekoArts/gatsby-themes/blob/main/themes/gatsby-theme-minimal-blog/gatsby-config.js
    siteTitle: `Minimal Blog`,
    siteTitleAlt: `Minimal Blog - Gatsby Theme`,
    siteHeadline: `Minimal Blog - Gatsby Theme from @lekoarts`,
    siteUrl: `https://minimal-blog.lekoarts.de`,
    siteDescription: `Typography driven, feature-rich blogging theme with minimal aesthetics. Includes tags/categories support and extensive features for code blocks such as live preview, line numbers, and line highlighting.`,
    siteLanguage: `en`,
    siteImage: `/banner.jpg`,
    author: `@lekoarts_de`,
  },
  plugins: [
    // {
    //   resolve: `gatsby-omni-font-loader`,
    //   options: {
    //     enableListener: true,
    //     preconnect: [`https://fonts.gstatic.com`],
    //     // If you plan on changing the font you'll also need to adjust the Theme UI config to edit the CSS
    //     // See: https://github.com/LekoArts/gatsby-themes/tree/main/examples/minimal-blog#changing-your-fonts
    //     web: [
    //       {
    //         name: `IBM Plex Sans`,
    //         file: `https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap`,
    //       },
    //     ],
    //   },
    // },
    `gatsby-plugin-sitemap`,
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `minimal-blog - @lekoarts/gatsby-theme-minimal-blog`,
    //     short_name: `minimal-blog`,
    //     description: `Typography driven, feature-rich blogging theme with minimal aesthetics. Includes tags/categories support and extensive features for code blocks such as live preview, line numbers, and code highlighting.`,
    //     start_url: `/`,
    //     background_color: `#fff`,
    //     // This will impact how browsers show your PWA/website
    //     // https://css-tricks.com/meta-theme-color-and-trickery/
    //     // theme_color: `#6B46C1`,
    //     display: `standalone`,
    //     icons: [
    //       {
    //         src: `/android-chrome-192x192.png`,
    //         sizes: `192x192`,
    //         type: `image/png`,
    //       },
    //       {
    //         src: `/android-chrome-512x512.png`,
    //         sizes: `512x512`,
    //         type: `image/png`,
    //       },
    //     ],
    //   },
    // },
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
        apiKey: `keyDT1EOoXmtOh0BK`, // may instead specify via env, see below
        concurrency: 5, // default, see using markdown and attachments for more information
        tables: [
          {
            baseId: `appPWchccYiFTZrfx`,
            tableName: `Candidate`,
            // tableView: `Developers`, // optional
            queryName: `Candidate`, // optionally default is false - makes all records in this table a separate node type, based on your tableView, or if not present, tableName, e.g. a table called "Fruit" would become "allAirtableFruit". Useful when pulling many airtables with similar structures or fields that have different types. See https://github.com/jbolda/gatsby-source-airtable/pull/52.
            // mapping: { `CASE_SENSITIVE_COLUMN_NAME`: `VALUE_FORMAT` }, // optional, e.g. "text/markdown", "fileNode"
            tableLinks: [`Skills`, `Experience`], // optional, for deep linking to records across tables.
            separateNodeType: true, // boolean, default is false, see the documentation on naming conflicts for more information
            // separateMapType: false, // boolean, default is false, see the documentation on using markdown and attachments for more information
          },
          {
            baseId: `appPWchccYiFTZrfx`,
            tableName: `CandidateSkill`,
            queryName: `CandidateSkill`,
            tableLinks: [`Skill`],
            separateNodeType: true,
          },
          {
            baseId: `appPWchccYiFTZrfx`,
            tableName: `Skill`,
            queryName: `Skill`,
            separateNodeType: true,
          },
          {
            baseId: `appPWchccYiFTZrfx`,
            tableName: `Experience`,
            queryName: `Experience`,
            separateNodeType: true,
          },
        ],
      },
    },
  ].filter(Boolean),
};
