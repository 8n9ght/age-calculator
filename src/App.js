/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

function App() {
  const [day, setDay] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();

  const [ageD, setAged] = useState();
  const [ageM, setAgem] = useState();
  const [ageY, setAgey] = useState();

  const [dateError, setDateerror] = useState(false);

  const dateValidator = (year, month, day) => {
    if (year < 0 || month < 1 || month > 12 || day < 1 || day > 31) {
      return false;
    }

    if (day > new Date(year, month, 0).getDate()) {
      return false;
    }

    return true;
  };

  const ageCalculator = () => {
    const birthdayFormat = `${day}/${month}/${year}`;
    const [bDay, bMonth, bYear] = birthdayFormat.split("/").map(Number);

    try{
      if (!dateValidator(bYear, bMonth, bDay)) {
        setDateerror(true);
      } else {
        setDateerror(false);
      }
  
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
  
      setAged(daysDiff);
      setAgem(monthDiff);
      setAgey(yearsDiff);
    } catch(err){
      alert(err)
    }
  };

  const handleChangeDay = (e) => {
    const dayInput = e.target.value;
    setDay(dayInput);
    ageCalculator();
  };

  const handleChangeMonth = (e) => {
    const monthInput = e.target.value;
    setMonth(monthInput);
    ageCalculator();
  };

  const handleChangeYear = (e) => {
    const yearInput = e.target.value;
      setYear(yearInput);
      ageCalculator();
  };

  useEffect(() => {
    if (day !== undefined && month !== undefined && year !== undefined) {
      ageCalculator();
    }
  }, [ageCalculator, day, month, year]);

  return (
    <div className="wrapper">
      <div className="calculator">
        <section className="calculator__form">
          <article className="calculator__form__inputs">
            <label
              htmlFor="inputField"
              className={
                (!/^\d+$/.test(day) && day >= 1 && day <= 31) ||
                day === ""
                  ? "calculator__form__inputs__label"
                  : ""
              }
            >
              DAY
            </label>
            <input
              type="text"
              id="day"
              maxLength={2}
              placeholder="DD"
              onChange={handleChangeDay}
              className={
                (!/^\d+$/.test(day) && day >= 1 && day <= 31) ||
                day === ""
                  ? "calculator__form__inputs--invalid"
                  : ""
              }
            ></input>
            <p className="calculator__form__message">
              {day === ""
                ? "This field is required"
                : (!/^\d+$/.test(day) && day !== undefined) ||
                  day < 1 ||
                  day > 31
                ? "Must be a valid day"
                : dateError
                ? "Must be a valid date"
                : null}
            </p>
          </article>

          <article className="calculator__form__inputs">
            <label
              htmlFor="month"
              className={
                (!/^\d+$/.test(month) && month !== undefined) ||
                month < 0 ||
                month > 12 ||
                month === ""
                  ? "calculator__form__inputs__label"
                  : ""
              }
            >
              MONTH
            </label>
            <input
              type="text"
              id="month"
              maxLength={2}
              placeholder="MM"
              onChange={handleChangeMonth}
              className={
                (!/^\d+$/.test(month) && month !== undefined) ||
                month < 0 ||
                month > 12 ||
                month === ""
                  ? "calculator__form__inputs--invalid"
                  : ""
              }
            ></input>
            <p className="calculator__form__message">
              {month === ""
                ? "This field is required"
                : (!/^\d+$/.test(month) && month !== undefined) ||
                  month < 0 ||
                  month > 12
                ? "Must be a valid month"
                : null}
            </p>
          </article>
          <article className="calculator__form__inputs">
            <label
              htmlFor="year"
              className={
                (!/^\d+$/.test(year) && year !== undefined) ||
                year > new Date().getFullYear() ||
                year === ""
                  ? "calculator__form__inputs__label"
                  : ""
              }
            >
              YEAR
            </label>
            <input
              type="text"
              id="year"
              maxLength={4}
              placeholder="YYYY"
              className={
                (!/^\d+$/.test(year) && year !== undefined) ||
                year > new Date().getFullYear() ||
                year === ""
                  ? "calculator__form__inputs--invalid"
                  : ""
              }
              onChange={handleChangeYear}
            ></input>
            <p className="calculator__form__message">
              {year === ""
                ? "This field is required"
                : (!/^\d+$/.test(year) && year !== undefined) ||
                  year > new Date().getFullYear() 
                ? "Must be in the past"
                : null}
            </p>
          </article>
        </section>
        <section className="calculator__divider">
          <article className="calculator__divider__img">
            <img
              src="./images/icon-arrow.svg"
              className="calculator__divider__img__item"
              alt="divider icon"
            ></img>
          </article>
          <span className="calculator__divider__line"></span>
        </section>
        <section className="calculator__age">
          <article className="calculator__age__item">
            <p className="calculator__age__item--num">
              {ageY >= 0 ? ageY : "--"}
            </p>
            <p className="calculator__age__item--label">years</p>
          </article>
          <article className="calculator__age__item">
            <p className="calculator__age__item--num">
              {ageM >= 0 && ageM <= 12 ? ageM : "--"}
            </p>
            <p className="calculator__age__item--label">months</p>
          </article>
          <article className="calculator__age__item">
            <p className="calculator__age__item--num">
              {ageD >= 0 && ageD <= 31 ? ageD : "--"}
            </p>
            <p className="calculator__age__item--label">days</p>
          </article>
        </section>
      </div>
    </div>
  );
}

export default App;
