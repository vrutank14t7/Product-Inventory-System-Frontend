import React, { useEffect } from "react";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useSelector } from "react-redux";
import Routes from "../routes/index";
import NavigationScroll from "./NavigationScroll";
import theme from "../themes";

const App = () => {
  const customization = useSelector((state) => state.customization);

  useEffect(() => {
    const handleWheel = (event) => {
      if (document.activeElement.type === "number") {
        event.preventDefault();
      }
    };

    const handleKeyDown = (event) => {
      if (
        document.activeElement.type === "number" &&
        (event.key === "ArrowUp" || event.key === "ArrowDown")
      ) {
        event.preventDefault();
      }
    };

    // Add global event listeners
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {
        <NavigationScroll>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme(customization)}>
              <CssBaseline />
              <Routes />
            </ThemeProvider>
          </StyledEngineProvider>
        </NavigationScroll>
      }
    </>
  );
};

export default App;
