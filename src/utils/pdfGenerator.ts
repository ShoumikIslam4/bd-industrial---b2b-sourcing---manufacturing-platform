import jsPDF from 'jspdf';
import { Quotation, RFQ } from '../types';

export const generateQuotationPDF = (quotation: Quotation, rfq?: RFQ) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const primaryNavy = '#0f172a';
  const accentBlue = '#0284c7';

  // Header Banner
  doc.setFillColor(15, 23, 42); // Navy
  doc.rect(0, 0, 210, 36, 'F');

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('COMMERCIAL B2B QUOTATION', 14, 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(203, 213, 225);
  doc.text('BD-Industrial Manufacturing & Sourcing Exchange • Bangladesh', 14, 26);

  // Quote Meta Box (Top Right)
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text(`Ref ID: #${quotation.id.toUpperCase()}`, 145, 14);
  doc.text(`Date: ${new Date(quotation.createdAt).toLocaleDateString('en-GB')}`, 145, 20);
  doc.text(`Valid Until: ${quotation.validityUntil}`, 145, 26);

  // Supplier & Buyer details grid
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(14, 42, 88, 38, 2, 2, 'F');
  doc.roundedRect(108, 42, 88, 38, 2, 2, 'F');

  // Supplier info
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('MANUFACTURER / SUPPLIER', 18, 50);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  doc.text(quotation.supplierName, 18, 56);
  doc.text(`Email: ${quotation.supplierEmail}`, 18, 62);
  doc.text('Industrial Zone: Gazipur / Narayanganj, BD', 18, 68);
  doc.text('Status: Verified Gold Factory Audit', 18, 74);

  // Buyer info
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('ISSUED TO (BUYER / PROCUREMENT)', 112, 50);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  doc.text(rfq ? rfq.buyerCompany : 'Enterprise Buyer Org', 112, 56);
  doc.text(rfq ? `Contact: ${rfq.buyerName}` : 'Procurement Team', 112, 62);
  doc.text(rfq ? `Email: ${rfq.buyerEmail}` : 'buyer@procure.com', 112, 68);
  doc.text(rfq ? `Delivery: ${rfq.deliveryDistrict}` : 'Dhaka / Chittagong, Bangladesh', 112, 74);

  // RFQ Subject line
  doc.setFillColor(241, 245, 249);
  doc.rect(14, 86, 182, 12, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('INQUIRY SUBJECT:', 18, 93);
  doc.setFont('helvetica', 'normal');
  doc.text(quotation.rfqTitle.slice(0, 75), 58, 93);

  // Quotation Table Header
  const tableY = 106;
  doc.setFillColor(15, 23, 42);
  doc.rect(14, tableY, 182, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('ITEM DESCRIPTION & SPECIFICATIONS', 18, tableY + 6);
  doc.text('MOQ OFFERED', 105, tableY + 6);
  doc.text('UNIT PRICE (BDT)', 136, tableY + 6);
  doc.text('TOTAL AMOUNT', 168, tableY + 6);

  // Quotation Table Row
  doc.setFillColor(255, 255, 255);
  doc.rect(14, tableY + 10, 182, 28, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.rect(14, tableY + 10, 182, 28, 'S');

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(quotation.rfqTitle.slice(0, 48), 18, tableY + 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text(`Lead Time: ${quotation.leadTimeDays} Calendar Days`, 18, tableY + 24);
  doc.text(`Sample Status: ${quotation.sampleOffered ? 'Free Pre-Production Sample Available' : 'Sample on request'}`, 18, tableY + 30);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text(`${quotation.moqOffered.toLocaleString()} Pcs`, 105, tableY + 22);
  doc.text(`BDT ${quotation.unitPriceBDT.toLocaleString()}`, 136, tableY + 22);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(2, 132, 199);
  doc.text(`BDT ${quotation.totalAmountBDT.toLocaleString()}`, 168, tableY + 22);

  // Financial Summary Breakdown
  const sumY = 152;
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(118, sumY, 78, 42, 2, 2, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(118, sumY, 78, 42, 2, 2, 'S');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text('Subtotal:', 124, sumY + 9);
  doc.text(`BDT ${quotation.totalAmountBDT.toLocaleString()}`, 164, sumY + 9);

  doc.text('Estimated VAT (0% Export / 5% Loc):', 124, sumY + 17);
  doc.text('Included / BDT 0', 164, sumY + 17);

  doc.text('Quality Inspection Fee:', 124, sumY + 25);
  doc.text('Complimentary', 164, sumY + 25);

  doc.setDrawColor(203, 213, 225);
  doc.line(122, sumY + 29, 192, sumY + 29);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('Total Quotation Value:', 124, sumY + 36);
  doc.setTextColor(2, 132, 199);
  doc.text(`BDT ${quotation.totalAmountBDT.toLocaleString()}`, 158, sumY + 36);

  // Commercial Terms & Conditions
  const termsY = 152;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('Commercial Terms & Payment Conditions:', 14, termsY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text(`1. Payment: ${quotation.paymentTerms || '30% Advance T/T, 70% against B/L or 100% L/C at sight'}.`, 14, termsY + 8);
  doc.text(`2. Delivery Timeline: Estimated ${quotation.leadTimeDays} business days after lab-dip/PPS sign-off.`, 14, termsY + 15);
  doc.text('3. Quality Standard: Strict compliance with AQL 2.5 Major / 4.0 Minor inspection guidelines.', 14, termsY + 22);
  doc.text(`4. Factory Notes: ${quotation.notes ? quotation.notes.slice(0, 110) : 'Custom specifications confirmed.'}`, 14, termsY + 29);
  doc.text('5. Jurisdiction: This quotation is governed under the Laws of Bangladesh and ICC Incoterms 2020.', 14, termsY + 36);

  // Digital Signatures & Stamp
  const sigY = 220;
  doc.setDrawColor(203, 213, 225);
  doc.line(18, sigY + 22, 75, sigY + 22);
  doc.line(125, sigY + 22, 185, sigY + 22);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Authorized Factory Signatory', 18, sigY + 28);
  doc.text('Buyer Acceptance & Confirmation', 125, sigY + 28);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text(`${quotation.supplierName} • Dhaka Commercial Dept.`, 18, sigY + 33);
  doc.text('Sign & Stamp below to accept quote', 125, sigY + 33);

  // Official Stamp simulation
  doc.setDrawColor(2, 132, 199);
  doc.roundedRect(68, sigY + 4, 38, 20, 2, 2, 'S');
  doc.setTextColor(2, 132, 199);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('BD-INDUSTRIAL VERIFIED', 71, sigY + 11);
  doc.text('DIGITAL COMPLIANCE STAMP', 70, sigY + 16);
  doc.text('DHAKA, BANGLADESH', 74, sigY + 21);

  // Footer
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 287, 210, 10, 'F');
  doc.setTextColor(148, 163, 184);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text('Generated via BD-Industrial Sourcing Platform • Level 9, Navana Tower, Gulshan-1, Dhaka • www.bdsource.com.bd', 14, 293);

  // Trigger Save
  doc.save(`Quotation_${quotation.id.toUpperCase()}_${quotation.supplierName.replace(/\s+/g, '_')}.pdf`);
};
