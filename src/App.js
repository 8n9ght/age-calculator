/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

function App() {
  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  
  const [ageD, setAged] = useState();
  const [ageM, setAgem] = useState();
  const [ageY, setAgey] = useState();

  console.log(day, month, year)

  const ageCalculator = () => {
    const birthdayFormat = `${day}/${month}/${year}`;
    const [bDay, bMonth, bYear] = birthdayFormat.split("/").map(Number);

    const birthday = new Date(`${bYear}-${bMonth}-${bDay}`);
    console.log(bDay, ' jour')
    console.log(bMonth, ' mois')
    console.log(bYear, ' année')
    console.log(birthday)
    const today = new Date();

    let yearsDiff = today.getFullYear() - birthday.getFullYear();
    let monthDiff = today.getMonth() - birthday.getMonth();
    let daysDiff = today.getDate() - birthday.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && daysDiff < 0)) {
      yearsDiff--;
      monthDiff += 12;
    }

    if (daysDiff < 0) {
      const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      daysDiff += Math.floor((today - prevMonth) / (1000 * 60 * 60 * 24));
    }

    setAged(daysDiff)
    setAgem(monthDiff)
    setAgey(yearsDiff)

  };

  const handleChangeDay = (e) => {
    setDay(e.target.value);
  };

  const handleChangeMonth = (e) => {
    setMonth(e.target.value);
  };

  const handleChangeYear = (e) => {
    setYear(e.target.value);
  };

  useEffect(() => {
    ageCalculator()
  }, [day, month, year])

  return (
    <div className="wrapper">
      <div className="calculator">
        <section className="calculator__form">
          <article className="calculator__form__inputs">
            <label for="day">Day</label>
            <input
              type="text"
              id="day"
              maxLength={2}
              onChange={handleChangeDay}
            ></input>
            <p className="calculator__form__message"></p>
          </article>
          <article className="calculator__form__inputs">
            <label for="month">Month</label>
            <input
              type="text"
              id="month"
              maxLength={2}
              onChange={handleChangeMonth}
            ></input>
            <p className="calculator__form__message"></p>
          </article>
          <article className="calculator__form__inputs">
            <label for="year">Year</label>
            <input
              type="text"
              id="year"
              onChange={handleChangeYear}
              maxLength={4}
            ></input>
            <p className="calculator__form__message"></p>
          </article>
        </section>
        <section className="calculator__divider">
          <img
            src="./images/icon-arrow.svg"
            className="calculator__divider__img"
            alt="divider icon"
          ></img>
          <span className="calculator__divider__line"></span>
        </section>
        <section className="calculator__age">
          <article className="calculator__age__item">
            <p className="calculator__age__item--num">{ageY}</p>
            <p className="calculator__age__item--label">years</p>
          </article>
          <article className="calculator__age__item">
            <p className="calculator__age__item--num">{ageM}</p>
            <p className="calculator__age__item--label">months</p>
          </article>
          <article className="calculator__age__item">
            <p className="calculator__age__item--num">{ageD}</p>
            <p className="calculator__age__item--label">days</p>
          </article>
        </section>
      </div>
    </div>
  );
}

export default App;
