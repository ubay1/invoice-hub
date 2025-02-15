/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import PageLayout from "@/components/invoices/Layout";
// import { Card } from "@mui/material";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TSchemaAddInvoice } from "@/lib/schemas/invoices/add";
import dayjs from "dayjs";
import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Menu as MenuIcon, SearchOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Alert from "@/components/invoices/Alert";

const InvoiceList = () => {
  const searchParams = useSearchParams();
  const querySearchParam = searchParams.get("q");
  const queryStatusParam = searchParams.get("s");

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState("");

  const [invoices, setInvoices] = useState([] as TSchemaAddInvoice[]);
  const [showAlert, setShowAlert] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeleteInvoice = (id: string) => {
    const newInvoices = invoices.filter((invoice) => invoice.id !== id);
    setInvoices(newInvoices);
    localStorage.setItem("data-invoice", JSON.stringify(newInvoices));
    setShowAlert(true);
  };

  useEffect(() => {
    // Update URL dengan query parameter
    let queryParam = searchQuery
      ? `?q=${encodeURIComponent(searchQuery)}`
      : "?q=";

    if (status) {
      queryParam += `&s=${encodeURIComponent(status)}`;
    } else {
      queryParam += `&s=`;
    }

    window.history.pushState({}, "", `${queryParam}`);
  }, [searchQuery, status]);

  useEffect(() => {
    const data = localStorage.getItem("data-invoice");
    if (data) {
      const parseData = JSON.parse(data);
      const formattedData = parseData.map((item: TSchemaAddInvoice) => ({
        id: item.id,
        invoiceName: item.invoiceName,
        invoiceNumber: item.invoiceNumber,
        dueDate: dayjs(item.dueDate).format("MMM DD,YYYY"),
        status: item.status,
        amount: item.amount,
      }));

      setInvoices(formattedData);
    }

    setLoading(false);

    if (querySearchParam) {
      setSearchQuery(querySearchParam);
    }
    if (
      queryStatusParam &&
      ["paid", "unpaid", "pending"].includes(queryStatusParam)
    ) {
      setStatus(queryStatusParam);
    }
  }, []);

  const bgColorStatus = (status: string) => {
    const color = {
      paid: "#21965314",
      unpaid: "#D3405314",
      pending: "#FFA70B14",
    };
    return color[status as keyof typeof color];
  };
  const textColorStatus = (status: string) => {
    const color = {
      paid: "#219653",
      unpaid: "#D34053",
      pending: "#FFA70B",
    };
    return color[status as keyof typeof color];
  };

  return (
    <PageLayout customStyles={{ overflowX: "auto" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "start", md: "center" },
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" fontWeight={800}>
          My Invoice
        </Typography>

        <Box
          sx={{
            marginTop: { xs: 2, md: 0 },
            display: { xs: "grid", md: "flex" },
            gridTemplateColumns: { xs: "1fr 1fr" },
            gap: 2,
          }}
        >
          <TextField
            id="search"
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlined />
                  </InputAdornment>
                ),
              },
            }}
            variant="outlined"
            value={searchQuery}
            onChange={(e) => {
              // console.log(e.target.value);
              setSearchQuery(e.target.value);
            }}
          />
          <Select
            id="status"
            fullWidth
            displayEmpty
            value={status || ""}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value={""}>All Status</MenuItem>
            <MenuItem value={"paid"}>Paid</MenuItem>
            <MenuItem value={"unpaid"}>Unpaid</MenuItem>
            <MenuItem value={"pending"}>Pending</MenuItem>
          </Select>
        </Box>
      </Box>
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Invoice</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  colSpan={5}
                  sx={{ textAlign: "center" }}
                >
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}
            {!loading && invoices.length === 0 && (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  colSpan={5}
                  sx={{ textAlign: "center" }}
                >
                  <Typography variant="body1">No data found</Typography>
                </TableCell>
              </TableRow>
            )}
            {!loading &&
              invoices.length > 0 &&
              invoices
                .filter(
                  (row) =>
                    (searchQuery === "" ||
                      row.invoiceName.includes(searchQuery)) &&
                    (status === "" || row.status === status)
                )
                .map((row) => (
                  <TableRow
                    key={row.invoiceName}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Box>{row.invoiceName}</Box>
                      <Box fontSize={12}>{row.invoiceNumber}</Box>
                    </TableCell>
                    <TableCell>{row.dueDate}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          bgcolor: bgColorStatus(row.status),
                          color: textColorStatus(row.status),
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          paddingY: 1,
                          borderRadius: 4,
                          textTransform: "capitalize",
                        }}
                      >
                        {row.status}
                      </Box>
                    </TableCell>
                    <TableCell>
                      Rp{" "}
                      {new Intl.NumberFormat("id-ID").format(
                        Number(row.amount)
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                      >
                        <MenuIcon />
                      </IconButton>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem
                          onClick={() => handleDeleteInvoice(row.id as string)}
                        >
                          Delete
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>

      {showAlert && (
        <Alert
          messageTitle="Invoice deleted successfully!"
          messageDescription="Data that has been deleted cannot be restored."
          onClose={() => setShowAlert(false)}
        />
      )}
    </PageLayout>
  );
};

export default InvoiceList;
