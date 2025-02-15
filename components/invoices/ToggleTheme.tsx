import { useTheme } from "@/utils/theme";
import { DarkMode, LightMode } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default function ToggleTheme({
  customStyle,
}: {
  customStyle?: React.CSSProperties;
}) {
  const { isDarkTheme, toggleTheme } = useTheme();
  return (
    <IconButton style={{ ...customStyle }} onClick={toggleTheme}>
      {isDarkTheme ? <LightMode /> : <DarkMode />}
    </IconButton>
  );
}
