import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Pipeline robusto para exportação de PDF sem erros.
 * Resolve problemas de cores modernas, gradientes, SVGs, imagens CORS, fontes e tamanho do canvas.
 */

/**
 * FASE 2: Normalização Total do DOM
 */
function sanitizeDOMForPDF(element: HTMLElement) {
  const tempDiv = document.createElement("div");
  tempDiv.style.display = "none";
  document.body.appendChild(tempDiv);

  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext("2d");

  const toRGB = (color: string): string => {
    if (!color || color === "transparent" || color === "rgba(0, 0, 0, 0)") return "rgba(0,0,0,0)";
    
    // Se já for rgb/rgba simples, retorna rápido
    if ((color.startsWith("rgb(") || color.startsWith("rgba(")) && !color.includes("oklch") && !color.includes("oklab")) {
      return color;
    }

    // Fallback para gradientes (pega a primeira cor)
    if (color.includes("-gradient(")) {
      const colorMatch = color.match(/(?:rgb|rgba|oklch|oklab|lab|lch|color|#)\([^)]+\)|#[a-fA-F0-9]+/);
      if (colorMatch) return toRGB(colorMatch[0]);
      return "rgba(0,0,0,0)";
    }

    try {
      if (!ctx) throw new Error();
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 1, 1);
      const data = ctx.getImageData(0, 0, 1, 1).data;
      return `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
    } catch {
      try {
        tempDiv.style.color = color;
        const computed = window.getComputedStyle(tempDiv).color;
        if (computed && (computed.startsWith('rgb') || computed.startsWith('rgba')) && !computed.includes("oklch") && !computed.includes("oklab")) {
          return computed;
        }
        return "#000000";
      } catch {
        return "#000000";
      }
    }
  };

  const processElement = (el: HTMLElement) => {
    const style = window.getComputedStyle(el);

    // 1. Converter Cores (Iteração robusta sobre todas as propriedades computadas)
    // getComputedStyle(el) retorna um objeto que pode ser iterado para pegar todos os nomes de propriedades
    for (let i = 0; i < style.length; i++) {
      const prop = style[i];
      // Filtramos propriedades que costumam conter cores
      if (
        prop.includes("color") || 
        prop === "fill" || 
        prop === "stroke" || 
        prop === "stop-color" || 
        prop === "flood-color" || 
        prop === "lighting-color"
      ) {
        const value = style.getPropertyValue(prop);
        if (value && (value.includes("oklch") || value.includes("oklab") || value.includes("lab(") || value.includes("lch("))) {
          el.style.setProperty(prop, toRGB(value), 'important');
        }
      }
    }

    // 2. Atributos SVG (Muitas vezes cores estão em atributos, não apenas no style)
    if (el instanceof SVGElement || el.tagName.toLowerCase() === 'svg' || el.closest('svg')) {
      const svgAttrs = ["fill", "stroke", "stop-color", "flood-color", "lighting-color"];
      svgAttrs.forEach(attr => {
        const val = el.getAttribute(attr);
        if (val && (val.includes("oklch") || val.includes("oklab") || val.includes("lab(") || val.includes("lch("))) {
          el.setAttribute(attr, toRGB(val));
        }
      });
    }

    // 3. Remover Gradientes e Imagens de Fundo Problemáticas
    const bgImg = style.backgroundImage;
    if (bgImg && bgImg !== "none") {
      if (bgImg.includes("-gradient(") || bgImg.includes("oklch") || bgImg.includes("oklab")) {
        const fallbackColor = toRGB(bgImg);
        el.style.setProperty("background-image", "none", "important");
        el.style.setProperty("background-color", fallbackColor, "important");
      }
    }

    // 4. Remover Shadows e Filtros (causam muitos erros no html2canvas com cores modernas)
    const bShadow = style.boxShadow;
    if (bShadow && bShadow !== "none") {
      if (bShadow.includes("oklch") || bShadow.includes("oklab")) {
        el.style.setProperty("box-shadow", "none", "important");
      }
    }
    const filter = style.filter;
    if (filter && filter !== "none") {
      if (filter.includes("oklch") || filter.includes("oklab")) {
        el.style.setProperty("filter", "none", "important");
      }
    }

    // 4. Remover Transforms (podem causar desalinhamento no html2canvas)
    if (style.transform && style.transform !== "none") el.style.transform = "none";

    // 5. Normalizar Position (fixed/sticky -> static)
    if (style.position === "fixed" || style.position === "sticky") {
      el.style.position = "static";
    }

    // 6. Garantir Visibilidade e Overflow
    el.style.overflow = "visible";
    el.style.visibility = "visible";
    el.style.opacity = "1";

    // 7. Estabilizar Tipografia (Garantir que fontes e pesos sejam preservados no clone)
    if (style.fontFamily) el.style.fontFamily = style.fontFamily;
    if (style.fontWeight) el.style.fontWeight = style.fontWeight;
    if (style.lineHeight) el.style.lineHeight = style.lineHeight;
    if (style.letterSpacing) el.style.letterSpacing = style.letterSpacing;

    // 8. Remover Animações
    el.style.animation = "none";
    el.style.transition = "none";
  };

  // Processar recursivamente
  processElement(element);
  const descendants = element.getElementsByTagName("*");
  for (let i = 0; i < descendants.length; i++) {
    processElement(descendants[i] as HTMLElement);
  }

  document.body.removeChild(tempDiv);
}

/**
 * FASE 5: Proteção contra Crash (Vertical Slicing para elementos grandes)
 */
async function generateCanvasSlices(element: HTMLElement, scale: number) {
  const MAX_CANVAS_HEIGHT = 10000; // Limite seguro para evitar crash de memória
  const totalHeight = element.scrollHeight;
  const width = element.scrollWidth;
  const slices = [];

  if (totalHeight <= MAX_CANVAS_HEIGHT) {
    const canvas = await html2canvas(element, {
      scale,
      useCORS: true,
      allowTaint: false,
      backgroundColor: "#ffffff",
      logging: false,
      width,
      height: totalHeight,
      windowWidth: width,
      windowHeight: totalHeight
    });
    return [canvas];
  }

  // Se for muito grande, fatiamos verticalmente
  let currentY = 0;
  while (currentY < totalHeight) {
    const sliceHeight = Math.min(MAX_CANVAS_HEIGHT, totalHeight - currentY);
    const canvas = await html2canvas(element, {
      scale,
      useCORS: true,
      allowTaint: false,
      backgroundColor: "#ffffff",
      logging: false,
      width,
      height: sliceHeight,
      y: currentY,
      windowWidth: width,
      windowHeight: totalHeight,
      scrollX: 0,
      scrollY: -currentY
    });
    slices.push(canvas);
    currentY += sliceHeight;
  }

  return slices;
}

/**
 * FUNÇÃO PRINCIPAL: exportToPDFSafe
 */
export async function exportToPDFSafe(
  elementId: string, 
  filename: string = "documento.pdf",
  options: { 
    scale?: number;
    orientation?: 'p' | 'l';
    format?: string | number[];
    forcedWidth?: number;
  } = {}
): Promise<void> {
  const originalElement = document.getElementById(elementId);
  if (!originalElement) throw new Error(`Elemento #${elementId} não encontrado.`);

  const scale = options.scale || 2;
  const orientation = options.orientation || 'p';
  const format = options.format || 'a4';
  const forcedWidth = options.forcedWidth;

  // FASE 1: Clonagem Segura
  const clone = originalElement.cloneNode(true) as HTMLElement;
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.top = "0";
  container.style.left = "0";
  
  // Se forcedWidth for definido, usamos ele para garantir layout consistente
  const renderWidth = forcedWidth || originalElement.offsetWidth;
  container.style.width = renderWidth + "px";
  
  container.style.zIndex = "-9999";
  container.style.pointerEvents = "none";
  container.appendChild(clone);
  
  // Garantir que o clone ocupe a largura total do container
  clone.style.width = "100%";
  clone.style.height = "auto";
  clone.style.margin = "0";
  clone.style.padding = "0";

  document.body.appendChild(container);

  try {
    // FASE 2: Normalização
    sanitizeDOMForPDF(clone);
    clone.style.backgroundColor = "#ffffff";

    // FASE 3: Garantir Render Completo
    // 1. Fontes
    if ((document as any).fonts) {
      await (document as any).fonts.ready;
    }

    // 2. Imagens
    const images = Array.from(clone.getElementsByTagName("img"));
    await Promise.all(images.map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    }));

    // 3. Delay técnico para estabilização de layout/charts
    await new Promise(r => setTimeout(r, 800));

    // FASE 4 & 5: Gerar Canvas e PDF
    const canvases = await generateCanvasSlices(clone, scale);
    
    const pdf = new jsPDF(orientation, 'mm', format);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    for (let i = 0; i < canvases.length; i++) {
      const canvas = canvases[i];
      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      let heightLeft = imgHeight;
      let position = 0;

      // Se for a primeira fatia de um conjunto e não for a primeira página do PDF
      if (i > 0) pdf.addPage();

      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;

      // Só adiciona novas páginas se a imagem for realmente maior que a página
      // (Evita páginas em branco em certificados de página única)
      while (heightLeft > 1) { // 1mm de margem de erro
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pdfHeight;
      }
    }

    pdf.save(filename);

  } finally {
    // Limpeza
    document.body.removeChild(container);
  }
}
