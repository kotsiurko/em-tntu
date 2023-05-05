export const Breadcrumbs = ({
  chapterTitle,
  pageTitle,
  pageUrl,
  subPageTitle,
  subPageUrl,
}) => {
  return (
    <section className="breadcrumbs">
      <div className="container">
        <ol>
          <li>
            <a href="default.aspx">Головна</a>
          </li>
          <li>{chapterTitle}</li>
          <li>
            <a href={pageUrl}>{pageTitle}</a>
          </li>
          {subPageTitle && (
            <li>
              <a href={subPageUrl}>{subPageTitle}</a>
            </li>
          )}
        </ol>
        {/* <h2>{subPageTitle ? subPageTitle : pageTitle}</h2> */}
      </div>
    </section>
  );
};
