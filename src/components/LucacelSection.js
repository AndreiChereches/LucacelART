import React from "react";
import "./css/LucacelSection.css";

// Replace with your local image import if you have one
import lucacelImg from "../media/lucacel.png";

export default function LucacelSection() {
  return (
    <section className="lucacel-section" id="lucacel">
      <div className="lucacel-container">
        <div className="lucacel-image">
          <img src={lucacelImg} alt="Flavius Lucăcel" />
        </div>
        <div className="lucacel-text">
          <h2>About the Artist</h2>
          <p>
            <strong>Flavius ​​Lucăcel</strong> (pseudonym of Gheorghe Traian
            Lucăcel) was born on August 26, 1968 in Aluniş, Sălaj County. A
            painter with numerous exhibitions to his credit and also a
            playwright who has acted and published, the Cluj native is a
            versatile figure who is difficult to pin down in a formula.
          </p>
          <p>
            He has published <strong>13 volumes of theatre</strong>, was
            nominated for the <strong>UNITER Award</strong> for the best play of
            the year 2015 (<em>Singurătatea pietrelor</em>), and has won
            numerous awards, including the{" "}
            <strong>Play of the Year Award</strong> conferred by the Bucharest
            Dramaturgs' Club, the <strong>"Radu Stanca" Award</strong> of the
            Cluj Branch of the Romanian Writers' Union, and the{" "}
            <strong>"Negoiţă Irimie" Award</strong> of the same branch.
          </p>
          <p>
            He has presented a series of reading-performances and has numerous
            exhibition projects to his credit.
          </p>
        </div>
      </div>
    </section>
  );
}
