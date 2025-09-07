import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Drawer, DrawerContent, DrawerFooter } from "@/components/ui/drawer";
import { DialogTitle } from "@/components/ui/dialog";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { TStartups } from "@/app/types/startup";
import Link from "next/link";
import { getStartupEngagement } from "@/app/hooks/startups/getStartupEngagement";
import { setStartupEngagement } from "@/app/hooks/startups/setStartupEngagement";
import { X, ChevronRight } from "lucide-react";

async function generateStartupPDF(startup: TStartups): Promise<void> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]);

  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const timesRomanBoldFont = await pdfDoc.embedFont(
    StandardFonts.TimesRomanBold,
  );

  const { width, height } = page.getSize();
  const fontSize = 12;
  const titleFontSize = 18;
  const margin = 50;
  let yPosition = height - margin;

  page.drawText(startup.name, {
    x: margin,
    y: yPosition,
    size: titleFontSize,
    font: timesRomanBoldFont,
    color: rgb(0, 0, 0),
  });

  yPosition -= 20;

  page.drawText(`Sector: ${startup.sector || "N/A"}`, {
    x: margin,
    y: yPosition,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  yPosition -= 20;

  page.drawText(`Maturity: ${startup.maturity || "N/A"}`, {
    x: margin,
    y: yPosition,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  yPosition -= 20;

  page.drawText(`Legal Status: ${startup.legal_status || "N/A"}`, {
    x: margin,
    y: yPosition,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  yPosition -= 20;

  page.drawText(`Website: ${startup.website_url || "N/A"}`, {
    x: margin,
    y: yPosition,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  yPosition -= 20;

  page.drawText(`Detail: ${startup.description || "No details"}`, {
    x: margin,
    y: yPosition,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  yPosition -= 30;

  page.drawText("Contact Information:", {
    x: margin,
    y: yPosition,
    size: fontSize,
    font: timesRomanBoldFont,
    color: rgb(0, 0, 0),
  });

  yPosition -= 20;

  page.drawText(`Email: ${startup.email}`, {
    x: margin,
    y: yPosition,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  yPosition -= 20;

  page.drawText(`Phone: ${startup.phone || "N/A"}`, {
    x: margin,
    y: yPosition,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  yPosition -= 20;

  page.drawText(`Address: ${startup.address || "N/A"}`, {
    x: margin,
    y: yPosition,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([new Uint8Array(pdfBytes)], {
    type: "application/pdf",
  });
  const fileUrl = window.URL.createObjectURL(blob);

  const alink = document.createElement("a");
  alink.href = fileUrl;
  alink.download = startup.name + ".pdf";
  alink.click();
}

export default function Modal({
  startup,
  image,
}: {
  startup: TStartups;
  image: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    setIsOpen(!isOpen);
    getStartupEngagement(startup.id)
      .then((rate) => {
        if (rate === null) {
          return;
        }
        setStartupEngagement(startup.id, rate + 1);
      })
      .catch((err) => {
        console.error("Failed to fetch engagement rate:", err);
      });
  };

  return (
    <>
      <Card
        key={startup.id}
        onClick={onClick}
        className="w-full transform cursor-pointer rounded-xl border border-gray-200"
      >
        <CardHeader className="mx-4 flex items-center rounded-md bg-muted/75 px-4 py-2">
          <CardTitle className="line-clamp-2 text-lg font-bold">
            {startup.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col">
          <div className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <span className="text-xs font-medium text-gray-500">Sector:</span>
              <span className="grid text-sm text-gray-700 md:col-span-2">
                <span className="truncate">{startup.sector || "N/A"}</span>
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3">
              <span className="text-xs font-medium text-gray-500">
                Maturity:
              </span>
              <span className="grid text-sm text-gray-700 md:col-span-2">
                <span className="truncate">{startup.maturity || "N/A"}</span>
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3">
              <span className="text-xs font-medium text-gray-500">
                Address:
              </span>
              <span className="grid text-sm text-gray-700 md:col-span-2">
                <span className="truncate">{startup.address || "N/A"}</span>
              </span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center rounded-md bg-primary py-2 text-xs text-white transition-all duration-100 hover:scale-105 hover:bg-primary/90">
            See More Details
            <ChevronRight className="ml-4 size-4" />
          </div>
        </CardContent>
      </Card>

      <Drawer direction="right" open={isOpen}>
        <DrawerContent>
          <div className="flex h-full flex-col">
            <div className="relative border-b p-6">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 left-4 cursor-pointer rounded-full transition-colors hover:bg-gray-100"
              >
                <X className="size-4" />
              </button>
              <DialogTitle className="mb-2 ml-12 text-2xl font-bold text-gray-900">
                {startup.name}
              </DialogTitle>
              <p className="ml-12 text-sm text-gray-500">Startup Profile</p>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto p-6">
              <div>
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  Basic Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      Legal Status:
                    </span>
                    <span className="text-sm text-gray-900">
                      {startup.legal_status || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      Sector:
                    </span>
                    <span className="text-sm text-gray-900">
                      {startup.sector || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      Maturity:
                    </span>
                    <span className="text-sm text-gray-900">
                      {startup.maturity || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      Email:
                    </span>
                    <span className="text-sm text-gray-900">
                      {startup.email}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      Phone:
                    </span>
                    <span className="text-sm text-gray-900">
                      {startup.phone || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      Address:
                    </span>
                    <span className="max-w-64 truncate text-right text-sm text-gray-900">
                      <span className="truncate">
                        {startup.address || "N/A"}
                      </span>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      Website:
                    </span>
                    {startup.website_url ? (
                      <Link
                        href={startup.website_url}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="text-sm text-blue-600 underline hover:text-blue-800"
                      >
                        Visit Website
                      </Link>
                    ) : (
                      <span className="text-sm text-gray-900">N/A</span>
                    )}
                  </div>
                </div>
              </div>
              {startup.description && (
                <div>
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">
                    Description
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-700">
                    {startup.description}
                  </p>
                </div>
              )}
            </div>
            <DrawerFooter className="border-t bg-gray-50">
              <Button
                onClick={() => generateStartupPDF(startup)}
                className="w-full bg-primary text-white hover:bg-primary/90"
              >
                Download PDF
              </Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
