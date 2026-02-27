import React, { useState, useRef } from 'react';
import { Search, Plus, User, ArrowRight, FileDown, FileText, Printer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// PDF and Excel packages
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

// Dummy patient database for demonstration
const DUMMY_PATIENTS = [
  {
    id: 'PT001',
    fullName: 'Ram Bahadur',
    phone: '9810001234',
    age: 31,
    gender: 'Male',
    doctor: 'Dr. Ramesh Shrestha',
    address: 'Kathmandu',
    treatment: 'Root Canal',
  },
  {
    id: 'PT002',
    fullName: 'Sita Kumari',
    phone: '9822005555',
    age: 28,
    gender: 'Female',
    doctor: 'Dr. Anita Khadka',
    address: 'Bhaktapur',
    treatment: 'Tooth Filling',
  },
  {
    id: 'PT003',
    fullName: 'Hari Prasad',
    phone: '9808009999',
    age: 45,
    gender: 'Male',
    doctor: 'Dr. Suresh Sharma',
    address: 'Lalitpur',
    treatment: 'Extraction',
  }
];

const paymentOptions = [
  { value: 'cash', label: 'Cash' },
  { value: 'online', label: 'Online' },
  { value: 'credit', label: 'Credit' },
];

type BillingRecord = {
  patientId: string,
  patientName: string,
  age: number | string,
  address: string,
  phone: string,
  treatment: string,
  doctor: string,
  totalAmount: string,
  paymentOption: string,
  paidAmount: string,
  dueAmount: string,
  expenses: string,
}

// Dummy billing records, aligned with your dummy patients:
const DUMMY_BILLING_RECORDS: BillingRecord[] = [
  {
    patientId: 'PT001',
    patientName: 'Ram Bahadur',
    age: 31,
    address: 'Kathmandu',
    phone: '9810001234',
    treatment: 'Root Canal',
    doctor: 'Dr. Ramesh Shrestha',
    totalAmount: '2500',
    paymentOption: 'cash',
    paidAmount: '2000',
    dueAmount: '500',
    expenses: '200',
  },
  {
    patientId: 'PT002',
    patientName: 'Sita Kumari',
    age: 28,
    address: 'Bhaktapur',
    phone: '9822005555',
    treatment: 'Tooth Filling',
    doctor: 'Dr. Anita Khadka',
    totalAmount: '4000',
    paymentOption: 'online',
    paidAmount: '4000',
    dueAmount: '0',
    expenses: '300',
  },
  {
    patientId: 'PT003',
    patientName: 'Hari Prasad',
    age: 45,
    address: 'Lalitpur',
    phone: '9808009999',
    treatment: 'Extraction',
    doctor: 'Dr. Suresh Sharma',
    totalAmount: '3200',
    paymentOption: 'credit',
    paidAmount: '1200',
    dueAmount: '2000',
    expenses: '100',
  }
];

const Billing = () => {
  const [search, setSearch] = useState('');
  const [filteredPatients, setFilteredPatients] = useState<typeof DUMMY_PATIENTS>([]);
  const [selectedPatient, setSelectedPatient] = useState<typeof DUMMY_PATIENTS[number] | null>(null);

  // Billing form states
  const [totalAmount, setTotalAmount] = useState('');
  const [paymentOption, setPaymentOption] = useState('cash');
  const [paidAmount, setPaidAmount] = useState('');
  const [dueAmount, setDueAmount] = useState('');
  const [expenses, setExpenses] = useState('');

  // Billing record storage
  // Pre-load with dummy billing records so the table shows data by default
  const [billingRecords, setBillingRecords] = useState<BillingRecord[]>([...DUMMY_BILLING_RECORDS]);

  const printTableRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    if (!e.target.value) {
      setFilteredPatients([]);
      return;
    }

    const searchValue = e.target.value.toLowerCase();
    setFilteredPatients(
      DUMMY_PATIENTS.filter(
        (patient) =>
          patient.fullName.toLowerCase().includes(searchValue) ||
          patient.phone.includes(searchValue) ||
          patient.id.toLowerCase().includes(searchValue)
      )
    );
  };

  const handlePatientSelect = (patient: typeof DUMMY_PATIENTS[number]) => {
    setSelectedPatient(patient);
    setSearch('');
    setFilteredPatients([]);
  };

  const handleRegisterNew = () => {
    navigate('/admin/patients/new-patient');
  };

  const handleSaveBilling = () => {
    if (!selectedPatient || !totalAmount) return;

    const newRecord: BillingRecord = {
      patientId: selectedPatient.id,
      patientName: selectedPatient.fullName,
      age: selectedPatient.age,
      address: selectedPatient.address || '',
      phone: selectedPatient.phone,
      treatment: selectedPatient.treatment || '',
      doctor: selectedPatient.doctor || '--',
      totalAmount,
      paymentOption,
      paidAmount,
      dueAmount,
      expenses,
    };
    setBillingRecords(prev => [...prev, newRecord]);

    // Optional: reset form after saving
    setTotalAmount('');
    setPaymentOption('cash');
    setPaidAmount('');
    setDueAmount('');
    setExpenses('');
    setSelectedPatient(null);
  };

  // Excel Export Helper
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(billingRecords);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "BillingRecords");
    XLSX.writeFile(wb, "billing_records.xlsx");
  };

  // Helpers for totals --------------------------
  const getTotals = () => {
    let totalAmount = 0;
    let counter = 0;
    let online = 0;
    let expenses = 0;

    for (let record of billingRecords) {
      totalAmount += Number(record.totalAmount) || 0;
      if (record.paymentOption === "cash") {
        counter += Number(record.paidAmount) || 0;
      }
      if (record.paymentOption === "online") {
        online += Number(record.paidAmount) || 0;
      }
      expenses += Number(record.expenses) || 0;
    }

    return { totalAmount, counter, online, expenses };
  };
  // ---------------------------------------------

  // PDF generator
  const exportToPDF = () => {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 20;

    // Header
    doc.setFontSize(18);
    doc.setFont(undefined, "bold");
    const headerText = "Pristine Dental & Maxillofacial Center Pvt.Ltd.";
    const headerWidth = doc.getTextWidth(headerText);

    // Draw header at the top center with underline
    doc.text(headerText, (pageWidth - headerWidth)/2, y);
    doc.setLineWidth(0.7);
    doc.line(
      (pageWidth - headerWidth)/2, y+2,
      (pageWidth + headerWidth)/2, y+2
    );

    y += 10;
    doc.setFontSize(15);
    doc.setFont(undefined, "normal");
    doc.text("Daily OPD BOOK", pageWidth/2, y, { align: 'center' });

    // Date and Month (top-right)
    const now = new Date();
    const dateStr = `Date: ${now.getDate().toString().padStart(2,'0')}/${(now.getMonth()+1).toString().padStart(2,'0')}/${now.getFullYear()}`;
    const monthStr = `Month: ${(now.getMonth()+1).toString().padStart(2,'0')}`;
    doc.setFontSize(11);
    doc.text(dateStr, pageWidth - 20, 17, { align: 'right' });
    doc.text(monthStr, pageWidth - 20, 23, { align: 'right' });

    y += 7;

    // Table
    const tableColumn = [
      "Reg. No",
      "Name",
      "Age",
      "Address",
      "Phone No.",
      "Treatment",
      "Doctor",
      "Total",
      "Payment Option",
      "Paid",
      "Due",
      "Expenses"
    ];
    const tableRows = billingRecords.map(r => [
      r.patientId,
      r.patientName,
      r.age,
      r.address,
      r.phone,
      r.treatment,
      r.doctor,
      r.totalAmount,
      r.paymentOption,
      r.paidAmount,
      r.dueAmount,
      r.expenses
    ]);

    // Totals
    const totals = getTotals();
    const totalRow = [
      { content: 'Total Amount:', colSpan: 7, styles: { fontStyle: 'bold', textColor: [0,0,160] } },
      totals.totalAmount.toLocaleString(),
      "",
      totals.counter.toLocaleString(),
      totals.online.toLocaleString(),
      totals.expenses.toLocaleString()
    ];

    // @ts-ignore-next-line
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: y + 5,
      theme: 'grid',
      didDrawPage: (data) => {
        // Add after the table (summary)
        autoTable(doc, {
          body: [totalRow],
          startY: data.cursor.y + 2,
          theme: 'plain',
          styles: { fontStyle: 'bold', halign: 'right' },
          columnStyles: {
            0: { halign: 'right' },
            7: { halign: 'right' },
            9: { halign: 'right' },
            10: { halign: 'right' },
            11: { halign: 'right' }
          }
        });
      }
    });
    doc.save('billing_records.pdf');
  };

  // Print preview for billing records table
  const handlePrint = () => {
    if (!printTableRef.current) return;
    const printContents = printTableRef.current.innerHTML;
    const totals = getTotals();

    // Header HTML for print
    const now = new Date();
    const dateStr = `Date: ${now.getDate().toString().padStart(2,'0')}/${(now.getMonth()+1).toString().padStart(2,'0')}/${now.getFullYear()}`;
    const monthStr = `Month: ${(now.getMonth()+1).toString().padStart(2,'0')}`;
    const printHeaderHTML = `
      <div style="text-align: center; margin-bottom:3px;">
        <div style="font-weight: bold; font-size: 23px; text-decoration: underline;">
          Pristine Dental & Maxillofacial Center Pvt.Ltd.
        </div>
        <div style="font-size: 17px; font-weight: 600; margin-top:3px;text-decoration: underline; margin-bottom:1px;">Daily OPD BOOK</div>
      </div>sav
      <div style="text-align: right; font-size: 13px; margin-bottom: 2px; font-weight: 600;">
        ${dateStr} <br/>
        ${monthStr}
      </div>
    `;

    // Add totals row HTML
    const totalsRowHTML = `
      <tr style="font-weight:bold; background:#dbeafe;">
        <td colspan="7" style="text-align:right; color:#1d3b64;">Total Amount:</td>
        <td style="text-align:right;">${totals.totalAmount.toLocaleString()}</td>
        <td></td>
        <td style="text-align:right;">${totals.counter.toLocaleString()}</td>
        <td style="text-align:right;">${totals.online.toLocaleString()}</td>
        <td style="text-align:right;">${totals.expenses.toLocaleString()}</td>
      </tr>
    `;

    // Insert totals row at bottom of table before </table>
    const updatedPrintContents = printContents.replace(
      /(<\/tbody>\s*)<\/table>/i,
      `${totalsRowHTML}</tbody></table>`
    );

    const style = `
      <style>
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 8px 12px; border: 1px solid #b3b3b3; font-size: 13px; }
        th { background: #e5e7eb; }
        h2 { margin-bottom: 24px; }
        body { font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; color: #1f2937; }
      </style>
    `;
    const win = window.open('', '_blank', 'width=900,height=700');
    if (win) {
      win.document.write(`<html><head><title>Print Billing Records</title>${style}</head><body>`);
      win.document.write(printHeaderHTML);
      win.document.write(updatedPrintContents);
      win.document.write('</body></html>');
      win.document.close();
      win.focus();
      setTimeout(() => {
        win.print();
        // Optional: Uncomment if you want window auto-close after print
        // win.close();
      }, 300);
    }
  };

  return (
    <div className="px-8 py-2 max-w-[1100px] mx-auto space-y-10 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl admin-title">Create New Bill</h1>
        <p className="text-admin-text-muted mt-1 font-medium">
          Search the patient to generate billing records.
        </p>
      </div>

      {/* Search patient section */}
      <div className="admin-card p-8">
        <div className="flex items-end flex-col md:flex-row md:items-center gap-4 justify-between">
          <div className="w-full md:w-[400px] relative">
            <label className="admin-label block mb-1.5">Search Patient</label>
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Enter Patient Name, Phone, or ID"
                className="admin-input pl-10"
              />
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-admin-text-faint" />
              {/* Search Results */}
              {search && filteredPatients.length > 0 && (
                <ul className="absolute left-0 right-0 mt-2 bg-white border border-admin-border rounded shadow-lg z-10">
                  {filteredPatients.map((patient) => (
                    <li
                      key={patient.id}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 cursor-pointer transition"
                      onClick={() => handlePatientSelect(patient)}
                    >
                      <User size={15} className="text-blue-500" />
                      <span className="font-medium">{patient.fullName}</span>
                      <span className="text-xs text-admin-text-muted ml-auto">{patient.id}</span>
                      <ArrowRight size={14} />
                    </li>
                  ))}
                </ul>
              )}
              {/* No patient found */}
              {search && filteredPatients.length === 0 && (
                <div className="absolute left-0 right-0 mt-2 py-3 px-4 bg-white border border-admin-border rounded text-admin-text-muted z-10 text-center text-sm">
                  No patient found
                </div>
              )}
            </div>
          </div>
          <button
            className="flex gap-2 items-center admin-button-primary font-bold px-5 py-3 rounded-xl"
            onClick={handleRegisterNew}
          >
            <Plus size={15} />
            Register New Patient
          </button>
        </div>
        {/* Selected patient chip */}
        {selectedPatient && (
          <div className="mt-6 flex items-center gap-5 bg-blue-50 border border-blue-100 rounded-lg p-4">
            <User size={32} className="text-blue-600" />
            <div>
              <div className="font-bold text-lg text-blue-900">{selectedPatient.fullName} <span className="text-xs font-normal text-blue-500 ml-2">({selectedPatient.id})</span></div>
              <div className="text-admin-text-muted text-sm">
                {selectedPatient.phone} &#8226; Age: {selectedPatient.age} &#8226; {selectedPatient.gender}
              </div>
              <div className="text-admin-text-muted text-sm">
                Address: <span className="font-semibold">{selectedPatient.address}</span> &#8226; Treatment: <span className="font-semibold">{selectedPatient.treatment}</span>
              </div>
              <div className="text-admin-text-muted text-sm">
                Doctor: <span className="font-semibold">{selectedPatient.doctor}</span>
              </div>
            </div>
            <button
              className="ml-auto px-3 py-1.5 admin-button-secondary font-bold rounded-xl"
              onClick={() => setSelectedPatient(null)}
            >
              Remove
            </button>
          </div>
        )}
      </div>

      {/* Billing & Payment Form */}
      <div className="admin-card p-8">
        <div>
          <div className="admin-section-header mb-6">Billing & Payment</div>
          <form
            className="grid grid-cols-1 md:grid-cols-5 gap-5 items-end"
            onSubmit={e => { e.preventDefault(); handleSaveBilling(); }}
          >
            <div className="w-full">
              <label className="admin-label mb-1.5 block">Total Amount</label>
              <input
                type="number"
                value={totalAmount}
                onChange={e => setTotalAmount(e.target.value)}
                placeholder="Enter total"
                className="admin-input"
                min="0"
                required
              />
            </div>
            <div className="w-full">
              <label className="admin-label mb-1.5 block">Payment Option</label>
              <select
                value={paymentOption}
                onChange={e => setPaymentOption(e.target.value)}
                className="admin-input cursor-pointer"
                required
              >
                {paymentOptions.map(opt => (
                  <option value={opt.value} key={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <label className="admin-label mb-1.5 block">Paid Amount</label>
              <input
                type="number"
                value={paidAmount}
                onChange={e => setPaidAmount(e.target.value)}
                placeholder="Paid amount"
                className="admin-input"
                min="0"
              />
            </div>
            <div className="w-full">
              <label className="admin-label mb-1.5 block">Due Amount</label>
              <input
                type="number"
                value={dueAmount}
                onChange={e => setDueAmount(e.target.value)}
                placeholder="Due amount"
                className="admin-input"
                min="0"
              />
            </div>
            <div className="w-full">
              <label className="admin-label mb-1.5 block">Expenses</label>
              <input
                type="number"
                value={expenses}
                onChange={e => setExpenses(e.target.value)}
                placeholder="Expenses"
                className="admin-input"
                min="0"
              />
            </div>
            {/* Save Button In-Form for Enter */}
            <div className="w-full md:col-span-5 flex justify-end mt-4">
              <button
                type="submit"
                className="admin-button-primary flex gap-3 items-center font-bold px-8 py-3 text-sm rounded-xl"
                disabled={!selectedPatient || !totalAmount}
              >
                <Plus size={17} />
                Save Billing
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Table of all billing/payments */}
      <div className="admin-card p-8 mt-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between mb-6">
          <div className="admin-section-header">All Billing Records</div>
          <div className="flex gap-2 flex-wrap">
            <button
              className="admin-button-secondary flex gap-2 items-center px-5 py-2 rounded-xl font-medium"
              onClick={exportToExcel}
              type="button"
              disabled={billingRecords.length === 0}
              title="Export as Excel"
            >
              <FileDown size={16} />
              Download Excel
            </button>
            <button
              className="admin-button-secondary flex gap-2 items-center px-5 py-2 rounded-xl font-medium"
              onClick={exportToPDF}
              type="button"
              disabled={billingRecords.length === 0}
              title="Export as PDF"
            >
              <FileText size={16} />
              Download PDF
            </button>
            <button
              className="admin-button-secondary flex gap-2 items-center px-5 py-2 rounded-xl font-medium"
              onClick={handlePrint}
              type="button"
              disabled={billingRecords.length === 0}
              title="Print Table"
            >
              <Printer size={16} />
              Print
            </button>
          </div>
        </div>
        <div ref={printTableRef} className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border border-admin-border">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-2 px-3 border-b border-admin-border font-bold">Reg. No</th>
                <th className="py-2 px-3 border-b border-admin-border font-bold">Name</th>
                <th className="py-2 px-3 border-b border-admin-border font-bold">Age</th>
                <th className="py-2 px-3 border-b border-admin-border font-bold">Address</th>
                <th className="py-2 px-3 border-b border-admin-border font-bold">Phone No.</th>
                <th className="py-2 px-3 border-b border-admin-border font-bold">Treatment</th>
                <th className="py-2 px-3 border-b border-admin-border font-bold">Doctor</th>
                <th className="py-2 px-3 border-b border-admin-border font-bold">Total</th>
                <th className="py-2 px-3 border-b border-admin-border font-bold">Payment Option</th>
                <th className="py-2 px-3 border-b border-admin-border font-bold">Paid</th>
                <th className="py-2 px-3 border-b border-admin-border font-bold">Due</th>
                <th className="py-2 px-3 border-b border-admin-border font-bold">Expenses</th>
              </tr>
            </thead>
            <tbody>
              {billingRecords.length === 0 ? (
                <tr>
                  <td colSpan={12} className="text-center py-6 text-admin-text-muted">
                    No billing records available.
                  </td>
                </tr>
              ) : (
                billingRecords.map((record, idx) => (
                  <tr key={idx} className="hover:bg-blue-50 transition">
                    <td className="py-1.5 px-3 border-b border-admin-border">{record.patientId}</td>
                    <td className="py-1.5 px-3 border-b border-admin-border">{record.patientName}</td>
                    <td className="py-1.5 px-3 border-b border-admin-border">{record.age}</td>
                    <td className="py-1.5 px-3 border-b border-admin-border">{record.address}</td>
                    <td className="py-1.5 px-3 border-b border-admin-border">{record.phone}</td>
                    <td className="py-1.5 px-3 border-b border-admin-border">{record.treatment}</td>
                    <td className="py-1.5 px-3 border-b border-admin-border">{record.doctor}</td>
                    <td className="py-1.5 px-3 border-b border-admin-border">{record.totalAmount}</td>
                    <td className="py-1.5 px-3 border-b border-admin-border">{record.paymentOption}</td>
                    <td className="py-1.5 px-3 border-b border-admin-border">{record.paidAmount}</td>
                    <td className="py-1.5 px-3 border-b border-admin-border">{record.dueAmount}</td>
                    <td className="py-1.5 px-3 border-b border-admin-border">{record.expenses}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Billing;