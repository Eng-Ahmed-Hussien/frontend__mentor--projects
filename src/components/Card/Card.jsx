import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Card.module.css";

function Card({ data }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);
  const handleKeyPress = (e) => {
    if (e.key === "Escape") closePopup();
  };
  const handleClick = (e) => {
    if (e.target.classList.contains(styles.popupOverlay)) closePopup();
  };
  const handleScroll = () => closePopup();

  if (isPopupOpen) {
    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("click", handleClick);
    document.addEventListener("scroll", handleScroll);
  } else {
    document.removeEventListener("keydown", handleKeyPress);
    document.removeEventListener("click", handleClick);
    document.removeEventListener("scroll", handleScroll);
  }
  return (
    <>
      <div className={styles.card}>
        <h2>{data.title}</h2>
        <img
          className={data.centeredImg ? "" : styles.notCenteredImg}
          src={`/screenshots/${data.screenshot}`}
          alt="Project Screenshot"
          onClick={openPopup}
          style={{ cursor: "pointer" }}
        />
        <div className={styles.links}>
          <a href={data.repo} target="_blank" rel="noreferrer">
            Code
          </a>
          <a href={data.url} target="_blank" rel="noreferrer">
            Live Site
          </a>
        </div>
      </div>
      {isPopupOpen && (
        <div className={styles.popupOverlay} onClick={closePopup}>
          <div
            className={styles.popupContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeBtn} onClick={closePopup}>
              &times;
            </button>
            <img
              src={`/screenshots/${data.screenshot}`}
              alt="Popup Screenshot"
            />
          </div>
        </div>
      )}
    </>
  );
}

Card.propTypes = {
  data: PropTypes.object,
};

export default Card;
