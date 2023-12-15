import GuarantorsItem from "./GuarantorsItem";

function GuarantorsList({ personList }) {
  return (
    <section className="features guaranors">
      <div className="container aos-init aos-animate" data-aos="fade-up">
        {personList.map((el) => {
          const { firstName, secondName } = el;

          return (
            <GuarantorsItem person={el} key={`${firstName} ${secondName}`} />
          );
        })}
      </div>
    </section>
  );
}

export default GuarantorsList;
