import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { unparse } from 'papaparse';

const ExportButtons = () => {
    const [exportType, setExportType] = useState('pdf');

    const handleExport = () => {
        const data = JSON.parse(localStorage.getItem('payoutDetails'));
        switch (exportType) {
            case 'csv':
                exportCSV([data]);
                break;
            case 'pdf':
                exportPDF([data]);
                break;
            case 'sheets':
                alert("Google Sheets export is not directly supported here. Please export as CSV and import into Google Sheets.");
                break;
            default:
                break;
        }
    };

    const exportCSV = (data) => {
        const csv = unparse(data);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "data.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportPDF = (data) => {
        if (!data || !data.length || !Object.keys(data[0]).length) {
            alert("No data available to export");
            return;
        }
    
        const doc = new jsPDF();
        autoTable(doc, {
            head: [Object.keys(data[0])],
            body: data.map(item => Object.values(item)),
            theme: 'grid',
            margin: { top: 10 },
        });
    
        doc.save('data.pdf');
    };

    return (
        <div className="stat flex flex-col p-4 bg-white shadow-inner rounded">
            <h2 className="text-lg font-semibold mb-3">Export Data</h2>
            <div className="flex items-center justify-between">
                <select 
                    className="stat select select-bordered mr-2"
                    value={exportType}
                    onChange={(e) => setExportType(e.target.value)}
                >
                    <option value="pdf">PDF</option>
                    <option value="csv">CSV</option>
                    <option value="sheets">Google Sheets</option>
                </select>
                <button onClick={handleExport} className="btn btn-primary mx-1 px-2 py-1 rounded text-white bg-blue-500 hover:bg-blue-700">
                    Export
                </button>
            </div>
        </div>
    );
};

export default ExportButtons;
