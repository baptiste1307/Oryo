type ExportQuotePdfOptions = {
  previewRoot: HTMLElement;
  pageElements: HTMLElement[];
  fileName: string;
};

export async function exportQuotePdf({
  previewRoot,
  pageElements,
  fileName,
}: ExportQuotePdfOptions) {
  const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);

  previewRoot.classList.add("pdf-exporting-all");
  pageElements.forEach((page) => page.classList.add("pdf-preview-exporting"));

  try {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    await new Promise((resolve) => requestAnimationFrame(resolve));

    for (const [index, pageElement] of pageElements.entries()) {
      const canvas = await html2canvas(pageElement, {
        backgroundColor: "#ffffff",
        scale: Math.max(3, window.devicePixelRatio * 2),
        useCORS: true,
        logging: false,
      });
      const imageData = canvas.toDataURL("image/jpeg", 1);

      if (index > 0) pdf.addPage();
      pdf.addImage(imageData, "JPEG", 0, 0, pageWidth, pageHeight);
    }

    pdf.save(fileName);
  } finally {
    previewRoot.classList.remove("pdf-exporting-all");
    pageElements.forEach((page) => page.classList.remove("pdf-preview-exporting"));
  }
}
