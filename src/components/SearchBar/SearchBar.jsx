import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import styles from "./SearchBar.module.css";

function SearchBar({
  projectsData,
  searchQuery,
  setSearchQuery,
  setProjectOrder,
  activeElement,
  setActiveElement,
}) {
  const savedTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(savedTheme);

  const themes = {
    dark: {
      "--txt-color": "rgba(255, 255, 255, 0.87)",
      "--bg-color": "#242424",
      "--light-primary": "#747bff",
      "--primary": "#646cff",
      "--dark-primary": "#535bf2",
      "--link-bg": "#1a1a1a",
    },
    light: {
      "--txt-color": "rgba(0, 0, 0, 0.87)",
      "--bg-color": "#ffffff",
      "--light-primary": "#9fa8da",
      "--primary": "#3f51b5",
      "--dark-primary": "#303f9f",
      "--link-bg": "#e0e0e0",
    },
    blue: {
      "--txt-color": "#fff",
      "--bg-color": "#001f3f",
      "--light-primary": "#0074D9",
      "--primary": "#005fa3",
      "--dark-primary": "#004080",
      "--link-bg": "#003366",
    },
  };

  useEffect(() => {
    const root = document.documentElement;
    const themeVariables = themes[theme];
    for (let key in themeVariables) {
      root.style.setProperty(key, themeVariables[key]);
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <form className={styles.form}>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) =>
            setSearchQuery(e.target.value.trimStart().replace("  ", " "))
          }
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            setSearchQuery("");
          }}
        >
          Clear
        </button>
      </div>
      <div className={styles.filterAndSorting}>
        <select
          name="theme"
          id="theme-filter"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="blue">Blue</option>
        </select>

        <select
          name="project-order"
          id="project-order"
          onChange={(e) => {
            setProjectOrder(e.target.value);
            e.target.blur();
          }}
          onClick={(e) => {
            if (activeElement === e.target) {
              activeElement.blur();
              setActiveElement(null);
            }
          }}
          defaultValue=""
        >
          <option value="new-to-old">Newest to Oldest</option>
          <option value="old-to-new">Oldest to Newest</option>
        </select>
      </div>
    </form>
  );
}

SearchBar.propTypes = {
  projectsData: PropTypes.array,
  searchQuery: PropTypes.string,
  setSearchQuery: PropTypes.func,
  setProjectOrder: PropTypes.func,
  activeElement: PropTypes.object,
  setActiveElement: PropTypes.func,
};

export default SearchBar;
