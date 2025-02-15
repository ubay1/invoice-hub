import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { keyframes } from "@emotion/react";
import { useTheme } from "@/utils/theme";

interface IAlertProps {
  messageTitle?: string;
  messageDescription?: string;
  onClose?: () => void;
  autoCloseDuration?: number; // Durasi auto-close dalam milidetik
}

const slideIn = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(100%);
    opacity: 0;
  }
`;

const Alert: React.FC<IAlertProps> = ({
  messageTitle,
  messageDescription,
  onClose,
  autoCloseDuration = 3000, // Default 3 detik
}) => {
  const { isDarkTheme } = useTheme();

  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (autoCloseDuration) {
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          setIsVisible(false);
          if (onClose) {
            onClose();
          }
        }, 300); // Durasi animasi keluar
      }, autoCloseDuration);

      return () => clearTimeout(timer); // Membersihkan timer saat komponen unmount
    }
  }, [autoCloseDuration, onClose]);

  if (!isVisible) return null; // Tidak menampilkan komponen jika tidak visible

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: isDarkTheme ? "#1E293B" : "#E1F9F0",
        borderLeft: `6px solid ${isDarkTheme ? "#4CAF50" : "#34D399"}`,
        borderRadius: "4px",
        padding: "16px",
        margin: "16px 0",
        animation: `${isExiting ? slideOut : slideIn} 0.3s ease-in-out`,
      }}
    >
      <CheckCircleIcon sx={{ color: "#4caf50", marginRight: "8px" }} />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          {messageTitle}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {messageDescription}
        </Typography>
      </Box>
    </Box>
  );
};

export default Alert;
