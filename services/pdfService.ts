
declare const jspdf: any;
declare const html2canvas: any;

export const downloadProjectAsPDF = async (elementId: string, projectName: string) => {
  const { jsPDF } = jspdf;
  const input = document.getElementById(elementId);
  if (!input) {
    const errorMsg = 'Element not found for PDF generation';
    console.error(errorMsg);
    alert('Error al generar el PDF: No se pudo encontrar el contenido del proyecto.');
    throw new Error(errorMsg);
  }

  try {
    const canvas = await html2canvas(input, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false, 
    });
    
    const imgData = canvas.toDataURL('image/png');
    
    // PDF dimensions (A4 size)
    const pdfWidth = 210;
    const pdfHeight = 297;
    
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    
    const ratio = imgWidth / imgHeight;
    
    let docWidth = pdfWidth;
    let docHeight = docWidth / ratio;
    
    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
    });

    let heightLeft = docHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, docWidth, docHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position -= pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, docWidth, docHeight);
      heightLeft -= pdfHeight;
    }

    const safeFileName = projectName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    pdf.save(`${safeFileName}_project.pdf`);

  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Ocurrió un error al generar el PDF. Por favor, revise la consola para más detalles.');
    throw error;
  }
};
