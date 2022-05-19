import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material";
import logo from "../img/logo.png";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                ArtisanHub
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}
const mdTheme = createTheme();

function PricingContent(props) {
    return (
        <ThemeProvider theme={mdTheme}>
            <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{
                    borderBottom: (theme) =>
                        `1px solid ${theme.palette.divider}`,
                }}
            >
                <Toolbar sx={{ flexWrap: "wrap" }}>
                    <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        <img
                            src={logo}
                            width="50"
                            style={{
                                marginBottom: -13,
                                marginRight: 12,
                            }}
                        />
                        ArtisanHub
                    </Typography>
                    <Button
                        href="/login"
                        variant="outlined"
                        sx={{ my: 1, mx: 1.5 }}
                        onClick={() => {
                            window.localStorage.clear();
                        }}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            {/* Hero unit */}
            <Container
                disableGutters
                maxWidth="sm"
                component="main"
                sx={{ pt: 8, pb: 6 }}
            >
                {props.children}
            </Container>
            {/* Footer */}
            <Container
                maxWidth="md"
                component="footer"
                sx={{
                    borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                    mt: 8,
                    py: [3, 6],
                }}
            >
                <Copyright sx={{ mt: 5 }} />
            </Container>
            {/* End footer */}
        </ThemeProvider>
    );
}

export default function Lead(props) {
    return <PricingContent {...props} />;
}
