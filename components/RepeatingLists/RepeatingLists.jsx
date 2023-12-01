const RepeatingLists = ({ listTitle }) => {
  return (
    <ul className="listGap">
      {listTitle
        ?.reduce((acc, el, index) => {
          if (index > 0 && listTitle[index - 1].place === el.place) {
            acc[acc.length - 1].push(el);
          } else {
            acc.push([el]);
          }
          // console.log(acc);
          return acc;
        }, [])
        .map((group, groupIndex) => (
          <li key={groupIndex}>
            <p>
              <strong>{group[0].place}</strong>
            </p>
            <ul className="listGap">
              {group.map((el) => (
                <li key={el._key}>
                  <p>{el.description}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
    </ul>
  );
};

export default RepeatingLists;
