import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useState } from "react";
import MainComponent from "./components/MainComponent";

function App() {
  const [colorScheme, setColorScheme] = useState("light");
  const toggleColorScheme = (value) => {
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  };
  // if (!_id) return <>;
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <MainComponent />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
