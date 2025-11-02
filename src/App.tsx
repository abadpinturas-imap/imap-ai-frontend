import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, AppBar, Toolbar, Typography } from "@mui/material";
import DashboardPage from "./pages/DashboardPage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // azul Corporativo MUI
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar>
          <Typography variant="h6" fontWeight={600}>
            IMAP-AI Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <DashboardPage />
    </ThemeProvider>
  );
}
