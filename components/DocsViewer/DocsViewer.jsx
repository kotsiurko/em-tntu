import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const DocsViewer = ({ docURL }) => {
  console.log("docURL :>> ", docURL);
  const docs = [
    {
      uri: docURL,
      fileType: "docx",
      filename: "Demo.docx",
    },
  ];

  return (
    <div style={{ height: 800, margin: "0 auto" }} className="container">
      <DocViewer
        documents={docs}
        pluginRenderers={DocViewerRenderers}
        config={{ header: { disableHeader: true } }}
      />
    </div>
  );
};

export default DocsViewer;
