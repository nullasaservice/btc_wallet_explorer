import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <ApplicationContexts>
          <AppPages />
        </ApplicationContexts>
      </Box>
    </ThemeProvider>
  );
}

export default App;
