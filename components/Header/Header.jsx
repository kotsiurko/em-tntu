import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// Images
import headerLogo from "../../public/assets/img/logo-header-new.png";
import ukrFlag from "../../public/images/flag_ukr.png";
import Link from "next/link";

const Header = (props) => {
  const { asPath } = useRouter();

  const { mainMenuArr } = props;

  const [headerStyles, setHeaderStyles] = useState("header fixed-top");

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isMobileMenuLIOpen, setIsMobileMenuLIOpen] = useState(false);
  const [mobileMenuLIOpenIndex, setMobileMenuLIOpenIndex] = useState(null);

  const [isMobileMenuSubLIOpen, setIsMobileMenuSubLIOpen] = useState(false);
  const [mobileMenuSubItemIndex, setMobileMenuSubItemIndex] = useState(null);

  function toggleMobileMenu() {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    } else {
      setIsMobileMenuOpen(true);
      setIsMobileMenuLIOpen(false);
      setIsMobileMenuSubLIOpen(false);
    }
  }

  function toggleMobileMenuItem(event, index) {
    if (
      event.target.nodeName !== "A" &&
      event.target.nodeName !== "I" &&
      event.target.nodeName !== "SPAN"
    )
      return;
    if (isMobileMenuLIOpen && mobileMenuLIOpenIndex === index) {
      setIsMobileMenuLIOpen(false);
      setMobileMenuLIOpenIndex(null);
    } else {
      setIsMobileMenuLIOpen(true);
      setMobileMenuLIOpenIndex(index);
    }
  }

  function toggleMobileMenuSUBItem(event, index) {
    if (
      event.target.nodeName !== "A" &&
      event.target.nodeName !== "I" &&
      event.target.nodeName !== "SPAN"
    )
      return;
    if (isMobileMenuSubLIOpen && mobileMenuSubItemIndex === index) {
      setIsMobileMenuSubLIOpen(false);
      setMobileMenuSubItemIndex(null);
    } else {
      setIsMobileMenuSubLIOpen(true);
      setMobileMenuSubItemIndex(index);
    }
    // ЗУПИНИВ ВСПЛИТТЯ ПОДІЇ, ЩОБ НЕ ЗАКРИВАЛАСЬ БАТЬКІВСЬКА LI
    event.stopPropagation();
  }

  // ---------------------------------------------------

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY; // => scroll position
      if (scrollPosition > 50) {
        setHeaderStyles("header fixed-top header-scrolled");
      } else {
        setHeaderStyles("header fixed-top");
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headerStyles]);

  return (
    <>
      <header id="header" className={headerStyles}>
        <div className="container-fluid container-xl">
          {/* NEED TO FIX ON PRODUCTION */}
          <div className="d-flex justify-content-between">
            <Link href="/" className="logo d-flex align-items-center">
              <Image
                src={headerLogo}
                alt="Абревіатура кафедри Електричної інженерії"
              />
              &nbsp;|&nbsp;
              <div>ЕЛЕКТРИЧНА ІНЖЕНЕРІЯ</div>
            </Link>
            <HeroesButton cls={`ukr-heros`} />
          </div>

          {/* МЕНЮ ДИНАМІЧНО ПІДСТАВЛЯЄТЬСЯ ІЗ МАСИВУ ОБ'ЄКТІВ menuItems */}
          <nav
            id="navbar"
            className={isMobileMenuOpen ? "navbar navbar-mobile" : "navbar"}
          >
            <ul>
              {mainMenuArr.map(({ id, title, url, children }) => {
                return (
                  <li
                    className={children.length > 0 ? "dropdown" : null}
                    onClick={(event) => toggleMobileMenuItem(event, id)}
                    key={id}
                    data-id={id}
                  >
                    <Link
                      href="#"
                      className={asPath.includes(url) ? "active" : ""}
                    >
                      {children.length > 0 ? (
                        <>
                          <span>{title}</span>
                          <i className="bi bi-chevron-down"></i>
                        </>
                      ) : (
                        <>{title}</>
                      )}
                    </Link>
                    {/* ==================================================================== */}
                    {/* ТУТ ВСТАВЛЯЄТЬСЯ УМОВА ДЛЯ ПІДМЕНЮ */}
                    {/* ДРУГИЙ РІВЕНЬ */}
                    {/* UL */}
                    {children.length > 0 ? (
                      <ul
                        className={
                          isMobileMenuLIOpen && mobileMenuLIOpenIndex === id
                            ? "dropdown-active"
                            : null
                        }
                      >
                        {children.map(({ title, url, children, id }) => {
                          return (
                            <li
                              className={
                                children?.length > 0 ? "dropdown" : null
                              }
                              onClick={(evt) =>
                                toggleMobileMenuSUBItem(evt, id)
                              }
                              key={title}
                              data-id={id}
                            >
                              <Link
                                href={url}
                                target={url.startsWith("http") ? "_blank" : ""}
                                className={asPath === url ? "active" : ""}
                              >
                                {children ? (
                                  <>
                                    <span>{title}</span>
                                    <i className="bi bi-chevron-right"></i>
                                  </>
                                ) : (
                                  <>{title}</>
                                )}
                              </Link>
                              {children?.length > 0 ? (
                                <ul
                                  className={
                                    isMobileMenuSubLIOpen &&
                                    mobileMenuSubItemIndex === id
                                      ? "dropdown-active"
                                      : null
                                  }
                                >
                                  {children.map((el) => {
                                    return (
                                      <li key={el.id}>
                                        <Link
                                          href={el.url}
                                          className={
                                            asPath === el.url ? "active" : ""
                                          }
                                        >
                                          {el.title}
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              ) : null}
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}

                    {/* UL ENDS */}
                    {/* ==================================================================== */}
                  </li>
                );
              })}
              <HeroesButton cls={`ukr-heros-mobile`} />
            </ul>
            <i
              className={
                isMobileMenuOpen
                  ? "bi mobile-nav-toggle bi-x"
                  : "bi mobile-nav-toggle bi-list"
              }
              onClick={toggleMobileMenu}
            ></i>
          </nav>
          {/* .navbar */}
        </div>
      </header>
    </>
  );
};

export default Header;

const HeroesButton = ({ cls }) => {
  return (
    <Link href="/other/heroes" className={cls}>
      <Image
        src={ukrFlag}
        alt="Ukrainian flag"
        width={32}
        height={22}
        className="flag"
      />
      <span>Герої не вмирають!</span>
    </Link>
  );
};
