import { useState, useEffect } from "react";
import projectsData from "./assets/data/projects.json";
import "./App.css";

import SearchBar from "./components/SearchBar/SearchBar";
import Grid from "./components/Grid/Grid";
import GoTopBtn from "./components/GoTopBtn/GoTopBtn";
import Banner from "./components/Banner/Banner";

function filterProjects(projectsData, searchQuery, projectOrder, projectTools) {
  // project order
  if (projectOrder === "new-to-old")
    projectsData = projectsData.sort((a, b) => b.id - a.id);
  else if (projectOrder === "old-to-new")
    projectsData = projectsData.sort((a, b) => a.id - b.id);

  // filter based on tools
  if (projectTools.length !== 0) {
    projectsData = projectsData.filter((project) =>
      projectTools.some((tool) => project.tools.includes(tool))
    );
  }

  // filter based on search term
  if (searchQuery === "") return projectsData;
  else
    return projectsData.filter((project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
}

function App() {
  const [activeElement, setActiveElement] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [projectTools, setProjectTools] = useState([]);
  const [projectOrder, setProjectOrder] = useState("new-to-old");

  // add click event on document to blur select element
  useEffect(() => {
    const handleClick = (e) => {
      if (e.target.tagName === "OPTION") {
        // if option is clicked, nullify active element
        setActiveElement(null);
        document.activeElement.blur();
      } else {
        // otherwise reset the active element
        setActiveElement(document.activeElement);
      }
    };
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <Banner />
      <h1>My Frontend Mentor Projects</h1>
      <GoTopBtn />
      <SearchBar
        projectsData={projectsData}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setProjectOrder={setProjectOrder}
        projectTools={projectTools}
        setProjectTools={setProjectTools}
        activeElement={activeElement}
        setActiveElement={setActiveElement}
      />
      <Grid
        projectsData={filterProjects(
          projectsData,
          searchQuery,
          projectOrder,
          projectTools
        )}
      />

      <footer>
        <p>
          Coded &copy; <span>A7hmed Hussien</span> &#64; 2025{" "}
        </p>
      </footer>
    </>
  );
}

export default App;
