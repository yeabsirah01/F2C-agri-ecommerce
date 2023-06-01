import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import MainComponent from "./components/MainComponent";
import TawkToWidget from "./components/widget/TawkToWidget";
import ChatBox from "./pages/Dashboard/CustomerSupportDashboard/ChatBox";

function App() {
  const [colorScheme, setColorScheme] = useState("light");
  const userInfo = useSelector((state) => state.user);
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
        {(userInfo.role === "Transporter" ||
          userInfo.role === "CustomerSupport"|| userInfo.role !== "Consumer") && (
          <ChatBox userInfo={userInfo} />
        )}
        <div>
          {(userInfo.role === "Farmer" || userInfo.role === "Consumer") && (
            <TawkToWidget />
          )}
        </div>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
