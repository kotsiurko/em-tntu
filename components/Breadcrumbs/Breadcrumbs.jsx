import Link from "next/link";

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
            <Link href="/">Головна</Link>
          </li>
          <li>{chapterTitle}</li>
          {pageUrl && (
            <li>
              <Link href={pageUrl}>{pageTitle}</Link>
            </li>
          )}
          {!pageUrl && <li>{pageTitle}</li>}

          {subPageTitle && (
            <li>
              <Link href={subPageUrl}>{subPageTitle}</Link>
            </li>
          )}
        </ol>
      </div>
    </section>
  );
};
