"use client";

import { useState } from 'react';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function SamplePdfButton() {
    const [loading, setLoading] = useState(false);

    const generatePDF = async () => {
        setLoading(true);
        try {
            const element = document.getElementById('sample-report-content');
            if (!element) {
                alert("Rapor alanı bulunamadı.");
                return;
            }

            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff"
            });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const imgHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
            pdf.save('evinin-degeri-ornek-rapor.pdf');
        } catch (error) {
            console.error("PDF Oluşturma Hatası:", error);
            alert("PDF oluşturulurken bir hata meydana geldi.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={generatePDF}
            disabled={loading}
            className="px-6 py-3 bg-appleDark text-white font-bold rounded-xl hover:bg-appleBlue transition-colors shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
            <Download size={18} /> {loading ? "İndiriliyor..." : "Örnek PDF İndir"}
        </button>
    );
}
