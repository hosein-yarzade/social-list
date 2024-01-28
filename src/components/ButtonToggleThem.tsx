import {IconButton} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {useThemeContext} from "../theme/ThemeContextProviderApp";

const ButtonToggleThem = () => {
    const { mode, toggleColorMode } = useThemeContext();

    return (

        <div>
            <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
                {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </div>
    );
};

export default ButtonToggleThem;
