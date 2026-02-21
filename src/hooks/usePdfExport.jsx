import { useState, useCallback } from "react";
import { createRoot } from "react-dom/client";

const A4_MM_W = 210;
const A4_MM_H = 297;

/**
 * Renders a React component into a temporary off-screen DOM node,
 * screenshots it with html2canvas, then removes the node.
 * This avoids the "element is outside viewport" blank-page bug.
 */
export function usePdfExport() {
  const [exporting, setExporting] = useState(false);

  const exportPdf = useCallback(async (TemplateComponent, data, settings, filename = "resume.pdf") => {
    setExporting(true);
    try {
      const { default: html2canvas } = await import("html2canvas");
      const { default: jsPDF }       = await import("jspdf");

      // ── 1. Create a fully visible off-screen container ───────────────────
      //    position:absolute + top:0 puts it in the document flow so
      //    html2canvas can see it, but left:-9999px keeps it invisible.
      const container = document.createElement("div");
      Object.assign(container.style, {
        position:   "absolute",
        top:        "0px",
        left:       "-9999px",
        width:      "794px",   // 210mm @ 96dpi
        background: "#ffffff",
        zIndex:     "-1",
      });
      document.body.appendChild(container);

      // ── 2. Render the template into that container ───────────────────────
      await new Promise((resolve) => {
        const root = createRoot(container);
        root.render(
          <TemplateComponent data={data} settings={settings} />
        );
        // Let React finish painting
        requestAnimationFrame(() => requestAnimationFrame(resolve));
      });

      // Small extra delay for images / web fonts
      await new Promise(r => setTimeout(r, 400));

      // ── 3. Capture with html2canvas ──────────────────────────────────────
      const canvas = await html2canvas(container, {
        scale:           3,           // retina quality
        useCORS:         true,
        allowTaint:      true,
        backgroundColor: "#ffffff",
        logging:         false,
        width:           container.scrollWidth,
        height:          container.scrollHeight,
        windowWidth:     794,
        windowHeight:    container.scrollHeight,
        x: 0,
        y: 0,
      });

      // ── 4. Cleanup ───────────────────────────────────────────────────────
      document.body.removeChild(container);

      // ── 5. Map canvas → mm, fit to A4 ───────────────────────────────────
      let imgW = A4_MM_W;
      let imgH = (canvas.height / canvas.width) * imgW;

      if (imgH > A4_MM_H) {
        const ratio = A4_MM_H / imgH;
        imgW *= ratio;
        imgH  = A4_MM_H;
      }

      // ── 6. Build PDF — page size = content size (no blank trailing space) ─
      const pdf = new jsPDF({
        orientation: "portrait",
        unit:        "mm",
        format:      [A4_MM_W, imgH],
        compress:    true,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.97);
      pdf.addImage(imgData, "JPEG", 0, 0, imgW, imgH);
      pdf.save(filename);

    } catch (err) {
      console.error("PDF export failed:", err);
      alert("PDF export failed: " + err.message);
    } finally {
      setExporting(false);
    }
  }, []);

  return { exportPdf, exporting };
}
