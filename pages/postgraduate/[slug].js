import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";

// Client connection
import { client, clientConfig } from "lib/client";
import { chapterPageQuery, slugCurrent } from "lib/queries";

import { urlFor } from "lib/client";

import BlockContent from "@sanity/block-content-to-react";

// Components
import Header from "components/Header/Header";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import PageContentSection from "components/PageContentSection/PageContentSection";

const PostgraduateStudyPage = ({ postgraduateStudyData }) => {
  const { title, slug, postGraduateStudentArray, metaDescription } =
    postgraduateStudyData;

  return (
    <>
      <Head>
        <title>{`${title} | Кафедра електричної інженерії ТНТУ`}</title>
        <meta name="description" content={metaDescription} />
      </Head>

      <Header />

      <Breadcrumbs
        chapterTitle="Аспірантура"
        pageTitle={title}
        pageUrl={slug.current}
      />

      <PageContentSection data={postgraduateStudyData} />

      {postGraduateStudentArray && (
        <section id="team" className="team">
          <div className="container" data-aos="fade-up">
            <header className="section-header">
              <p>{title}</p>
            </header>

            <div className="row gy-4">
              {postGraduateStudentArray.map((el) => {
                const { name, body, photo, _key } = el;

                return (
                  <div
                    className="col-lg-6 d-flex align-items-stretch"
                    data-aos="fade-up"
                    data-aos-delay="100"
                    key={_key}
                  >
                    <div className="member news">
                      <div className="position-relative">
                        <Image
                          src={urlFor(photo).url()}
                          className="img-fluid"
                          alt={photo.caption}
                          width={440}
                          height={280}
                        />
                      </div>
                      <div className="member-info news">
                        <h4>{name}</h4>
                        <BlockContent
                          blocks={body}
                          projectId={clientConfig.projectId}
                          dataset={clientConfig.dataset}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default PostgraduateStudyPage;

export async function getStaticPaths() {
  const query = slugCurrent("postgraduate");

  const pages = await client.fetch(query);
  const paths = pages.map((page) => ({
    params: {
      slug: page.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params: { slug } }) {
  const postgraduateStudyData = await client.fetch(
    chapterPageQuery("postgraduate", slug)
  );

  return {
    props: {
      postgraduateStudyData,
    },
  };
}
