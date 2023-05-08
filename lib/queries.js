export const newsQuery = `*[_type == "news"]{
  newsTitle,
  slug,
  publishedDate,
  newsItemBodyShort,
  mainPhoto,
  seninars,
  studentsDevs,
}`;

export const staffListQuery = `*[_type == "person"] {
  firstName,
  secondName,
  fatherName,
  sciDegree,
  acadStatus,
  position,
  mainPhoto,
  weight,
  slug,
}`;


// Query for any page that are in all chapters
export const chapterTitleQuery = (chapter) => {
  return `*[_type == '${chapter}']{
    title,
    positionNumber,
    slug
  }`
}

export const chapterPageQuery = (chapter, slug) => {
  return `*[_type=='${chapter}' && slug.current == '${chapter}/${slug}'][0]`
}

export const chapterItemQuery = (chapter, slug) => {
  return `*[_type=='${chapter}' && slug.current == '${slug}'][0]`
}

export const slugCurrent = (chapter) => {
  return `*[type=='${chapter}']{
    slug{
      current
    }
      }`
}