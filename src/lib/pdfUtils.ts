/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Utilitário universal para converter cores modernas do CSS em RGB/RGBA compatível com html2canvas.
 * Resolve problemas com oklch(), lab(), lch(), color(), variáveis CSS e gradientes.
 */
export const convertAllColorsToRGB = (rootElement: HTMLElement): void => {
  // Elemento temporário para forçar o parsing de cores pelo motor do browser
  const temp = document.createElement("div");
  temp.style.display = "none";
  temp.style.visibility = "hidden";
  temp.style.position = "absolute";
  document.body.appendChild(temp);

  /**
   * Converte uma string de cor qualquer para RGB/RGBA usando o motor do browser.
   */
  const toRGB = (color: string): string => {
    if (!color || color === "transparent" || color === "rgba(0, 0, 0, 0)") return "rgba(0,0,0,0)";
    
    // Se já for RGB/RGBA, retorna diretamente para performance
    if (color.startsWith("rgb(") || color.startsWith("rgba(")) return color;

    // Tratamento de Gradientes: html2canvas crasha com gradientes complexos ou cores modernas em gradientes.
    // Extraímos a primeira cor válida como fallback sólido.
    if (color.includes("-gradient(")) {
      // Regex para encontrar a primeira cor (hex, rgb, oklch, etc) dentro do gradiente
      const colorMatch = color.match(/(?:rgb|rgba|oklch|oklab|lab|lch|color|#)\([^)]+\)|#[a-fA-F0-9]+/);
      if (colorMatch) return toRGB(colorMatch[0]);
      return "rgba(0,0,0,0)"; 
    }

    try {
      // Atribuímos ao elemento temporário e deixamos o browser computar o valor real (sempre em RGB/RGBA)
      temp.style.color = color;
      const computed = window.getComputedStyle(temp).color;
      
      // Fallback defensivo se o browser não conseguir parsear
      if (!computed || (computed === "rgba(0, 0, 0, 0)" && color !== "transparent")) {
        return "#000000";
      }
      return computed;
    } catch (e) {
      console.warn(`Falha ao converter cor: ${color}`, e);
      return "#000000";
    }
  };

  /**
   * Processa um elemento individualmente
   */
  const processElement = (el: HTMLElement) => {
    const style = window.getComputedStyle(el);
    
    // Lista exaustiva de propriedades que podem conter cores
    const colorProps = [
      "backgroundColor",
      "color",
      "borderColor",
      "borderTopColor",
      "borderRightColor",
      "borderBottomColor",
      "borderLeftColor",
      "outlineColor",
      "fill",
      "stroke",
      "stopColor",
      "floodColor",
      "lightingColor"
    ];

    colorProps.forEach(prop => {
      const value = (style as any)[prop];
      if (value && value !== "none") {
        const converted = toRGB(value);
        if (converted) {
          (el.style as any)[prop] = converted;
        }
      }
    });

    // Tratamento especial para background-image (Gradientes)
    if (style.backgroundImage && style.backgroundImage !== "none") {
      if (style.backgroundImage.includes("-gradient(")) {
        const fallbackColor = toRGB(style.backgroundImage);
        el.style.backgroundImage = "none";
        el.style.backgroundColor = fallbackColor;
      }
    }

    // Tratamento para box-shadow (html2canvas falha com cores modernas em sombras)
    if (style.boxShadow && style.boxShadow !== "none") {
      if (
        style.boxShadow.includes("oklch") || 
        style.boxShadow.includes("oklab") || 
        style.boxShadow.includes("lab") ||
        style.boxShadow.includes("color(")
      ) {
        // Removemos a sombra problemática para evitar crash, priorizando a integridade do PDF
        el.style.boxShadow = "none";
      }
    }
  };

  // 1. Processa o elemento raiz
  processElement(rootElement);

  // 2. Processa todos os descendentes
  const descendants = rootElement.getElementsByTagName("*");
  for (let i = 0; i < descendants.length; i++) {
    processElement(descendants[i] as HTMLElement);
  }

  // Limpeza
  document.body.removeChild(temp);
};
