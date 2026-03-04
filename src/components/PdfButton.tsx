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
                alert("PDF oluşturulacak alan bulunamadı.");
                return;
            }

            // Temporarily show hidden print-only elements if any, or adjust styles
            element.classList.add('pdf-mode');

            // html2canvas execution
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#F5F5F7" // appleGray background
            });

            const imgData = canvas.toDataURL('image/png');

            // Calculate A4 sizes
            const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`evinin-degeri-rapor-${Date.now()}.pdf`);

        } catch (error) {
            console.error("PDF Generate Error:", error);
            alert("PDF oluşturulurken bir hata meydana geldi.");
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
                <span className="text-sm">Hazırlanıyor...</span>
            ) : (
                <>
                    <FileDown size={18} className="mr-2" /> Değerleme Raporunu İndir
                </>
            )}
        </button>
    );
}
