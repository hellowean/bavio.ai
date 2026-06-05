import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

import type { CallLogEntry, LeadEntry } from '@/types'

type ReportMetadata = {
  appliedFilters: string[]
}

const brandColor = '#10B981'
const textColor = '#111827'
const mutedColor = '#64748B'
const borderColor = '#D1D5DB'

function formatExportDate(date = new Date()) {
  return date.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

function addReportHeader(doc: jsPDF, title: string, totalLabel: string, metadata: ReportMetadata) {
  const exportedAt = formatExportDate()
  const appliedFilters =
    metadata.appliedFilters.length > 0 ? metadata.appliedFilters.join(' | ') : 'None'

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.setTextColor(textColor)
  doc.text(title, 14, 18)

  doc.setDrawColor(brandColor)
  doc.setLineWidth(0.8)
  doc.line(14, 23, 196, 23)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(mutedColor)
  doc.text(`Exported: ${exportedAt}`, 14, 32)
  doc.text(totalLabel, 14, 39)

  const wrappedFilters = doc.splitTextToSize(`Applied filters: ${appliedFilters}`, 182)
  doc.text(wrappedFilters, 14, 46)

  return 50 + wrappedFilters.length * 4
}

function saveTableReport({
  body,
  columns,
  filename,
  metadata,
  title,
  totalLabel,
}: {
  body: Array<Array<string>>
  columns: string[]
  filename: string
  metadata: ReportMetadata
  title: string
  totalLabel: string
}) {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
  const startY = addReportHeader(doc, title, totalLabel, metadata)

  autoTable(doc, {
    body,
    head: [columns],
    margin: { left: 14, right: 14 },
    startY,
    styles: {
      cellPadding: 2.6,
      font: 'helvetica',
      fontSize: 8.5,
      lineColor: borderColor,
      lineWidth: 0.1,
      overflow: 'linebreak',
      textColor,
      valign: 'middle',
    },
    headStyles: {
      fillColor: [17, 24, 39],
      fontStyle: 'bold',
      halign: 'left',
      textColor: [249, 250, 251],
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    didDrawPage: (data) => {
      const pageCount = doc.getNumberOfPages()
      const pageSize = doc.internal.pageSize
      const pageWidth = pageSize.getWidth()
      const pageHeight = pageSize.getHeight()

      doc.setFontSize(8)
      doc.setTextColor(mutedColor)
      doc.text('Bavio Voice AI Infrastructure', data.settings.margin.left, pageHeight - 8)
      doc.text(`Page ${data.pageNumber} of ${pageCount}`, pageWidth - 14, pageHeight - 8, {
        align: 'right',
      })
    },
  })

  doc.save(filename)
}

export function exportCallsReportPdf(calls: CallLogEntry[], metadata: ReportMetadata) {
  saveTableReport({
    body: calls.map((call) => [
      call.dateTime,
      `${call.callerName}\n${call.callerNumber}`,
      call.agent,
      call.duration,
      call.resolution,
      call.sentiment,
      call.lead ? 'Yes' : 'No',
    ]),
    columns: ['Date & Time', 'Caller', 'Agent', 'Duration', 'Resolution', 'Sentiment', 'Lead'],
    filename: 'bavio-calls-report.pdf',
    metadata,
    title: 'Bavio Calls Report',
    totalLabel: `Total calls shown: ${calls.length}`,
  })
}

export function exportLeadsReportPdf(leads: LeadEntry[], metadata: ReportMetadata) {
  saveTableReport({
    body: leads.map((lead) => [
      lead.name,
      lead.phone,
      lead.email,
      lead.intent,
      `${lead.score}/10`,
      lead.status,
      lead.sourceAgent,
      lead.created,
    ]),
    columns: ['Name', 'Phone', 'Email', 'Intent', 'Score', 'Status', 'Source Agent', 'Created'],
    filename: 'bavio-leads-report.pdf',
    metadata,
    title: 'Bavio Leads Report',
    totalLabel: `Total leads shown: ${leads.length}`,
  })
}
