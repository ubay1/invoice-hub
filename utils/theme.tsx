/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { createTheme, ThemeProvider as MUIThemeProvider } from "@mui/material";

interface ThemeContextType {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDarkTheme: false,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  function isLocalStorageEmpty(): boolean {
    return !localStorage.getItem("isDarkTheme");
  }

  function initialThemeHandler(): void {
    const isDarkTheme: boolean = JSON.parse(
      localStorage.getItem("isDarkTheme")!
    );
    isDarkTheme && document!.querySelector("body")!.classList.add("dark");
    setIsDarkTheme(() => {
      return isDarkTheme;
    });
  }

  useEffect(() => initialThemeHandler(), []);

  function toggleDarkClassToBody(): void {
    document!.querySelector("body")!.classList.toggle("dark");
  }

  function setValueToLocalStorage(): void {
    localStorage.setItem("isDarkTheme", `${!isDarkTheme}`);
  }

  const toggleTheme = () => {
    const isDarkTheme: boolean = JSON.parse(
      localStorage.getItem("isDarkTheme")!
    );
    setIsDarkTheme(!isDarkTheme);
    toggleDarkClassToBody();
    setValueToLocalStorage();
  };

  const theme = createTheme({
    palette: {
      mode: isDarkTheme ? "dark" : "light",
      primary: {
        main: "#3C50E0",
      },
      secondary: {
        main: "#3C50E0",
      },
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            height: 40,
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            top: -7,
          },
        },
      },
      MuiInputAdornment: {
        styleOverrides: {
          root: {},
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    </ThemeContext.Provider>
  );
};
