import {useContext} from "react";
import DarkMode from "../context/DarkMode";

export default function useDarkMode() {

    const {theme, setTheme} = useContext(DarkMode);
    const type = theme.palette?.type;
    const newTheme = type === 'light' ?
        ({
            ...theme,
            palette: {
                ...theme.palette,
                secondary: {
                    main: '#ffc400',
                },
                type: 'dark'
            }
        })
        :
        ({
            ...theme,
            palette: {
                ...theme.palette,
                secondary: {
                    main: "#ff9900",
                },
                type: 'light'
            }
        })
    return () => {
        setTheme(newTheme)
    }
};