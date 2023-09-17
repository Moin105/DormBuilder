import React from "react";
import Header from "../Header/Header";
import Footer from "../utils/Footer/Footer";
import "./assets/study.css";
function Study() {
  return (
    <section className="study">
      <Header />
      <div>
        <section className="heros">
          <h2>Education in North Cyprus</h2>
        </section>
        <h2>Cost of Education in North Cyprus</h2>
        <ul>
          <li>
            Approx. cost of pursuing a <b>Bachelor Degree in North Cyprus </b>is
            anywhere between<b> $3,000-$15,000 per annum </b>(Depends on the
            Department)
          </li>
          <li>
            Approx. cost of pursuing a <b>Master’s Degree in North Cyprus</b> is
            anywhere between <b>$5,000-6,500 per annum</b>
          </li>
          <li>
            <b> Doctoral degrees(PHD)</b> on an average range from
            <b> $7,500 to 10,000 per annum</b>
          </li>
        </ul>
      </div>
      <div>
        <h2>Living Expense</h2>
        <p>
          {" "}
          The approx. living expense, On an average
          <b> on campus Private accommodation </b>costs approx.
          <b> $5000 (Single Room) $2,500 (Double Room)</b>
          per annum &<b> Public Costs less by 30-40%.</b>
        </p>
      </div>
      <div>
        <h2>Language of Instruction</h2>
        <p>
          North Cyprus is a land of international students, with more than 120
          nationalities coming from around the world. While the majority of the
          population speaks <b> English</b>, and it is the primary language of
          instruction, the official and main language of North Cyprus is 
          <b> Turkish</b>.
        </p>
      </div>

      <Footer />
    </section>
  );
}

export default Study;
