import React, { useState, useRef } from 'react';
import { Search, Plus, User, ArrowRight, FileDown, FileText, Printer, Eye, Trash2, Pencil, ChevronDown, Calendar, Phone, MapPin, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { usePatientStore } from '../../../store/patientStore';
import type { PatientPayload } from '../../../types';
import { useDoctorStore } from '../../../store/doctorStore';

const paymentOptions = [
  { value: 'CASH', label: 'Cash' },
  { value: 'ONLINE', label: 'Online' },
  { value: 'CREDIT', label: 'Credit' },
];

// Filter only patients with at least one billing field non-zero
const filterNonZeroBilling = (patients: PatientPayload[]) =>
  patients.filter((record) =>
    Number(record.totalAmount) > 0 ||
    Number(record.paidAmount) > 0 ||
    Number(record.dueAmount) > 0 ||
    Number(record.expenseAmount) > 0
  );

const Billing = () => {
  const { patients, updatePatient } = usePatientStore();
  const { doctors } = useDoctorStore()

  const [search, setSearch] = useState('');
  const [filteredPatients, setFilteredPatients] = useState<PatientPayload[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<PatientPayload | null>(null);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState('CASH');
  const [paidAmount, setPaidAmount] = useState<number>(0);
  const [dueAmount, setDueAmount] = useState<number>(0);
  const [expenseAmount, setExpenseAmount] = useState<number>(0);

  // Modals for actions
  const [editModalPatient, setEditModalPatient] = useState<boolean>(false);
  const [editPatientDetails, setEditPatientDetails] = useState<PatientPayload | null>(null);
  const [viewModalPatient, setViewModalPatient] = useState<PatientPayload | null>(null);
  // const [deleteModalPatientId, setDeleteModalPatientId] = useState<string | null>(null);

  const printTableRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  // Search patients
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    if (!e.target.value) {
      setFilteredPatients([]);
      return;
    }
    const searchValue = e.target.value.toLowerCase();
    setFilteredPatients(
      patients?.filter(
        (patient) =>
          patient?.patientName?.toLowerCase().includes(searchValue) ||
          patient?.phoneNo?.includes(searchValue) ||
          patient?.id?.toLowerCase().includes(searchValue)
      )
    );
  };

  const handlePatientSelect = (patient: PatientPayload) => {
    setSelectedPatient(patient);
    setSearch('');
    setFilteredPatients([]);
  };

  const handleRegisterNew = () => {
    navigate('/admin/patients/new-patient');
  };

  const handleSaveBilling = () => {
    if (!selectedPatient || !totalAmount) return;
    const newRecord: PatientPayload = {
      ...selectedPatient,
      address: selectedPatient.address || '',
      treatment: selectedPatient.treatment || '',
      doctorId: selectedPatient?.doctorId || '--',
      totalAmount,
      paymentMethod,
      paidAmount,
      dueAmount,
      expenseAmount,
    };
    if (selectedPatient.id) {
      updatePatient(selectedPatient.id, newRecord);
    }
    setTotalAmount(0);
    setPaymentMethod('CASH');
    setPaidAmount(0);
    setDueAmount(0);
    setExpenseAmount(0);
    setSelectedPatient(null);
  };

  // Export non-zero billing to excel
  const exportToExcel = () => {
    const filtered = filterNonZeroBilling(patients);
    const ws = XLSX.utils.json_to_sheet(filtered);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "BillingRecords");
    XLSX.writeFile(wb, "billing_records.xlsx");
  };


  // Totals: for reporting/exports
  const getTotals = () => {
    let totalAmount = 0;
    let counter = 0;
    let online = 0;
    let expenses = 0;

    const filtered = filterNonZeroBilling(patients);

    for (let record of filtered) {
      totalAmount += Number(record.totalAmount) || 0;
      if (record.paymentMethod === "CASH") {
        counter += Number(record.paidAmount) || 0;
      }
      if (record.paymentMethod === "ONLINE") {
        online += Number(record.paidAmount) || 0;
      }
      expenses += Number(record.expenseAmount) || 0;
    }

    return { totalAmount, counter, online, expenses };
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 20;

    doc.setFontSize(18);
    doc.setFont(undefined, "bold");
    const headerText = "Pristine Dental & Maxillofacial Center Pvt.Ltd.";
    const headerWidth = doc.getTextWidth(headerText);
    doc.text(headerText, (pageWidth - headerWidth) / 2, y);
    doc.setLineWidth(0.7);
    doc.line(
      (pageWidth - headerWidth) / 2, y + 2,
      (pageWidth + headerWidth) / 2, y + 2
    );
    y += 10;
    doc.setFontSize(15);
    doc.setFont(undefined, "normal");
    doc.text("Daily OPD BOOK", pageWidth / 2, y, { align: 'center' });
    // Date and Month (top-right)
    const now = new Date();
    const dateStr = `Date: ${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;
    const monthStr = `Month: ${(now.getMonth() + 1).toString().padStart(2, '0')}`;
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
    const filtered = filterNonZeroBilling(patients);
    const tableRows = filtered.map(r => [
      r.id,
      r.patientName,
      r.age,
      r.address,
      r.phoneNo,
      r.treatment,
      r.doctorId,
      r.totalAmount,
      r.paymentMethod,
      r.paidAmount,
      r.dueAmount,
      r.expenseAmount
    ]);

    const totals = getTotals();
    const totalRow = [
      { content: 'Total Amount:', colSpan: 7, styles: { fontStyle: 'bold', textColor: [0, 0, 160] } },
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

  // Print Handler
  const handlePrint = () => {
    if (!printTableRef.current) return;
    const printContents = printTableRef.current.innerHTML;
    const totals = getTotals();

    // Header HTML
    const now = new Date();
    const dateStr = `Date: ${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;
    const monthStr = `Month: ${(now.getMonth() + 1).toString().padStart(2, '0')}`;
    const printHeaderHTML = `
      <div style="text-align: center; margin-bottom:3px;">
        <div style="font-weight: bold; font-size: 23px; text-decoration: underline;">
          Pristine Dental & Maxillofacial Center Pvt.Ltd.
        </div>
        <div style="font-size: 17px; font-weight: 600; margin-top:3px;text-decoration: underline; margin-bottom:1px;">Daily OPD BOOK</div>
      </div>
      <div style="text-align: right; font-size: 13px; margin-bottom: 2px; font-weight: 600;">
        ${dateStr} <br/>
        ${monthStr}
      </div>
    `;
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

    // Insert totals before </table>
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
        // win.close();
      }, 300);
    }
  };

  // Actions – view, edit, delete

  // --- VIEW ---
  const handleViewPatient = (patient: PatientPayload) => {
    setViewModalPatient(patient);
  };

  // --- EDIT ---
  const openEditModal = (patient: PatientPayload) => {
    setEditPatientDetails(patient)
    setEditModalPatient(true);
  };

  const handleEdit = () => {
    setEditModalPatient(false);
    // You should implement an updatePatient function similar to updateDoctor, passing the updated patient data.
    if (editPatientDetails?.id) {
      // Ensure numeric billing fields are cast to numbers before sending to the API
      const updatedDetails = {
        ...editPatientDetails,
        totalAmount: Number(editPatientDetails.totalAmount ?? 0),
        paidAmount: Number(editPatientDetails.paidAmount ?? 0),
        dueAmount: Number(editPatientDetails.dueAmount ?? 0),
        expenseAmount: Number(editPatientDetails.expenseAmount ?? 0),
      };
      updatePatient(editPatientDetails.id, updatedDetails);
      console.log("after api");
    }
  };

  const filteredBillingRecords = filterNonZeroBilling(patients);

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
              {search && filteredPatients.length > 0 && (
                <ul className="absolute left-0 right-0 mt-2 bg-white border border-admin-border rounded shadow-lg z-10">
                  {filteredPatients.map((patient) => (
                    <li
                      key={patient.id}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 cursor-pointer transition"
                      onClick={() => handlePatientSelect(patient)}
                    >
                      <User size={15} className="text-blue-500" />
                      <span className="font-medium">{patient.patientName}</span>
                      <span className="text-xs text-admin-text-muted ml-auto">{patient.id}</span>
                      <ArrowRight size={14} />
                    </li>
                  ))}
                </ul>
              )}
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
              <div className="font-bold text-lg text-blue-900">
                {selectedPatient.patientName}
                <span className="text-xs font-normal text-blue-500 ml-2">({selectedPatient.id})</span>
              </div>
              <div className="text-admin-text-muted text-sm">
                {selectedPatient.phoneNo} &#8226; Age: {selectedPatient.age} &#8226; {selectedPatient.caseType}
              </div>
              <div className="text-admin-text-muted text-sm">
                Address: <span className="font-semibold">{selectedPatient.address}</span> &#8226; Treatment: <span className="font-semibold">{selectedPatient.treatment}</span>
              </div>
              <div className="text-admin-text-muted text-sm">
                Doctor: <span className="font-semibold">{selectedPatient.doctor?.fullName}</span>
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
                onChange={e => setTotalAmount(Number(e.target.value))}
                placeholder="Enter total"
                className="admin-input"
                min="0"
                required
              />
            </div>
            <div className="w-full">
              <label className="admin-label mb-1.5 block">Payment Option</label>
              <select
                value={paymentMethod}
                onChange={e => setPaymentMethod(e.target.value)}
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
                onChange={e => setPaidAmount(Number(e.target.value))}
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
                onChange={e => setDueAmount(Number(e.target.value))}
                placeholder="Due amount"
                className="admin-input"
                min="0"
              />
            </div>
            <div className="w-full">
              <label className="admin-label mb-1.5 block">Expenses</label>
              <input
                type="number"
                value={expenseAmount}
                onChange={e => setExpenseAmount(Number(e.target.value))}
                placeholder="Expenses"
                className="admin-input"
                min="0"
              />
            </div>
            {/* Save Button In-Form for Enter */}
            <div className="w-full md:col-span-5 flex justify-end mt-4">
              <button
                type="submit"
                className={`admin-button-primary flex gap-3 items-center font-bold px-8 py-3 text-sm rounded-xl ${(!selectedPatient || !totalAmount) ? 'bg-gray-500 cursor-not-allowed' : ''}`}
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
              disabled={filteredBillingRecords.length === 0}
              title="Export as Excel"
            >
              <FileDown size={16} />
              Download Excel
            </button>
            <button
              className="admin-button-secondary flex gap-2 items-center px-5 py-2 rounded-xl font-medium"
              onClick={exportToPDF}
              type="button"
              disabled={filteredBillingRecords.length === 0}
              title="Export as PDF"
            >
              <FileText size={16} />
              Download PDF
            </button>
            <button
              className="admin-button-secondary flex gap-2 items-center px-5 py-2 rounded-xl font-medium"
              onClick={handlePrint}
              type="button"
              disabled={filteredBillingRecords.length === 0}
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
                <th className="py-2 px-3 border-b border-admin-border font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBillingRecords.length === 0 ? (
                <tr>
                  <td colSpan={13} className="text-center py-6 text-admin-text-muted">
                    No billing records available.
                  </td>
                </tr>
              ) : (
                filteredBillingRecords.map((record, idx) => (
                  <tr key={idx} className="hover:bg-blue-50 transition">
                    <td className="py-1.5 px-3 border-b border-admin-border">{record.id}</td>
                    <td className="py-1.5 px-3 border-b border-admin-border">{record.patientName}</td>
                    <td className="py-1.5 px-3 border-b border-admin-border">{record.age}</td>
                    <td className="py-1.5 px-3 border-b border-admin-border">{record.address}</td>
                    <td className="py-1.5 px-3 border-b border-admin-border">{record.phoneNo}</td>
                    <td className="py-1.5 px-3 border-b border-admin-border">{record.treatment}</td>
                    <td className="py-1.5 px-3 border-b border-admin-border">{record?.doctor?.fullName}</td>
                    <td className="py-1.5 px-3 border-b border-admin-border">{record.totalAmount}</td>
                    <td className="py-1.5 px-3 border-b border-admin-border">{record.paymentMethod}</td>
                    <td className="py-1.5 px-3 border-b border-admin-border">{record.paidAmount}</td>
                    <td className="py-1.5 px-3 border-b border-admin-border">{record.dueAmount}</td>
                    <td className="py-1.5 px-3 border-b border-admin-border">{record.expenseAmount}</td>
                    <td className="py-1.5 px-3 border-b border-admin-border text-center">
                      <div className="flex gap-1 justify-center">
                        <button
                          title="View"
                          type="button"
                          onClick={() => handleViewPatient(record)}
                          className="p-2 text-admin-text-faint hover:text-admin-primary hover:bg-blue-50 rounded-xl transition-all cursor-pointer"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          title="Edit"
                          type="button"
                          onClick={() => openEditModal(record)}
                          className="p-2 text-admin-text-faint hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all cursor-pointer"
                        >
                          <Pencil size={18} />
                        </button>
                        {/* Uncomment this block to enable deleting */}
                        {/* <button
                          title="Delete"
                          type="button"
                          onClick={() => handleDeletePatient(record.id)}
                          className="p-2 text-admin-text-faint hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
                        >
                          <Trash2 size={18} />
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ───────────────────── VIEW MODAL ───────────────────── */}
      {viewModalPatient && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[99] flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-admin-border flex flex-col" style={{ maxHeight: '90%' }}>
            <div className="flex items-center justify-between px-6 py-5 border-b border-admin-border-subtle">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-xl">
                  <Eye size={20} className="text-blue-600" />
                </div>
                <div>
                  <h2 className="text-base font-black text-admin-text">View Billing Record</h2>
                  <div className="text-xs text-admin-text-muted">
                    Reg. No: <span className="font-semibold">{viewModalPatient.id}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setViewModalPatient(null)}
                className="p-2 text-admin-text-faint hover:text-admin-text hover:bg-admin-surface rounded-xl transition"
                aria-label="Close View Modal"
              >
                <span className="sr-only">Close</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M6 6L14 14M6 14L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="px-6 py-6 overflow-y-auto grow">
              <div className="flex flex-col items-center gap-3 mb-6">
                <User size={48} className="text-blue-500 mb-1" />
                <div className="text-xl font-bold text-blue-900">{viewModalPatient.patientName}</div>
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-admin-text-muted">
                  <span className="flex items-center gap-1"><Phone size={15} /> {viewModalPatient.phoneNo}</span>
                  <span className="flex items-center gap-1"><Calendar size={15} /> {viewModalPatient.age} Yrs &bull; {viewModalPatient.caseType}</span>
                  <span className="flex items-center gap-1"><MapPin size={15} /> {viewModalPatient.address}</span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 border-t border-admin-border-subtle pt-5">
                <div>
                  <label className="block text-xs font-semibold text-admin-text mb-0.5">Treatment</label>
                  <div className="text-base font-medium text-admin-text">
                    {viewModalPatient.treatment || '--'}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-admin-text mb-0.5">Doctor / Consultant</label>
                  <div className="text-base font-medium text-admin-text">
                    {viewModalPatient.doctor?.fullName ?? viewModalPatient.doctorId ?? '--'}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-admin-text mb-0.5">Entry Date</label>
                  <div className="text-base font-medium text-admin-text">
                    {viewModalPatient.entryDateBs || '--'}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-admin-text mb-0.5">Payment Option</label>
                  <div className="text-base font-medium text-admin-text">
                    {viewModalPatient.paymentMethod}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-admin-text mb-0.5">Total Amount</label>
                  <div className="text-base font-medium text-admin-text flex items-center gap-2">
                    Rs. {viewModalPatient.totalAmount?.toLocaleString() ?? 0}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-admin-text mb-0.5">Paid</label>
                  <div className="text-base font-medium text-admin-text flex items-center gap-2">
                    Rs. {viewModalPatient.paidAmount?.toLocaleString() ?? 0}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-admin-text mb-0.5">Due</label>
                  <div className="text-base font-medium text-admin-text flex items-center gap-2">
                    Rs. {viewModalPatient.dueAmount?.toLocaleString() ?? 0}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-admin-text mb-0.5">Expenses</label>
                  <div className="text-base font-medium text-admin-text flex items-center gap-2">
                    Rs. {viewModalPatient.expenseAmount?.toLocaleString() ?? 0}
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 pb-5 flex justify-end pt-2 border-t border-admin-border-subtle">
              <button
                type="button"
                onClick={() => setViewModalPatient(null)}
                className="px-5 py-2.5 rounded-xl border border-admin-border text-xs font-bold text-admin-text-muted hover:bg-admin-surface transition-all"
                tabIndex={0}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────── EDIT MODAL ───────────────────── */}
      {editModalPatient && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-admin-border animate-fade-in flex flex-col"
            style={{ maxHeight: '80%' }}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-admin-border-subtle shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-xl">
                  <Pencil size={20} className="text-admin-primary" />
                </div>
                <div>
                  <h2 className="text-base font-black text-admin-text">Edit Patient</h2>
                </div>
              </div>
              <button
                onClick={() => setEditModalPatient(false)}
                className="p-2 text-admin-text-faint hover:text-admin-text hover:bg-admin-surface rounded-xl transition-all"
                aria-label="Close Edit Modal"
              >
                <span className="sr-only">Close</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M6 6L14 14M6 14L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="px-6 py-5 space-y-4 overflow-y-auto grow">
              <div>
                <label htmlFor="editFullName" className="block text-xs font-bold text-admin-text mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="editFullName"
                  name="editFullName"
                  value={editPatientDetails?.patientName}
                  disabled
                  className="w-full px-4 py-2 border border-admin-border rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary bg-admin-surface text-admin-text-muted"
                  placeholder="Enter full name"
                  required
                />
              </div>
              <div>
                <label htmlFor="editAddress" className="block text-xs font-bold text-admin-text mb-1">
                  Address
                </label>
                <input
                  type="text"
                  id="editAddress"
                  name="editAddress"
                  value={editPatientDetails?.address}
                  disabled
                  className="w-full px-4 py-2 border border-admin-border rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary bg-admin-surface text-admin-text-muted"
                  placeholder="Enter address"
                  required
                />
              </div>
              <div>
                <label htmlFor="editAge" className="block text-xs font-bold text-admin-text mb-1">
                  Age
                </label>
                <input
                  type="number"
                  id="editAge"
                  name="editAge"
                  value={editPatientDetails?.age ?? ''}
                  disabled
                  className="w-full px-4 py-2 border border-admin-border rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary bg-admin-surface text-admin-text-muted"
                  placeholder="Enter age"
                  min={0}
                  required
                />
              </div>
              <div>
                <label htmlFor="editPhoneNo" className="block text-xs font-bold text-admin-text mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="editPhoneNo"
                  name="editPhoneNo"
                  value={editPatientDetails?.phoneNo ?? ''}
                  disabled
                  className="w-full px-4 py-2 border border-admin-border rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary bg-admin-surface text-admin-text-muted"
                  placeholder="Enter phone number"
                  required
                />
              </div>
              <div>
                <label htmlFor="editTreatment" className="block text-xs font-bold text-admin-text mb-1">
                  Treatment
                </label>
                <input
                  type="text"
                  id="editTreatment"
                  name="editTreatment"
                  value={editPatientDetails?.treatment ?? ''}
                  disabled
                  className="w-full px-4 py-2 border border-admin-border rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary bg-admin-surface text-admin-text-muted"
                  placeholder="Enter treatment"
                />
              </div>
              <div className="space-y-1.5">
                <label className="admin-label">Doctor / Consultant</label>
                <div className="relative">
                  <select
                    value={editPatientDetails?.doctorId ?? ''}
                    disabled
                    className="admin-input appearance-none cursor-not-allowed pr-10 bg-admin-surface text-admin-text-muted"
                    required
                  >
                    <option value="">Select attending doctor</option>
                    {doctors?.map((doctor, idx) => {
                      return (
                        <option key={idx} value={doctor.fullName}>{doctor.fullName}</option>
                      )
                    })}
                  </select>
                  <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-admin-text-faint pointer-events-none" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-8">
                <div className="space-y-1.5">
                  <label className="admin-label">Case Type</label>
                  <select
                    value={editPatientDetails?.caseType ?? ''}
                    disabled
                    className="admin-input appearance-none cursor-not-allowed pr-10 bg-admin-surface text-admin-text-muted"
                    required
                  >
                    <option value="">Select case type</option>
                    <option value="NEW">NEW</option>
                    <option value="OLD">OLD</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-admin-text-faint pointer-events-none" />
                </div>
              </div>
              <div>
                <label htmlFor="editEntryDateBs" className="block text-xs font-bold text-admin-text mb-1">
                  Entry Date
                </label>
                <input
                  type="date"
                  id="editEntryDateBs"
                  name="editEntryDateBs"
                  value={editPatientDetails?.entryDateBs ?? ''}
                  disabled
                  className="w-full px-4 py-2 border border-admin-border rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary bg-admin-surface text-admin-text-muted"
                  placeholder="Enter entry date (BS)"
                />
              </div>
              {/* Add total amount, due, expenses and payment type at the end */}
              <div>
                <label htmlFor="editTotalAmount" className="block text-xs font-bold text-admin-text mb-1">
                  Total Amount
                </label>
                <input
                  type="number"
                  id="editTotalAmount"
                  name="editTotalAmount"
                  value={editPatientDetails?.totalAmount ?? ''}
                  onChange={e =>
                    setEditPatientDetails(prev =>
                      prev
                        ? { ...prev, totalAmount: Number(e.target.value) }
                        : prev
                    )
                  }
                  className="w-full px-4 py-2 border border-admin-border rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary"
                  placeholder="Enter total amount"
                />
              </div>
              <div>
                <label htmlFor="editDueAmount" className="block text-xs font-bold text-admin-text mb-1">
                  Due Amount
                </label>
                <input
                  type="number"
                  id="editDueAmount"
                  name="editDueAmount"
                  value={editPatientDetails?.dueAmount ?? ''}
                  onChange={e =>
                    setEditPatientDetails(prev =>
                      prev
                        ? { ...prev, dueAmount: Number(e.target.value) }
                        : prev
                    )
                  }
                  className="w-full px-4 py-2 border border-admin-border rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary"
                  placeholder="Enter due amount"
                />
              </div>
              <div>
                <label htmlFor="editExpenseAmount" className="block text-xs font-bold text-admin-text mb-1">
                  Expenses
                </label>
                <input
                  type="number"
                  id="editExpenseAmount"
                  name="editExpenseAmount"
                  value={editPatientDetails?.expenseAmount ?? ''}
                  onChange={e =>
                    setEditPatientDetails(prev =>
                      prev
                        ? { ...prev, expenseAmount: Number(e.target.value) }
                        : prev
                    )
                  }
                  className="w-full px-4 py-2 border border-admin-border rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary"
                  placeholder="Enter expenses"
                />
              </div>
              <div>
                <label htmlFor="editPaymentMethod" className="block text-xs font-bold text-admin-text mb-1">
                  Payment Type
                </label>
                <select
                  id="editPaymentMethod"
                  name="editPaymentMethod"
                  value={editPatientDetails?.paymentMethod ?? ''}
                  onChange={e =>
                    setEditPatientDetails(prev =>
                      prev
                        ? { ...prev, paymentMethod: e.target.value }
                        : prev
                    )
                  }
                  className="w-full px-4 py-2 border border-admin-border rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-primary"
                >
                  <option value="">Select payment type</option>
                  <option value="CASH">Cash</option>
                  <option value="ONLINE">Online</option>
                  <option value="CREDIT">Credit</option>
                </select>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-admin-border-subtle flex justify-end gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setEditModalPatient(false)}
                className="px-5 py-2.5 rounded-xl border border-admin-border text-xs font-bold text-admin-text-muted hover:bg-admin-surface transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleEdit}
                className="px-5 py-2.5 rounded-xl bg-admin-primary text-white text-xs font-black hover:bg-admin-primary-hover transition-all shadow-lg shadow-admin-primary/20"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Billing;