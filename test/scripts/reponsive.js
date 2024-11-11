// Executa o código quando o conteúdo HTML da página estiver totalmente carregado
document.addEventListener("DOMContentLoaded", () => {
  // Seleciona o parágrafo onde será exibido o texto "Sobre Mim"
  const aboutParagraphElement = document.getElementById("aboutMeParagraph");

  // Seleciona os botões de idioma (português e inglês)
  const ptButton = document.getElementById("ptButton");
  const enButton = document.getElementById("enButton");

  // Carrega o conteúdo inicial em português ao carregar a página
  fetchContent().then((data) => {
    // Verifica se existe conteúdo em português no JSON
    if (data.pt && data.pt.aboutMeParagraph) {
      // Define o conteúdo do parágrafo com o texto em português
      aboutParagraphElement.innerHTML = data.pt.aboutMeParagraph;
    }
  });

  // Adiciona um evento de clique ao botão de português
  ptButton.addEventListener("click", () => {
    // Busca o conteúdo do JSON e exibe o texto em português
    fetchContent().then((data) => {
      if (data.pt && data.pt.aboutMeParagraph) {
        aboutParagraphElement.innerHTML = data.pt.aboutMeParagraph;
      }
    });
  });

  // Adiciona um evento de clique ao botão de inglês
  enButton.addEventListener("click", () => {
    // Busca o conteúdo do JSON e exibe o texto em inglês
    fetchContent().then((data) => {
      if (data.en && data.en.aboutMeParagraph) {
        aboutParagraphElement.innerHTML = data.en.aboutMeParagraph;
      }
    });
  });
});

// Função que busca o conteúdo do arquivo JSON
async function fetchContent() {
  try {
    // Faz uma requisição para o arquivo JSON na pasta 'scripts'
    const response = await fetch("scripts/content.json");

    // Verifica se a requisição foi bem-sucedida
    if (!response.ok) {
      throw new Error("Erro ao buscar o arquivo JSON."); // Exibe um erro se a requisição falhar
    }

    // Converte a resposta em um objeto JSON e retorna
    const data = await response.json();
    return data;
  } catch (error) {
    // Exibe o erro no console caso ocorra algum problema
    console.error("Erro:", error);
    return {}; // Retorna um objeto vazio se houver erro
  }
}
