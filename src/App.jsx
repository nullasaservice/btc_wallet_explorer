import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import AppContent from "./components/AppContent";
import ApplicationContexts from "./components/contexts/ApplicationContexts";

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
          <AppContent />
        </ApplicationContexts>
      </Box>
    </ThemeProvider>
  );
}

export default App;
