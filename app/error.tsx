"use client";

import NextLink from "next/link";
import Image from "next/image";
import { Box, Link, Typography } from "@mui/material";
import { useTheme } from "@/utils/theme";

export default function Error({}: { error: Error & { digest?: string } }) {
  const { isDarkTheme } = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Image
        src="../logo.svg"
        alt="404"
        width={200}
        height={50}
        priority
        style={{
          filter: !isDarkTheme ? "invert(1)" : "none",
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Typography variant="h6">Something went wrong!</Typography>
        <Link component={NextLink} href="/">
          <Typography>Back to home</Typography>
        </Link>
      </Box>
    </Box>
  );
}
