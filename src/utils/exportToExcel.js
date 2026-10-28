import * as XLSX from "xlsx";

const exportToExcel = (data, fileName = "export.xlsx", sheetName = "Sheet1") => {
    if (!Array.isArray(data) || !data.length) return;

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    XLSX.writeFile(
        workbook,
        fileName.endsWith(".xlsx") ? fileName : `${fileName}.xlsx`
    );
};

export default exportToExcel;