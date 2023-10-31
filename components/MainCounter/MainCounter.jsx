import { useState } from "react";

const customItems = [
  {
    icon: "ri-account-pin-circle-line",
    color: "#bb0852",
  },
  {
    icon: "bi bi-mortarboard-fill",
    color: "#4154f1",
  },
  {
    icon: "bi bi-emoji-smile",
    color: "#15be56",
  },
  {
    icon: "bi bi-journal-richtext",
    color: "#ee6c20",
  },
];

function MainCounter({ data }) {
  // Доповнюю масив з адмінки відсутніми елементами.
  // Напр., іконку та її колір я не описував в адмінці, тому описав їх
  // в змінній customItems
  const newData = data.map(
    (
      { counterItemNumber, counterItemPrimary, counterItemSecondary, _key },
      idx
    ) => {
      return {
        counterIcon: customItems[idx].icon,
        counterColor: customItems[idx].color,
        counterItemPrimary,
        counterItemNumber,
        counterItemSecondary,
        _key,
      };
    }
  );

  const [purecounter, setPurecounter] = useState(0);

  return (
    <section id="counts" className="counts">
      <div className="container" data-aos="fade-up">
        <div className="row gy-4">
          {newData.map((el) => {
            const {
              counterIcon,
              counterColor,
              counterItemPrimary,
              counterItemNumber,
              counterItemSecondary,
              _key,
            } = el;
            return (
              <div className="col-lg-3 col-md-6" key={_key}>
                <div className="count-box">
                  <i
                    className={counterIcon}
                    style={{ color: `${counterColor}` }}
                  ></i>
                  <div>
                    <p>{counterItemPrimary}</p>
                    <span
                      data-purecounter-start="0"
                      data-purecounter-end={counterItemNumber}
                      data-purecounter-duration="1"
                      className="purecounter"
                    >
                      {purecounter}
                    </span>
                    <p>{counterItemSecondary}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default MainCounter;
