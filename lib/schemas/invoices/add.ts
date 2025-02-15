import * as z from "zod";

export const schemaAddInvoice = z.object({
  invoiceName: z.string().nonempty("Invoice name is required"),
  invoiceNumber: z.string().nonempty("Invoice number is required"),
  dueDate: z.string().nonempty("Due date is required"),
  amount: z.string().nonempty("Amount is required"),
  status: z.string().nonempty("Status is required"),
});

export type TSchemaAddInvoice = z.infer<typeof schemaAddInvoice> & {
  id?: string;
};
