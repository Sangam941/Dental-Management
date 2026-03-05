import type { BillingPayload } from "../types";

// Print Single Bill Handler
export const handlePrintSingleBill = (billing: BillingPayload) => {
    // Prepare a print window with nice formatting for the bill, including header, patient info, and billing breakdown
    const now = new Date();
    const dateStr = `Date: ${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;
    const monthStr = `Month: ${(now.getMonth() + 1).toString().padStart(2, '0')}`;

    // Print content HTML
    const printHeaderHTML = `
      <div style="text-align: center; margin-bottom:10px;">
        <div style="font-weight: bold; font-size: 22px;">Pristine Dental & Maxillofacial Center Pvt.Ltd.</div>
        <div style="font-size:16px;font-weight:600;margin-bottom:3px;">Billing Receipt</div>
      </div>
      <div style="text-align: right; font-size: 13px; margin-bottom: 8px; font-weight: 600;">
        ${dateStr} &nbsp; ${monthStr}
      </div>
      <hr>
    `;

    const patientInfoHTML = `
      <div style="margin-bottom:12px;font-size:15px;">
        <table style="width:100%;font-size:14px;">
          <tbody>
            <tr>
              <td><strong>Patient:</strong></td>
              <td>${billing.opdEntry?.fullName ?? '--'}</td>
              <td><strong>Reg. No:</strong></td>
              <td>${billing.id}</td>
            </tr>
            <tr>
              <td><strong>Age:</strong></td>
              <td>${billing.opdEntry?.age ?? '--'}</td>
              <td><strong>Phone:</strong></td>
              <td>${billing.opdEntry?.phoneNumber ?? '--'}</td>
            </tr>
            <tr>
              <td><strong>Address:</strong></td>
              <td colspan="3">${billing.opdEntry?.address ?? '--'}</td>
            </tr>
            <tr>
              <td><strong>Treatment:</strong></td>
              <td colspan="3">${billing.opdEntry?.treatment ?? '--'}</td>
            </tr>
            <tr>
              <td><strong>Doctor:</strong></td>
              <td colspan="3">${billing.opdEntry?.doctor?.fullName ?? billing.opdEntry?.doctorId ?? '--'}</td>
            </tr>
            <tr>
              <td><strong>Entry Date:</strong></td>
              <td colspan="3">${billing.opdEntry?.entryDate ?? '--'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    const billingTableHTML = `
      <div style="margin-bottom:0;">
        <table style="width:100%;border-collapse:collapse;">
          <thead>
            <tr>
              <th style="border:1px solid #ccc;padding:7px;text-align:left;">Total</th>
              <th style="border:1px solid #ccc;padding:7px;text-align:left;">Payment Option</th>
              <th style="border:1px solid #ccc;padding:7px;text-align:left;">Paid</th>
              <th style="border:1px solid #ccc;padding:7px;text-align:left;">Due</th>
              <th style="border:1px solid #ccc;padding:7px;text-align:left;">Expenses</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border:1px solid #ccc;padding:7px;">Rs. ${(billing.totalAmount ?? 0).toLocaleString()}</td>
              <td style="border:1px solid #ccc;padding:7px;">${billing.paymentMethod}</td>
              <td style="border:1px solid #ccc;padding:7px;">Rs. ${(billing.paidAmount ?? 0).toLocaleString()}</td>
              <td style="border:1px solid #ccc;padding:7px;">Rs. ${(billing.dueAmount ?? 0).toLocaleString()}</td>
              <td style="border:1px solid #ccc;padding:7px;">Rs. ${(billing.expenseAmount ?? 0).toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    const billFooterHTML = `
      <div style="margin-top:24px;text-align:center;font-size:13px;color:#333;">
        Thank you for your visit!
      </div>
    `;

    const style = `
      <style>
        body { font-family: Arial, Helvetica, sans-serif; color: #1f2937; padding:0 12px; }
        table { border-collapse: collapse; }
        th, td { font-size: 14px; }
        hr { margin: 13px 0; }
      </style>
    `;
    const win = window.open('', '_blank', 'width=650,height=550');
    if (win) {
      win.document.write(`<html><head><title>Print Single Bill</title>${style}</head><body>`);
      win.document.write(printHeaderHTML);
      win.document.write(patientInfoHTML);
      win.document.write(billingTableHTML);
      win.document.write(billFooterHTML);
      win.document.write('</body></html>');
      win.document.close();
      win.focus();
      setTimeout(() => {
        win.print();
        // win.close();
      }, 250);
    }
  };