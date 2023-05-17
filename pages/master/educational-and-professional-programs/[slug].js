import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from "next/image";

// Client connection
import { menuItems } from '@/components/Header/menuItems';
import { client, clientConfig } from "@/lib/client";
import { mainMenuQueriesObjCreator, chapterItemQuery, slugCurrent } from '@/lib/queries';
import { menuCreator, menuItemsMerger } from '@/lib/menuCreator';

import { urlFor } from "../../../lib/client";

import BlockContent from "@sanity/block-content-to-react";

// Components
import Header from '@/components/Header/Header';
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";

// Lightbox
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import moment from "moment";


const BachelorPPPage = ({ bachelorEPPPage, mainMenuQO }) => {

  const [open, setOpen] = useState(false);

  const { title, body, positionNumber, slug, } = masterEPPPage;
  // const name = `${firstName} ${secondName} ${fatherName}`
  // const galleryArray = imageGallery.map(el => { return { src: urlFor(el).url() } })

  const [mainMenuArr, setMainMenuArr] = useState(menuItems);

  useEffect(() => {

    const menuObj = menuItemsMerger(
      menuItems,
      mainMenuQO,
    )

    setMainMenuArr((prevState) => {
      if (prevState) {
        return menuCreator(
          menuObj,
          prevState,
        )
      }
    });
  }, [bachelorEPPPage, mainMenuQO]);

  return (
    <>
      <Head>
        <title>Кафедра електричної інженерії ТНТУ :: {title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <Header mainMenuArr={mainMenuArr} />

      <Breadcrumbs
        chapterTitle="Магістру"
        pageTitle="Освітньо-професійні програми"
        pageUrl={null}
        subPageTitle={title}
        subPageUrl={slug.current}
      />

      {/* < !-- ======= Features Section ======= --> */}
      <section className="features my-personal">
        <div className="container" data-aos="fade-up">

          {/* <!-- Feature Icons --> */}
          <div className="row feature-icons" data-aos="fade-up">

            <div className="row gx-0">

              <h3>{title}</h3>

              <div className="col-xl-12 pt-2 px-2">
                <div className="row align-self-start content text-justify">
                  <div className="icon-box my-dstyle" data-aos="fade-up">

                    <BlockContent
                      blocks={body}
                      projectId={clientConfig.projectId}
                      dataset={clientConfig.dataset}
                    />

                  </div>
                </div>
              </div>

              {/* <div> */}
              {/* <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={galleryArray}
              /> */}
              {/* </div> */}

            </div>

          </div>
          {/* <!-- End Feature Icons --> */}

        </div >
      </section >
      {/* <!--End Features Section-- > */}
    </>
  )
}


export default BachelorPPPage;

export async function getStaticPaths() {
  const pages = await client.fetch(slugCurrent('bachelor'));

  const paths = pages.map((page) => ({
    params: {
      slug: page.slug.current
    }
  }));
  return {
    paths, fallback: 'blocking'
  }
}

export async function getStaticProps({ params: { slug } }) {

  const bachelorEPPPage = await client.fetch(chapterItemQuery('bachelor-epp', `/bachelor/educational-and-professional-programs/${slug}`));
  const mainMenuQO = await mainMenuQueriesObjCreator();

  return {
    props: {
      bachelorEPPPage,
      mainMenuQO,
    }
  }
}