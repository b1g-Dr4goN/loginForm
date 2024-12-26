import { useState } from "react";
import Login from "./components/login/Login";
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
          className={`grid min-h-screen bg-center`}
          style={{
            fontFamily: "kanit",
            backgroundImage: "url('./background.jpg')",
          }}
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
