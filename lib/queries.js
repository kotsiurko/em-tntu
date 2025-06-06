import { client } from "./client";

export const newsPerPage = 10;

export async function mainMenuQueriesObjCreator(slug) {
  const aboutItems = await client.fetch(chapterTitleQuery("about"));
  const aboutMTBItems = await client.fetch(chapterTitleQuery("about-mtb"));

  const specialitiesItems = await client.fetch(
    chapterTitleQuery("specialities")
  );
  const specialitiesSHItems = await client.fetch(
    chapterTitleQuery("specialities-sh")
  );

  const bachelorItems = await client.fetch(chapterTitleQuery("bachelor"));
  const bachelorEPPItems = await client.fetch(
    chapterTitleQuery("bachelor-epp")
  );

  const masterItems = await client.fetch(chapterTitleQuery("master"));
  const masterEPPItems = await client.fetch(chapterTitleQuery("master-epp"));

  const entrantItems = await client.fetch(chapterTitleQuery("entrant"));

  const scienceItems = await client.fetch(chapterTitleQuery("science"));
  const scienceLEConferenceItems = await client.fetch(
    chapterTitleQuery("scienceLEConference")
  );
  const scienceConferenceByIPulujItems = await client.fetch(
    chapterTitleQuery("scienceConferenceByIPuluj")
  );

  const postgraduateItems = await client.fetch(
    chapterTitleQuery("postgraduate")
  );

  const internationalActivityItems = await client.fetch(
    chapterTitleQuery("international-activity")
  );

  const educationalActivityItems = await client.fetch(
    chapterTitleQuery("educational-activity")
  );

  // const referencesItems = await client.fetch(chapterTitleQuery("references"));

  const intrestingItems = await client.fetch(chapterTitleQuery("intresting"));
  //
  return {
    aboutItems,
    aboutMTBItems,

    specialitiesItems,
    specialitiesSHItems,

    bachelorItems,
    bachelorEPPItems,

    masterItems,
    masterEPPItems,

    entrantItems,

    scienceItems,
    scienceLEConferenceItems,
    scienceConferenceByIPulujItems,

    postgraduateItems,

    internationalActivityItems,

    educationalActivityItems,

    // referencesItems,

    intrestingItems,
  };
}

export const newsQuery = `*[_type == "news"]{
  newsTitle,
  slug,
  publishedDate,
  newsItemBodyShort,
  mainPhoto,
  allNewsBool,
  eduLabsBool,
  seninarsBool,
  studentsDevsBool,
  communicWithSHBool,
  practiceOrientedEducationBool,
  thematicExcursionsBool,
  nonFormalEducationBool,
  dualEducationBool,
  studentsPsychologicalSupportBool,
  masterAcademicHonestyBool,
  bachelorAcademicHonestyBool,
  masterEppMeetingsBool,
  bachelorEppMeetingsBool,
  masterDiplomaDefenceBool,
  bachelorDiplomaDefenceBool,
  masterNormativeDiscBool,
  bachelorNormativeDiscBool,
  bachelorElectiveDiscBool,
  masterElectiveDiscBool,
  newsForEntrantsBool,
  schoolsCooperationBool,
  studentOlympiadsBool,
  studHonorsBool,
  conferenceLEandPEBool,
  academicMobilityBool,
  intPractOfStudentsBool,
  intInternshipBool,
  eventsConferencesForumsBool,
  programsTrainingsProjectsBool,
  eaSportLifeBool,
  eaExcursionsBool,
  eaFacultyDaysBool,
} | order(publishedDate desc)`;

// Для відображення списку викладачів
export const staffListQuery = `*[_type == "person"] {
  firstName,
  secondName,
  fatherName,
  gender,
  sciDegree,
  acadStatus,
  sciDegreeShort,
  position,
  additional_requisites,
  mainPhoto,
  weight,
  slug,
  formerEmployeeBool,
}`;

// Для відображення вибраних викладачів на головній сторінці
export const mainStaffListQuery = `*[_type == "person" && toShowOnMainPage == true] {
  firstName,
  secondName,
  fatherName,
  sciDegree,
  acadStatus,
  position,
  mainPhoto,
  socials,
  weight,
  personSlogan,
  personSlogan2,
  _id,
  slug,
} | order(weight desc)`;

// Query for any page that are in all chapters
export const chapterTitleQuery = (chapter) => {
  return `*[_type == '${chapter}']{
    title,
    positionNumber,
    slug
  }`;
};

export const chapterPageQuery = (chapter, slug) => {
  return `*[_type=='${chapter}' && slug.current == '/${chapter}/${slug}'][0]`;
};

export const chapterItemQuery = (chapter, slug) => {
  return `*[_type=='${chapter}' && slug.current == '${slug}'][0]`;
};

export const paginationQuery = (start, end, bool) => {
  return `*[_type == "news" && ${bool}] | order(publishedDate desc) [${start}...${end}]`;
};

export const slugCurrent = (chapter) => {
  return `*[type=='${chapter}']{
    slug{
      current
    }
      }`;
};

export const paginationQuery2 = (start, end) => {
  return `*[_type == "news"] | order(publishedDate desc) [${start}...${end}]`;
};

export const heroItemQuery = (slug) => {
  return `*[_type == 'other'][0]{heroesList[][customURL.current == '${slug}'][0]}`;
};
