// Client connection
import { client, clientConfig } from "../../lib/client";

import Image from "next/image";
import { urlFor } from "../../lib/client";

import BlockContent from "@sanity/block-content-to-react";

// Lightbox
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";


const PersonInfo = ({ about }) => {

  const [open, setOpen] = useState(false);

  // console.log(person);

  const { title, body, position, slug, } = about;
  // const name = `${firstName} ${secondName} ${fatherName}`
  // const galleryArray = imageGallery.map(el => { return { src: urlFor(el).url() } })

  return (
    <>
      <Breadcrumbs
        chapterTitle="Про кафедру"
        pageTitle={title}
        pageUrl={"/about/" + slug.current}
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


export default PersonInfo;

export async function getStaticPaths() {
  const query = `*[type=='about']{
slug{
  current
}
  }`;
  const pages = await client.fetch(query);
  const paths = pages.map((about) => ({
    params: {
      slug: about.slug.current
    }
  }));
  return {
    paths, fallback: 'blocking'
  }
}

export async function getStaticProps({ params: { slug } }) {
  const query = `*[_type=='about' && slug.current == '${slug}'][0]`;

  const about = await client.fetch(query);

  return {
    props: {
      about
    }
  }
}