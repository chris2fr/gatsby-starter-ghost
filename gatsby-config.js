const path = require(`path`)

const config = require(`./src/utils/siteConfig`)
const generateRSSFeed = require(`./src/utils/rss/generate-feed`)


/*
let ghostConfig

try {
    ghostConfig = require(`./.ghost`)
} catch (e) {
    ghostConfig = {
        production: {
            apiUrl: process.env.GHOST_API_URL,
            contentApiKey: process.env.GHOST_CONTENT_API_KEY,
        },
    }
} finally {
    const { apiUrl, contentApiKey } = process.env.NODE_ENV === `development` ? ghostConfig.development : ghostConfig.production

    if (!apiUrl || !contentApiKey || contentApiKey.match(/<key>/)) {
        throw new Error(`GHOST_API_URL and GHOST_CONTENT_API_KEY are required to build. Check the README.`) // eslint-disable-line
    }
}

if (process.env.NODE_ENV === `production` && config.siteUrl === `http://localhost:8000` && !process.env.SITEURL) {
    throw new Error(`siteUrl can't be localhost and needs to be configured in siteConfig. Check the README.`) // eslint-disable-line
}
*/

/**
* This is the place where you can tell Gatsby which plugins to use
* and set them up the way you want.
*
* Further info 👉🏼 https://www.gatsbyjs.org/docs/gatsby-config/
*
*/
module.exports = {
    siteMetadata: {
        siteUrl: process.env.SITEURL || config.siteUrl,
           // Added by chris2fr
    siteSettings: {
        twitter: null,
        facebook: null,
        codeinjection_styles: null,
        cover_image: null,
        title: "Site Title",
        description: "Site descripvie text goes here.",
        logo: {
            image: 'https://picsum.photos/200',
        },
    },
    siteData: {
        title: "Site Data Title",
        meta_title: "Site Data Meta Title",
        meta_description: "Thise is the site data meta description.",
        name: "Site Data Name",
        feature_image: 'https://picsum.photos/200',
        description: "This is the Site Data description sentence / paragraph.",
        bio: "This is the site data bio.",
        profile_image: 'https://picsum.photos/200',
    },
    canoncial: `http://localhost:8000`,
    title: "Root Title",
    description: "This is the root description paragraph.",
    image: `http://localhost:8000`,
    type: `WebSite`, // PropTypes.oneOf([`WebSite`, `Series`]).isRequired,
    ghostSettings: {
        title: "Ghost Settings Title",
        description: "Description in Ghost Settings",
        logo: "https://picsum.photos/200",
        icon: 'https://picsum.photos/200',
        cover_image: 'https://picsum.photos/1200',
        facebook: null,
        twitter: null,
        lang: "US-en",
        timezone: null,
        codeinjection_head: "",
        codeinjection_foot: "",
        codeinjection_styles: "",
        navigation: {
            label: 'home',
            url: '/',
        },
    },
    ghostPosts: [
        {
            data: {
                codeinjection_styles: {},
                title: "Post Title",
                html: "<p>This is the HTML content of the post.</p>",
                feature_image: 'https://picsum.photos/200',
            },
            slug: '/post-slug/',
            feature_image: 'https://picsum.photos/200',
            published_at: null,
            updated_at: null,
            tags: [
                {
                    name: 'tag1',
                    slug: '/tags/tag1',
                    visibility: 'public', // not sure here
                }, {
                    name: 'tag2',
                    slug: '/tags/tag2',
                    visibility: 'public', // not sure here
                },
            ],
            primaryTag: 
            {
                name: 'tag1'
            },
            title: 'Post Title Here',
            primary_author: {
                name: 'Post Author',
                profile_image: 'https://picsum.photos/200',
                website: "https://www.example.com",
                twitter: null,
                facebook: null,
            },
            featured: true,
            excerpt: "This is an excerpt of the post.",
            meta_title: "Meta Title",
            meta_description: "Meta Description goes Here",
            og_title: "Open-Graph Title",
            og_description: "Open-Graph Description goes Here",
        },
    ],
    ghostNavigations: {
        data: {
            url: '/',
            label: 'Home',
        },
        navClass: null,
    },
    ghostAuthors: [
        {
            data: {
                name: "Author 1 Name",
                bio: "This is the bio of Author 1",
                profile_image: "https://picsum.photos/200",
                cover_image: "https://picsum.photos/200",
                website: "https://www.example.com",
                twitter: null,
                facebook: null,
                location: "Somewhere, Someplace",
            },
            settings: {
                title: "Author Title",
                twitter: null,
                description: "Author description goes here.",
            },
            canoncial: "https://www.example.com",
            location: {
                pathname: '',
            },
            pageContext: {},
        },
    ],
    ghostPages: [
        {
            data: {
                ghostPage: {
                    codeinjection_styles: {},
                    title: "Page Title",
                    html: "<p>Page HTML paragraph</p>",
                    feature_image: "https://picsum.photos/200",
                }
            },
            location: {
                pathname: "/location/pathname/",
            }
        }
    ],
    ghostTags: [
        {
            data: {
                name: 'tag1',
                slug: '/tags/tag1',
                visibility: 'public', // not sure here
                description: "This paragraph describes tag 1.",
            },
            location: {
                pathname: "/tags/tag1",
            },
            pageContext: {},
        }, {
            data: {
                name: 'tag2',
                slug: '/tags/tag2',
                visibility: 'public', // not sure here
                description: "This paragraph describes tag 2.",            
            },
            location: {
                pathname: "/tags/tag2",
            },
            pageContext: {},
        },
    ],
    },
    plugins: [
            `gatsby-transformer-json`,
            {
              resolve: `gatsby-source-filesystem`,
              options: {
                path: `./src/data/`,
              },
            },

        /**
         *  Content Plugins
         */
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: path.join(__dirname, `src`, `pages`),
                name: `pages`,
            },
        },
        // Setup for optimised images.
        // See https://www.gatsbyjs.org/packages/gatsby-image/
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: path.join(__dirname, `src`, `images`),
                name: `images`,
            },
        },
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        /*
        {
            resolve: `gatsby-source-ghost`,
            options:
                process.env.NODE_ENV === `development`
                    ? ghostConfig.development
                    : ghostConfig.production,
        },
        */
        /**
         *  Utility Plugins
         */
        
        {
            resolve: `gatsby-plugin-ghost-manifest`,
            options: {
                short_name: config.shortTitle,
                start_url: `/`,
                background_color: config.backgroundColor,
                theme_color: config.themeColor,
                display: `minimal-ui`,
                icon: `static/${config.siteIcon}`,
                legacy: true,
                query: `
                {
                    allGhostSettings {
                        edges {
                            node {
                                title
                                description
                            }
                        }
                    }
                }
              `,
            },
        },
        
        {
            resolve: `gatsby-plugin-feed`,
            
            options: {
                query: `
                {
                    allGhostSettings {
                        edges {
                            node {
                                title
                                description
                            }
                        }
                    }
                }
              `,
                feeds: [
                    generateRSSFeed(config),
                ],
            },
            
        },
        {
            resolve: `gatsby-plugin-advanced-sitemap`,
            
            options: {
                query: `
                {
                    allGhostPost {
                        edges {
                            node {
                                id
                                slug
                                updated_at
                                created_at
                                feature_image
                            }
                        }
                    }
                    allGhostPage {
                        edges {
                            node {
                                id
                                slug
                                updated_at
                                created_at
                                feature_image
                            }
                        }
                    }
                    allGhostTag {
                        edges {
                            node {
                                id
                                slug
                                feature_image
                            }
                        }
                    }
                    allGhostAuthor {
                        edges {
                            node {
                                id
                                slug
                                profile_image
                            }
                        }
                    }
                }`,
                mapping: {
                    allGhostPost: {
                        sitemap: `posts`,
                    },
                    allGhostTag: {
                        sitemap: `tags`,
                    },
                    allGhostAuthor: {
                        sitemap: `authors`,
                    },
                    allGhostPage: {
                        sitemap: `pages`,
                    },
                },
                exclude: [
                    `/dev-404-page`,
                    `/404`,
                    `/404.html`,
                    `/offline-plugin-app-shell-fallback`,
                ],
                createLinkInHead: true,
                addUncaughtPages: true,
            },
            
        },
        `gatsby-plugin-catch-links`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-force-trailing-slashes`,
        `gatsby-plugin-offline`,
    ],
}
