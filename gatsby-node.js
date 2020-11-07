const path = require(`path`);
const { postsPerPage } = require(`./src/utils/siteConfig`);
const { paginate } = require(`gatsby-awesome-pagination`);
const siteConfigData = require("./src/utils/siteConfig");

////////////////////////////////////
const {
  PostNode,
  PageNode,
  TagNode,
  AuthorNode,
  SettingsNode
} = require('./ghost-nodes');

const ResumeNode = require("./json-resume-nodes");


/*
module.exports = {
    PostNode,
    PageNode,
    TagNode,
    AuthorNode,
    SettingsNode
};
*/

const ghostTypes = require("./ghost-schema");
const jsonResumeTypes = require("./json-resume-schema");
// console.log(ghostTypes,jsonResumeTypes);

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(ghostTypes);
  createTypes(jsonResumeTypes);
};

////////////////////////////////////

/*
exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    Frontmatter: {
      author: {
        resolve(source, args, context, info) {
          return context.nodeModel.getNodeById({
            id: source.author,
            type: "AuthorJson",
          });
        },
      },
    },
  };
  createResolvers(resolvers);
};
*/
/*
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type ArticleMetaGhost implements Node {
        data: ArticleMetaGhostData,
        settings: ArticleMetaGhostSettings,
        canonical: String,
    }
    type ArticleMetaGhostData  {
        title: String,
        published_at: String,
        updated_at: String,
        meta_title: String,
        meta_description: String,
        primary_author: ArticleMetaGhostDataPrimaryAuthor,
        feature_image: String,
        tags: [ArticleMetaDataTag],
        primaryTag: ArticleMetaDataPrimaryTag,
        og_title: String,
        og_description: String,
        twitter_title: String,
        twitter_description: String,
        excerpt: String,
    },
    type ArticleMetaDataTag {
        name: String,
        slug: String,
        visibility: String,
    },
    type ArticleMetaDataPrimaryTag  {
        name: String,
    },
    type ArticleMetaGhostSettings  {
        logo: GenericObject,
        title: String,
        twitter: String,
        allGhostSettings: ArticleMetaGhostSettingsAllGhostSettings,
    },
    type ArticleMetaGhostDataPrimaryAuthor {
            name: String,
            profile_image: String,
            website: String,
            twitter: String,
            facebook: String,
    },
    type ArticleMetaGhostSettingsAllGhostSettings {
        name: String
    }
    `;
  createTypes(typeDefs);
};
*/

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  
  let jsonResumeObject = require("./src/mann/data/json-resume/cv_chris_mann_fr.json");
  //console.log(jsonResumeObject);
  const jsonResumeData = {
    id: "Chris Mann CV",
    basics: jsonResumeObject.basics,
    work: jsonResumeObject.work,
    volunteer: jsonResumeObject.volunteer,
    education: jsonResumeObject.education,
    awards: jsonResumeObject.awards,
    publications: jsonResumeObject.publications,
    skills: jsonResumeObject.skills,
    languages: jsonResumeObject.languages,
    interests: jsonResumeObject.interests,
    references: jsonResumeObject.references,
    projects: jsonResumeObject.projects,
    meta: jsonResumeObject.meta,
    internal: {
      type: "JsonResume",
      contentDigest: createContentDigest(jsonResumeObject),
    },
  };
  actions.createNode(jsonResumeData);
  
  let dummyData = {
    GhostSettings: require("./src/mann/data/ghost/settings/dummy-settings.json"), /*{
      title: "Ghost Settings Title",
      description: "Description in Ghost Settings",
      logo: "https://picsum.photos/500",
      icon: "https://picsum.photos/300",
      cover_image: "https://picsum.photos/1200",
      facebook: "null",
      twitter: "null",
      lang: "US-en",
      timezone: "Paris/Europe",
      codeinjection_head: "",
      codeinjection_foot: "",
      codeinjection_styles: "{}",
      navigation: [
          { 
              label: "home", 
              url: "/" 
            }
        ],
    },

    */
    GhostPost: require("./src/mann/data/ghost/post/dummy-post.json"), /*{
      data: {
        codeinjection_styles: {},
        title: "Post Title",
        html: "<p>This is the HTML content of the post.</p>",
        feature_image: "https://picsum.photos/600",
      },
      slug: "post1",
      feature_image: "https://picsum.photos/700",
      published_at: null,
      updated_at: null,
      tags: [
        {slug: "tag1", },
      ],
      primaryTag: {
        slug: "tag1",
      },
      title: "Post Title Here",
      primary_author: {slug:"author1"},
      featured: true,
      excerpt: "This is an excerpt of the post.",
      meta_title: "Meta Title",
      meta_description: "Meta Description goes Here",
      og_title: "Open-Graph Title",
      og_description: "Open-Graph Description goes Here",
      // should be functions on Post
      visibility: true, 
      url: "https://www.example.com",
      uuid: "post1",
      id: "post1",
      created_at_pretty: "1 January, 2020",
      created_at: "1 January, 2020",
      authors: ["author1",],
    },

    */
    GhostNavigation: require("./src/mann/data/ghost/navigation/dummy-navigation.json"), /*{
      data: {
        url: "/",
        label: "Home",
      },
      navClass: null,
    },

    */
    GhostAuthor: require("./src/mann/data/ghost/author/dummy-author.json"), /*{
      data: {
        name: "Author 1 Name",
        bio: "This is the bio of Author 1",
        profile_image: "https://picsum.photos/800",
        cover_image: "https://picsum.photos/900",
        website: "https://www.example.com",
        twitter: "null",
        facebook: "null",
        location: "Somewhere, Someplace",
      },
      settings: {
        title: "Author Title",
        twitter: "null",
        description: "Author description goes here.",
      },
      canoncial: "https://www.example.com",
      location: "Somewhere/Someplace",
      // Should be functions
      slug: "author1", 
      url: "http://www.example.com", 
      postCount: 5, 
      pageContext: {},
      name: "Author 1 Name",
      count: {posts: 5},
    },
    */
    GhostPage:  require("./src/mann/data/ghost/page/dummy-page.json") /*{
      data: {
        // ghostPage: {
        codeinjection_styles: {},
        title: "Page Title",
        html: "<p>Page HTML paragraph</p>",
        feature_image: "https://picsum.photos/1000",
        //},
      },
      location: "/location/pathname/",
      // Should be a function on Page
      slug: "page1", 
      url: "http://www.example.com", 
      title: "Ghost Page",
      created_at: "2020-01-01",
      id: "page1",
      uuid: "page",
      featured: true,
      visibility: true,
      authors: ["author1",],
      primary_author: {slug:"author1"},
    },
    */
/*
    GhostTag: {
      data: {
        name: "tag1",
        slug: "tag1",
        visibility: "public", // not sure here
        description: "This paragraph describes tag 1.",
      },
      location: {
        pathname: "tag1",
      },
      // Should be a function on Tag
      slug: "tag1", 
      url: "http://www.example.com", 
      pageContext: {},
      name: "tag1,",
      visibility: true,
    },
    */
  }
  dummyData.GhostTag = require("./src/mann/data/ghost/tag/dummy-tag1.json");
  //console.log(dummyData);
  let topObjectKeys = Object.keys(dummyData);
  // console.log(topObjectKeys);
  for (
    var itTopObjectKeys = topObjectKeys.values(), topObjectKey = null;
    (topObjectKey = itTopObjectKeys.next().value);

  ) {
    let internalObject = {};
    let keys = Object.keys(dummyData[topObjectKey]);
    // console.log("AAAAAAAAAAAAAAA keys",keys);
    for (var it = keys.values(), key = null; (key = it.next().value); ) {
      internalObject[key] = dummyData[topObjectKey][key]
        ? dummyData[topObjectKey][key]
        : null;
    }
    // console.log("AAAAAAAAAAAAAAA Internal Object", internalObject);

    let externalObject = {
      id: createNodeId(topObjectKey),
      internal: {
        type: topObjectKey,
        contentDigest: createContentDigest(internalObject),
      },
    };

    for (var it = keys.values(), key = null; (key = it.next().value); ) {
      externalObject[key] = internalObject[key];
    }

    // console.log("AAAAAAAAAAAAAAA adding node",externalObject);
    actions.createNode(externalObject);
  }
};

