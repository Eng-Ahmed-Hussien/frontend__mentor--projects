import PropTypes from "prop-types";

import Card from "../Card/Card";

import styles from "./Grid.module.css";

function Grid({ projectsData }) {
  return projectsData.length !== 0 ? (
    <div className={styles.grid}>
      {projectsData.map((card) => (
        <Card key={card.id} data={card} />
      ))}
    </div>
  ) : (
    <p>No Results</p>
  );
}
Grid.propTypes = {
  projectsData: PropTypes.array,
};

export default Grid;
