import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import AppContent from "./components/AppContent";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box display="flex" justifyContent="center" alignItems="center">
        <AppContent />
      </Box>
    </ThemeProvider>
  );
}

export default App;
