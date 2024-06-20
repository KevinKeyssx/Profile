import html2canvas from 'html2canvas';
import {jsPDF} from 'jspdf';
import React from 'react';


// eslint-disable-next-line react-memo/require-memo
const PDFGenerator: React.FC = () => {
  const generatePDF = async () => {
    // eslint-disable-next-line no-undef
    const element = document.body;

    // Configuración de html2canvas
    const canvas = await html2canvas(element, {
      scale: 2, // Aumenta la escala para mejorar la resolución
      useCORS: true, // Para permitir la captura de imágenes desde otros orígenes
      scrollX: 0,
      scrollY: 0,
      backgroundColor: null, // Asegura que no se agregue un fondo blanco
      logging: true, // Activa el registro para depuración
      // async: true, // Usa el modo asíncrono para captura
      width: element.scrollWidth, // Ancho total de la página
      height: element.scrollHeight // Altura total de la página
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait', // Orientación del documento
      unit: 'px', // Unidad de medida
      format: [canvas.width, canvas.height] // Formato del documento basado en el tamaño de la página capturada
    });

    // Agrega la imagen capturada al PDF
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);

    // Descarga el documento PDF
    pdf.save('document.pdf');
  };

  return (
    <button
      className="mt-4 p-2 bg-blue-500 text-white rounded"
      onClick={generatePDF}
    >
      Generar PDF
    </button>
  );
};

export default PDFGenerator;
