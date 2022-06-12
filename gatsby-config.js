const {
  capitalizeWords,
  getNumberRanges,
  semiColonsToArray,
  indexArray,
  arrayToSemiColonStr,
} = require("./src/helpers/local-search-helpers")

require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: "FBI Most Wanted",
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`, {
    {
      resolve: `@martinreiche/gatsby-firestore`,
      options: {
        // credential or appConfig
        credential: require(`./firebase.json`),
        types: [
          {
            type: `Fugitive`,
            collection: `fugitives`,
            map: doc => ({
              title: doc.title,
              reward_text: doc.reward_text,
              aliases: doc.aliases,
              publication: doc.publication,
              url: doc.url,
              warning_message: doc.warning_message,
              age_max: doc.age_max,
              additional_information: doc.additional_information,
              weight_min: doc.weight_min,
              height_min: doc.height_min,
              field_offices: doc.field_offices,
              age_min: doc.age_min,
              occupations: doc.occupations,
              height_max: doc.height_max,
              details: doc.details,
              weight_max: doc.weight_max,
              coordinates: doc.coordinates,
              sex: doc.sex,
              scars_and_marks: doc.scars_and_marks,
              build: doc.build,
              reward_max: doc.reward_max,
              nationality: doc.nationality,
              reward_min: doc.reward_min,
              caution: doc.caution,
              suspects: doc.suspects,
              race: doc.race,
              hair: doc.hair,
              modified: doc.modified,
              weight: doc.weight,
              place_of_birth: doc.place_of_birth,
              description: doc.description,
              age_range: doc.age_range,
              legat_names: doc.legat_names,
              eyes_raw: doc.eyes,
              files: doc.flies,
              locations: doc.locations,
              images: doc.images,
              uid: doc.uid,
              hair_raw: doc.hair_raw,
              status: doc.status,
              remarks: doc.remarks,
              path: doc.path,
              complexion: doc.complexion,
              possible_states: doc.possible_states,
              eyes: doc.eyes,
              subjects: doc.subjects,
              languages: doc.languages,
              ncic: doc.ncic,
              possible_countries: doc.possible_countries,
              dates_of_birth_used: doc.dates_of_birth_used,
              person_classification: doc.person_classification,
              race_raw: doc.race_raw,
            }),
          },
        ],
      },
    },

    {
      resolve: "gatsby-plugin-local-search",
      options: {
        // A unique name for the search index. This should be descriptive of
        // what the index contains. This is required.
        name: "fugitives",

        // Set the search engine to create the index. This is required.
        // The following engines are supported: flexsearch, lunr
        engine: "flexsearch",

        // Provide options to the engine. This is optional and only recommended
        // for advanced users.
        //
        // Note: Only the flexsearch engine supports options.
        engineOptions: "speed",

        // GraphQL query used to fetch all data for the search index. This is
        // required.
        query: `
        {
          allFugitive {
            edges {
              node {
                id
                title
                race
                age_range
                aliases
                build
                dates_of_birth_used
                description
                eyes
                hair
                occupations
                sex
                weight
                nationality
                height_max
                height_min
                weight_min
                weight_max
                warning_message
                subjects
                images {
                  caption
                  large
                  original
                  thumb
                }
              }
            }
          }
        }
        `,

        // Field used as the reference value for each document.
        // Default: 'id'.
        ref: "id",

        // List of keys to index. The values of the keys are taken from the
        // normalizer function below.
        // Default: all fields
        index: [
          "title",
          "race",
          "aliases",
          "eyes",
          "hair",
          "sex",
          "weight",
          "nationality",
          "weight",
          "height",
          "description",
          "occupations",
          "subjects",
        ],

        // List of keys to store and make available in your UI. The values of
        // the keys are taken from the normalizer function below.
        // Default: all fields
        store: [
          "id",
          "title",
          "race",
          "aliases",
          "images",
          "eyes",
          "hair",
          "sex",
          "weight",
          "nationality",
          "weight",
          "height",
          "description",
          "warning_message",
          "subjects",
        ],
  
        // Function used to map the result from the GraphQL query. This should
        // return an array of items to index in the form of flat objects
        // containing properties to index. The objects must contain the `ref`
        // field above (default: 'id'). This is required.
        normalizer: ({ data }) => {
          return data.allFugitive.edges.map(({ node }) => {
            const {
              id,
              title,
              race,
              aliases,
              description,
              images,
              eyes,
              hair,
              sex,
              nationality,
              height_max,
              height_min,
              weight_max,
              weight_min,
              warning_message,
              subjects,
            } = node
            return {
              id,
              title,
              race: capitalizeWords(race),
              aliases: arrayToSemiColonStr(aliases),
              description,
              images,
              eyes: capitalizeWords(eyes, "eyes"),
              hair: capitalizeWords(hair, "hair"),
              sex: capitalizeWords(sex),
              weight: getNumberRanges(weight_min, weight_max, "lbs"),
              height: getNumberRanges(height_min, height_max, "inches tall"),
              nationality,
              warning_message,
              subjects,
            }
          })
        },
      },
    },
  ],
}