/**
 * Here is the place where Gatsby creates the URLs for all the
 * posts, tags, pages and authors that we fetched from the Ghost site.
 */

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    const result = await graphql(`
        {
            allGhostPost(sort: { order: ASC, fields: published_at }) {
                edges {
                    node {
                        slug
                    }
                }
            }
            allGhostTag(sort: { order: ASC, fields: name }) {
                edges {
                    node {
                        slug
                        url
                        postCount
                    }
                }
            }
            allGhostAuthor(sort: { order: ASC, fields: name }) {
                edges {
                    node {
                        slug
                        url
                        postCount
                    }
                }
            }
            allGhostPage(sort: { order: ASC, fields: published_at }) {
                edges {
                    node {
                        slug
                        url
                    }
                }
            }
        }
    `)

    // Check for any errors
    if (result.errors) {
        throw new Error(result.errors)
    }

    // Extract query results
    const tags = result.data.allGhostTag.edges
    const authors = result.data.allGhostAuthor.edges
    const pages = result.data.allGhostPage.edges
    const posts = result.data.allGhostPost.edges

    // Load templates
    const indexTemplate = path.resolve(`./src/templates/index.js`)
    const tagsTemplate = path.resolve(`./src/templates/tag.js`)
    const authorTemplate = path.resolve(`./src/templates/author.js`)
    const pageTemplate = path.resolve(`./src/templates/page.js`)
    const postTemplate = path.resolve(`./src/templates/post.js`)

    // Create tag pages
    tags.forEach(({ node }) => {
        const totalPosts = node.postCount !== null ? node.postCount : 0
        const numberOfPages = Math.ceil(totalPosts / postsPerPage)

        // This part here defines, that our tag pages will use
        // a `/tag/:slug/` permalink.
        node.url = `/tag/${node.slug}/`

        Array.from({ length: numberOfPages }).forEach((_, i) => {
            const currentPage = i + 1
            const prevPageNumber = currentPage <= 1 ? null : currentPage - 1
            const nextPageNumber =
                currentPage + 1 > numberOfPages ? null : currentPage + 1
            const previousPagePath = prevPageNumber
                ? prevPageNumber === 1
                    ? node.url
                    : `${node.url}page/${prevPageNumber}/`
                : null
            const nextPagePath = nextPageNumber
                ? `${node.url}page/${nextPageNumber}/`
                : null

            createPage({
                path: i === 0 ? node.url : `${node.url}page/${i + 1}/`,
                component: tagsTemplate,
                context: {
                    // Data passed to context is available
                    // in page queries as GraphQL variables.
                    slug: node.slug,
                    limit: postsPerPage,
                    skip: i * postsPerPage,
                    numberOfPages: numberOfPages,
                    humanPageNumber: currentPage,
                    prevPageNumber: prevPageNumber,
                    nextPageNumber: nextPageNumber,
                    previousPagePath: previousPagePath,
                    nextPagePath: nextPagePath,
                },
            })
        })
    })
    // Create author pages
    authors.forEach(({ node }) => {
        const totalPosts = node.postCount !== null ? node.postCount : 0
        const numberOfPages = Math.ceil(totalPosts / postsPerPage)

        // This part here defines, that our author pages will use
        // a `/author/:slug/` permalink.
        node.url = `/author/${node.slug}/`

        Array.from({ length: numberOfPages }).forEach((_, i) => {
            const currentPage = i + 1
            const prevPageNumber = currentPage <= 1 ? null : currentPage - 1
            const nextPageNumber =
                currentPage + 1 > numberOfPages ? null : currentPage + 1
            const previousPagePath = prevPageNumber
                ? prevPageNumber === 1
                    ? node.url
                    : `${node.url}page/${prevPageNumber}/`
                : null
            const nextPagePath = nextPageNumber
                ? `${node.url}page/${nextPageNumber}/`
                : null

            createPage({
                path: i === 0 ? node.url : `${node.url}page/${i + 1}/`,
                component: authorTemplate,
                context: {
                    // Data passed to context is available
                    // in page queries as GraphQL variables.
                    slug: node.slug,
                    limit: postsPerPage,
                    skip: i * postsPerPage,
                    numberOfPages: numberOfPages,
                    humanPageNumber: currentPage,
                    prevPageNumber: prevPageNumber,
                    nextPageNumber: nextPageNumber,
                    previousPagePath: previousPagePath,
                    nextPagePath: nextPagePath,
                },
            })
        })
    })
// } // Temp  /*


    // Create pages
    pages.forEach(({ node }) => {
        // This part here defines, that our pages will use
        // a `/:slug/` permalink.
        node.url = `/${node.slug}/`

        createPage({
            path: node.url,
            component: pageTemplate,
            context: {
                // Data passed to context is available
                // in page queries as GraphQL variables.
                slug: node.slug,
            },
        })
    })

    // Create post pages
    posts.forEach(({ node }) => {
        // This part here defines, that our posts will use
        // a `/:slug/` permalink.
        node.url = `/${node.slug}/`

        createPage({
            path: node.url,
            component: postTemplate,
            context: {
                // Data passed to context is available
                // in page queries as GraphQL variables.
                slug: node.slug,
            },
        })
    })

    // Create pagination
    paginate({
        createPage,
        items: posts,
        itemsPerPage: postsPerPage,
        component: indexTemplate,
        pathPrefix: ({ pageNumber }) => {
            if (pageNumber === 0) {
                return `/`
            } else {
                return `/page`
            }
        },
    })
}