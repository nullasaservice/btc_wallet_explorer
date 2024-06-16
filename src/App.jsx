import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import ApplicationContexts from "./components/contexts/ApplicationContexts";
import AppPages from "./AppPages";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ApplicationContexts>
        <AppPages />
      </ApplicationContexts>
    </ThemeProvider>
  );
}

export default App;
