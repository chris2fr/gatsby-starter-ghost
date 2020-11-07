/**
 * Custom schema with types based on the Ghost V3 API spec.
 *
 * Note that GhostPost and GhostPage are identical.
 *
 * Foreign Keys are linked by 'slug'.
 *
 * `GhostNavigation` and `GhostPostCount` are custom types which do not become nodes.
 * They instead represent the shape of objects returned by the Ghost API for navigation and post count.
 */
const types = `
type JsonResume implements Node {
    basics: JsonResumeBasics
    work: [JsonResumeWork]
    volunteer: [JsonResumeVolunteer]
    education: [JsonResumeEducation]
    awards: [JsonResumeAwards]
    publications: [JsonResumePublications]
    skills: [JsonResumeSkills]
    languages: [JsonResumeLanguages]
    interests: [JsonResumeInterests]
    references: [JsonResumeRefences]
    projects: [JsonResumeProjects]
    meta: JsonResumeMeta
}

type JsonResumeBasics @dontInfer {
  name: String
  label: String
  image: String
  email: String
  phone: String
  summary: String
  location: JsonResumeLocation
  profiles: [JsonResumeBasicsProfiles]
}

type JsonResumeLocation @dontInfer {
  address: String
  postalCode: String
  city: String
  countryCode: String
  region: String
}

type JsonResumeBasicsProfiles @dontInfer{
    network: String
    username: String
    url: String
}

type JsonResumeWork @dontInfer {
  name: String
  location: String
  description: String
  position: String
  url: String
  startDate: Date @dateformat
  endDate: Date @dateformat
  summary: String
  highlights: [String]
}

type JsonResumeVolunteer @dontInfer {
  organization: String
  position: String
  url: String
  startDate: Date @dateformat
  endDate: Date @dateformat
  summary: String
  highlights: [String]
}

type JsonResumeEducation @dontInfer {
  institution: String
  url: String
  area: String
  studyType: String
  startDate: Date @dateformat
  endDate: Date @dateformat
  score: String
  courses: [String]
}
type JsonResumeAwards @dontInfer {
  title: String
  date: Date @dateformat
  awarder: String
  summary: String
}
type JsonResumePublications @dontInfer {
  name: String
  publisher: String
  releaseDate: Date @dateformat
  url: String
  summary: String
}
type JsonResumeSkills @dontInfer {
  name: String
  level: String
  keywords: [String]
}
type JsonResumeLanguages @dontInfer {
  language: String
  fluency: String
}
type JsonResumeInterests @dontInfer {
  name: String
  keywords: [String]
}
type JsonResumeRefences @dontInfer {
  name: String
  reference: String
}
type JsonResumeProjects @dontInfer {
  name: String
  description: String
  highlights: [String]
  keywords: [String]
  startDate: Date @dateformat
  endDate: Date @dateformat
  url: String
  roles: [String]
  entity: String
  type: String
}
type JsonResumeMeta @dontInfer {
  canonical: String
  version: String
  lastModified: String
}
`;

module.exports = types;
