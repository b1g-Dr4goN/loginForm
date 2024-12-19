import { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/management/Dashboard";
import { Toaster } from "react-hot-toast";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "kanit",
  },
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <ThemeProvider theme={theme}>
        <div
          className={`grid min-h-screen bg-[url(/background.jpg)] bg-center`}
          style={{ fontFamily: "kanit" }}
        >
          {isLoggedIn ? (
            <Dashboard />
          ) : (
            <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          )}
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
