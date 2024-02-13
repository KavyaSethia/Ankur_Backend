import React from "react";
import "./B_Section2.css";
import img1 from "../../../Images/blog/puzzle.jpg";
import img2 from "../../../Images/blog/snakeladder.jpg";


const B_Section2 = () => {
  return (
    <>
      <div className="B_section2_mainContainer">
        <div className="B_section2_gridContainer">
            {/* CARD 1 */}
          <div className="B_section2_gridDiv">
            <img className="B_section2_gridDivImg" src={img1} alt="" />
            <p className="B_section2_headText">
              <a href="/login">Puzzle</a>
            </p>
          </div>
          {/* CARD 2 */}
          <div className="B_section2_gridDiv">
            <img className="B_section2_gridDivImg" src={img2} alt="" />
            <p className="B_section2_headText">
              <a href="/login">Snake & Ladders</a>
            </p>
          </div> 
        </div>
      </div>
    </>
  );
};

export default B_Section2;
