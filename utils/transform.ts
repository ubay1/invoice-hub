import dayjs from "dayjs";

export function generateInvoiceNumber() {
  const datePart = dayjs().unix();

  // Mendapatkan nomor acak antara 10 dan 999
  const randomPart = Math.floor(10 + Math.random() * 999);

  // Menggabungkan semua bagian untuk membentuk nomor faktur unik
  const invoiceNumber = `INV-${datePart}-${randomPart}`;

  return invoiceNumber;
}
