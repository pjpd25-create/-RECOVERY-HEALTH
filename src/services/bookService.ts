export interface BookContent {
  chapterTitle: string;
  text: string;
  footerNote?: string;
}

export async function generateBookPage(
  title: string,
  author: string,
  pageNumber: number,
  category: string
): Promise<BookContent> {
  try {
    const response = await fetch("/api/book/page", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, author, pageNumber, category }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch book page");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching book page:", error);
    return {
      chapterTitle: "Interrupção na Transmissão",
      text: "Lamentamos, mas houve uma falha na ligação aos servidores de alta velocidade do Armário PedroJoaquim. Verifique a sua ligação à internet ou tente novamente mais tarde.",
      footerNote: "Erro de Conexão com o Servidor"
    };
  }
}
