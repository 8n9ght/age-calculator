/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

function App() {
  const [day, setDay] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  
  const [ageD, setAged] = useState();
  const [ageM, setAgem] = useState();
  const [ageY, setAgey] = useState();

  const ageCalculator = () => {
    const birthdayFormat = `${day}/${month}/${year}`;
    const [bDay, bMonth, bYear] = birthdayFormat.split("/").map(Number);

    const birthday = new Date(`${bYear}-${bMonth}-${bDay}`);
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
    const dayInput = e.target.value
    setDay(dayInput);
  };

  const handleChangeMonth = (e) => {
    const monthInput = e.target.value
    setMonth(monthInput);
  };

  const handleChangeYear = (e) => {
    const yearInput = e.target.value
    if (yearInput.length >= 3) {
      setYear(yearInput);
    }
  };

  useEffect(() => {
    if (day !== undefined && month !== undefined && year !== undefined) {
      ageCalculator();
    }
  }, [day, month, year])

  return (
    <div className="wrapper">
      <div className="calculator">
        <section className="calculator__form">
          <article className="calculator__form__inputs">
          <label htmlFor="inputField" className={!(/^\d+$/.test(day) && day >= 1 && day <= 31) || day === undefined ? 'calculator__form__inputs__label' : ''}>Day</label>
            <input
              type="text"
              id="day"
              maxLength={2}
              placeholder="DD"
              onChange={handleChangeDay}
              className={!(/^\d+$/.test(day) && day >= 1 && day <= 31) || day === undefined ? 'calculator__form__inputs--invalid' : ''}
            ></input>
            <p className="calculator__form__message">
              {(!/^\d+$/.test(day) && day !== undefined) || day < 1 || day > 31 ? 'Must be a valid day' : null}
            </p>
          </article>
          <article className="calculator__form__inputs">
            <label htmlFor="month" className={(!/^\d+$/.test(month) && month !== undefined) || month < 0 || month > 12 ? 'calculator__form__inputs__label' : ''}>Month</label>
            <input
              type="text"
              id="month"
              maxLength={2}
              placeholder="MM"
              onChange={handleChangeMonth}
              className={(!/^\d+$/.test(month) && month !== undefined) || month < 0 || month > 12 ? 'calculator__form__inputs--invalid' : ''}
            ></input>
            <p className="calculator__form__message">
              {(!/^\d+$/.test(month) && month !== undefined) || month < 0 || month > 12 ? 'Must be a valid month' : null }
            </p>
          </article>
          <article className="calculator__form__inputs">
            <label htmlFor="year" className={(!/^\d+$/.test(year) && year !== undefined) || year >  new Date().getFullYear() ? 'calculator__form__inputs__label' : ''}>Year</label>
            <input
              type="text"
              id="year"
              maxLength={4}
              placeholder="YYYY"
              className={(!/^\d+$/.test(year) && year !== undefined) || year >  new Date().getFullYear() ? 'calculator__form__inputs--invalid' : ''}
              onChange={handleChangeYear}
            ></input>
            <p className="calculator__form__message">
              {(!/^\d+$/.test(year) && year !== undefined) || year >  new Date().getFullYear() ? 'Must be in the past' : null}
            </p>
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
            <p className="calculator__age__item--num">{ageY >= 0 ? ageY : '--'}</p>
            <p className="calculator__age__item--label">years</p>
          </article>
          <article className="calculator__age__item">
            <p className="calculator__age__item--num">{ageM >= 0 && ageM <= 12 ? ageM : '--' }</p>
            <p className="calculator__age__item--label">months</p>
          </article>
          <article className="calculator__age__item">
            <p className="calculator__age__item--num">{ageD >= 0 && ageD <= 31 ? ageD : '--'}</p>
            <p className="calculator__age__item--label">days</p>
          </article>
        </section>
      </div>
    </div>
  );
}

export default App;
