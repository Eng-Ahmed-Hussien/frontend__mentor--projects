import styles from "./Banner.module.css";

function Banner() {
  const text =
    "My site for My Frontend Mentor Projects is still in progress...";

  return (
    <div className={styles.bannerContainer}>
      <div className={styles.banner}>
        <div className={styles.text}>{text}</div>
        <div className={styles.text}>{text}</div>
      </div>
    </div>
  );
}

export default Banner;
