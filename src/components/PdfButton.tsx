"use client";

import { useState } from 'react';
import { FileDown } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function PdfButton({ data, formattedValue }: any) {
    const [loading, setLoading] = useState(false);

    const generatePDF = async () => {
        setLoading(true);
        try {
            const element = document.getElementById('pdf-content');
            if (!element) {
                alert("PDF olusturulacak alan bulunamadi.");
                return;
            }

            // Temporarily show hidden print-only elements if any
            element.classList.add('pdf-mode');

            // html2canvas execution with high quality
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#F5F5F7",
                windowWidth: 1200
            });

            const imgData = canvas.toDataURL('image/png');

            // Calculate A4 sizes
            const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfPageHeight = pdf.internal.pageSize.getHeight();
            const imgHeight = (canvas.height * pdfWidth) / canvas.width;

            // Multi-page pagination
            if (imgHeight <= pdfPageHeight) {
                // Single page - fits perfectly
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
            } else {
                // Multiple pages needed
                const totalPages = Math.ceil(imgHeight / pdfPageHeight);
                for (let page = 0; page < totalPages; page++) {
                    if (page > 0) pdf.addPage();

                    // Calculate the source rectangle from the canvas
                    const sourceY = page * (canvas.height / totalPages);
                    const sourceH = canvas.height / totalPages;

                    // Create a temporary canvas for this page slice
                    const pageCanvas = document.createElement('canvas');
                    pageCanvas.width = canvas.width;
                    pageCanvas.height = sourceH;
                    const ctx = pageCanvas.getContext('2d');
                    if (ctx) {
                        ctx.drawImage(canvas, 0, sourceY, canvas.width, sourceH, 0, 0, canvas.width, sourceH);
                        const pageImgData = pageCanvas.toDataURL('image/png');
                        pdf.addImage(pageImgData, 'PNG', 0, 0, pdfWidth, pdfPageHeight);
                    }

                    // Add page number footer
                    pdf.setFontSize(8);
                    pdf.setTextColor(150, 150, 150);
                    pdf.text(`Sayfa ${page + 1}/${totalPages} - evindegeri.com`, pdfWidth / 2, pdfPageHeight - 5, { align: 'center' });
                }
            }

            pdf.save(`evinin-degeri-rapor-${Date.now()}.pdf`);

        } catch (error) {
            console.error("PDF Generate Error:", error);
            alert("PDF olusturulurken bir hata meydana geldi.");
        } finally {
            const element = document.getElementById('pdf-content');
            if (element) element.classList.remove('pdf-mode');
            setLoading(false);
        }
    };

    return (
        <button
            onClick={generatePDF}
            disabled={loading}
            className="w-full flex items-center justify-center px-4 py-3 bg-appleBlue text-white rounded-xl font-medium hover:bg-blue-600 transition-all shadow-apple transform hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
        >
            {loading ? (
                <span className="text-sm">Hazirlaniyor...</span>
            ) : (
                <>
                    <FileDown size={18} className="mr-2" /> Degerleme Raporunu Indir
                </>
            )}
        </button>
    );
}
