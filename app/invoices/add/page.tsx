/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import PageLayout from "@/components/invoices/Layout";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormGroup,
  FormHelperText,
  FormLabel,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Typography from "@mui/material/Typography";
import { ChangeEvent, useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NumericFormat } from "react-number-format";
import {
  schemaAddInvoice,
  type TSchemaAddInvoice,
} from "@/lib/schemas/invoices/add";
import { generateInvoiceNumber } from "@/utils/transform";
import Alert from "@/components/invoices/Alert";

const AddInvoice = () => {
  const [showAlert, setShowAlert] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    resetField,
    setValue,
    formState: { errors },
  } = useForm<TSchemaAddInvoice>({
    resolver: zodResolver(schemaAddInvoice),
  });

  const onSubmit = (data: TSchemaAddInvoice) => {
    const dataInvoice = localStorage.getItem("data-invoice");
    const newData = { id: uuidv4(), ...data };

    if (!dataInvoice) {
      localStorage.setItem("data-invoice", JSON.stringify([newData]));
      setShowAlert(true);
      reset();
      setValue("invoiceNumber", generateInvoiceNumber());
    } else {
      const parseDataInvoice = JSON.parse(dataInvoice);
      localStorage.setItem(
        "data-invoice",
        JSON.stringify([...parseDataInvoice, newData])
      );
      setShowAlert(true);
      reset();
      setValue("invoiceNumber", generateInvoiceNumber());
    }
  };

  return (
    <PageLayout>
      <Typography variant="h6" fontWeight={800}>
        Add Invoice
      </Typography>
      <Card sx={{ mt: 2 }}>
        <Typography
          fontWeight={600}
          fontSize={14}
          component={"div"}
          paddingX={2}
          paddingY={1}
        >
          Invoice Form
        </Typography>
        <Divider />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup
              sx={{
                display: { sm: "flex", md: "grid" },
                gridTemplateColumns: { sm: "1fr 1fr" },
                gap: 2,
              }}
            >
              <FormGroup sx={{ display: "flex", flexDirection: "column" }}>
                <FormLabel
                  htmlFor="name"
                  sx={{ display: "flex", alignItems: "center", mb: 1 }}
                >
                  Name <Box sx={{ color: "red" }}>*</Box>
                </FormLabel>

                <Controller
                  control={control}
                  name="invoiceName"
                  render={({
                    field: { onChange, value, ref },
                    fieldState: { error },
                  }) => (
                    <TextField
                      id="name"
                      type="text"
                      autoComplete="off"
                      {...register("invoiceName")}
                      error={!!error}
                      helperText={error?.message}
                      variant="outlined"
                      placeholder="Enter your invoice name"
                      onChange={onChange}
                    />
                  )}
                />
              </FormGroup>
              <FormGroup sx={{ display: "flex", flexDirection: "column" }}>
                <FormLabel
                  htmlFor="number"
                  sx={{ display: "flex", alignItems: "center", mb: 1 }}
                >
                  Number <Box sx={{ color: "red" }}>*</Box>
                </FormLabel>
                <Controller
                  control={control}
                  name="invoiceNumber"
                  defaultValue={generateInvoiceNumber()}
                  render={({
                    field: { onChange, value, ref },
                    fieldState: { error },
                  }) => (
                    <TextField
                      id="number"
                      variant="outlined"
                      placeholder="Enter your invoice number"
                      {...(register("invoiceNumber") as unknown as any)}
                      error={!!error}
                      helperText={error?.message}
                      onChange={onChange}
                    />
                  )}
                />
              </FormGroup>
            </FormGroup>

            <FormGroup
              sx={{
                mt: 2,
                display: { sm: "flex", md: "grid" },
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
              }}
            >
              <FormGroup sx={{ display: "flex", flexDirection: "column" }}>
                <FormLabel
                  sx={{ display: "flex", alignItems: "center", mb: 1 }}
                >
                  Due Date <Box sx={{ color: "red" }}>*</Box>
                </FormLabel>
                <Controller
                  control={control}
                  name="dueDate"
                  defaultValue=""
                  render={({
                    field: { onChange, value, ref },
                    fieldState: { error },
                  }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        inputRef={ref}
                        slotProps={{
                          textField: {
                            error: !!error,
                            helperText: error?.message,
                          },
                        }}
                        format="YYYY-MM-DD"
                        views={["year", "month", "day"]}
                        value={dayjs(value)}
                        onChange={(e) => {
                          onChange(dayjs(e).format("YYYY-MM-DD"));
                        }}
                      />
                    </LocalizationProvider>
                  )}
                />
              </FormGroup>

              <FormGroup sx={{ display: "flex", flexDirection: "column" }}>
                <FormLabel
                  htmlFor="amount"
                  sx={{ display: "flex", alignItems: "center", mb: 1 }}
                >
                  Amount <Box sx={{ color: "red" }}>*</Box>
                </FormLabel>
                <Controller
                  control={control}
                  name="amount"
                  defaultValue=""
                  render={({
                    field: { onChange, value, ref },
                    fieldState: { error },
                  }) => (
                    <NumericFormat
                      customInput={TextField}
                      thousandSeparator
                      autoComplete="off"
                      valueIsNumericString
                      allowNegative={false}
                      prefix="Rp"
                      variant="outlined"
                      placeholder="Enter your invoice amount"
                      error={!!error}
                      value={!value ? "" : value}
                      inputRef={ref}
                      onChange={(e) => {
                        onChange(
                          e.target.value.replace("Rp", "").replaceAll(",", "")
                        );
                      }}
                    />
                  )}
                />
                {errors.amount && (
                  <FormHelperText sx={{ color: "#d32f2f", mx: "14px" }}>
                    {errors.amount?.message?.toLowerCase() === "required"
                      ? "Amount is required"
                      : errors.amount?.message}
                  </FormHelperText>
                )}
              </FormGroup>
            </FormGroup>

            <FormGroup
              sx={{
                display: { sm: "flex", md: "grid" },
                mt: 2,
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
              }}
            >
              <FormGroup sx={{ display: "flex", flexDirection: "column" }}>
                <FormLabel
                  htmlFor="status"
                  sx={{ display: "flex", alignItems: "center", mb: 1 }}
                >
                  Status <Box sx={{ color: "red" }}>*</Box>
                </FormLabel>
                <Controller
                  control={control}
                  name="status"
                  defaultValue=""
                  render={({
                    field: { onChange, value, ref },
                    fieldState: { error },
                  }) => (
                    <Select
                      id="status"
                      displayEmpty
                      {...(register("status", {
                        required: false,
                      }) as unknown as any)}
                      error={!!error}
                      onChange={onChange}
                      value={value || ""}
                    >
                      <MenuItem value={""} disabled>
                        Choose the status
                      </MenuItem>
                      <MenuItem value={"paid"}>Paid</MenuItem>
                      <MenuItem value={"unpaid"}>Unpaid</MenuItem>
                      <MenuItem value={"pending"}>Pending</MenuItem>
                    </Select>
                  )}
                />
                {errors.status && (
                  <FormHelperText sx={{ color: "#d32f2f", mx: "14px" }}>
                    {errors.status?.message?.toLowerCase() === "required"
                      ? "Status is required"
                      : errors.status?.message}
                  </FormHelperText>
                )}
              </FormGroup>
            </FormGroup>

            <Box sx={{ mt: 4, display: "flex", justifyContent: "end" }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "#3C50E0" }}
              >
                <Add fontSize="small" />
                Add Invoice
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>

      {showAlert && (
        <Alert
          messageTitle="Invoice added successfully!"
          messageDescription="You can view and manage your invoice in the 'My Invoices' section."
          onClose={() => setShowAlert(false)}
        />
      )}
    </PageLayout>
  );
};

export default AddInvoice;
