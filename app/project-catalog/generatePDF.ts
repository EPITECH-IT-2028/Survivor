import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { TStartups } from '@/app/types/startup';

export async function generateStartupPDF(startup: TStartups): Promise<void> {
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([612, 792])

  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
  const timesRomanBoldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold)

  const { width, height } = page.getSize()
  const fontSize = 12
  const titleFontSize = 18
  const margin = 50
  let yPosition = height - margin

  page.drawText(startup.name, {
    x: margin,
    y: yPosition,
    size: titleFontSize,
    font: timesRomanBoldFont,
    color: rgb(0, 0, 0),
  })

  yPosition -= 20

  page.drawText(`Sector: ${startup.sector || 'N/A'}`, {
    x: margin,
    y: yPosition,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  })

  yPosition -= 20

  page.drawText(`Maturity: ${startup.maturity || 'N/A'}`, {
    x: margin,
    y: yPosition,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  })

  yPosition -= 20

  page.drawText(`Legal Status: ${startup.legal_status || 'N/A'}`, {
    x: margin,
    y: yPosition,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  })

  yPosition -= 20

  page.drawText(`Website: ${startup.website_url || 'N/A'}`, {
    x: margin,
    y: yPosition,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  })

  yPosition -= 20

  page.drawText(`Detail: ${startup.description || 'No details'}`, {
    x: margin,
    y: yPosition,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  })

  yPosition -= 30

  page.drawText('Contact Information:', {
    x: margin,
    y: yPosition,
    size: fontSize,
    font: timesRomanBoldFont,
    color: rgb(0, 0, 0),
  })

  yPosition -= 20

  page.drawText(`Email: ${startup.email}`, {
    x: margin,
    y: yPosition,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  })

  yPosition -= 20

  page.drawText(`Phone: ${startup.phone || 'N/A'}`, {
    x: margin,
    y: yPosition,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  })

  yPosition -= 20

  page.drawText(`Address: ${startup.address || 'N/A'}`, {
    x: margin,
    y: yPosition,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  })

  const pdfBytes = await pdfDoc.save()
  const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' })
  const fileUrl = window.URL.createObjectURL(blob)

  const alink = document.createElement("a")
  alink.href = fileUrl
  alink.download = startup.name + ".pdf"
  alink.click()
}
