import { Toaster } from "react-hot-toast";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RootRoutes from "./routes/Router";

const theme = createTheme({
  typography: {
    fontFamily: "kanit",
  },
});

function App() {
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
          <RootRoutes />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
