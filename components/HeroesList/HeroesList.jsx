import HeroItem from "./HeroItem";

function HeroesList({ heroesList }) {
  return (
    <section className="features my-personal">
      <div className="container" data-aos="fade-up">
        {/* <!-- Feature Icons --> */}
        <div className="row feature-icons">
          {heroesList.map((heroPerson) => {
            console.log("heroPerson :>> ", heroPerson);

            const {
              heroName,
              heroSecondAndFatherName,
              heroImage,
              lifeYears,
              secondaryText,
              body,
              heroPublications,
              _key,
            } = heroPerson;

            // ВСТАВИТИ СЮДИ КОМПОНЕНТИ КАРТОК ГЕРОЇВ
            return <HeroItem key={_key} heroPerson={heroPerson} />;
          })}
        </div>
        {/* <!-- End Feature Icons --> */}
      </div>
    </section>
  );
}

export default HeroesList;
