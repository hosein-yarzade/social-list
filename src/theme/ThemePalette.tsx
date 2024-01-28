import { PaletteMode } from "@mui/material";
import {amber, blue, grey} from "@mui/material/colors";

const theme = {
    direction: 'rtl',
    palette: {
        primary: amber,
    },
};

export const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === "light"
            ? {
                // palette values for light mode

                primary: blue,
                divider: amber[200],
                view:grey[100],
                innerView:grey[300],
                text: {
                    primary: grey[900],
                    secondary: grey[800],
                    light: grey[700]
                },
            }
            : {
                // palette values for dark mode
                primary: grey,
                divider: grey[700],
                view:'#2a2b33',
                innerView:'#363841',
                background: {
                    default: '#1d1d23',
                    paper: grey[800],
                },
                text: {
                    primary: "#e8e8e8",
                    secondary: grey[500],
                    light: "#f1f1f1",
                },
            }),
    },
});

export default theme;
