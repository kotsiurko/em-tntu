import DocViewer, {
  DocViewerRenderers,
  PDFRenderer,
} from "@cyntler/react-doc-viewer";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import ComingSoon from "../../public/assets/img/coming-soon.png";
import Image from "next/image";

const DocsViewer = ({ docURL }) => {
  let fileFormat = "";
  if (docURL?.endsWith("docx")) {
    fileFormat = "docx";
  } else if (docURL?.endsWith("doc")) {
    fileFormat = "doc";
  } else {
    fileFormat = "pdf";
  }

  const docs = [
    {
      uri: docURL,
      fileType: fileFormat,
    },
  ];

  return (
    <>
      {docURL && (
        <div
          style={{
            height: 800,
            margin: "0 auto 40px",
            outline: "2px solid #01297099",
            borderRadius: "5px",
          }}
          className="container"
        >
          <DocViewer
            documents={docs}
            pluginRenderers={DocViewerRenderers}
            config={{
              header: { disableHeader: true },
            }}
          />
        </div>
      )}
      {!docURL && (
        <Image
          src={ComingSoon}
          alt="Контент скоро появиться"
          className="img-fluid"
        />
      )}
    </>
  );
};

export default DocsViewer;
