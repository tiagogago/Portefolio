const menuLinks = document.querySelectorAll(' .menu a[href^="#"]');

function getDistanceFromTheTop(element) {
  const id = element.getAttribte("href");
  return document.querySelector(id).offsetTop;
}

function nativeScroll(distanceFromTheTop) {
  window.scrollTo({ top: distanceFromTheTop, behavior: "smooth" });
}

function scrollToSection(event) {
  event.preventDefault();
  const distanceFromTheTop = getDistanceFromTheTop(event.target) - 90;
  nativeScroll(distanceFromTheTop);
}

menuLinks.forEach((link) => {
  link.addEventListener("click", scrollToSection);
});

// Executa o código quando o conteúdo HTML da página estiver totalmente carregado
document.addEventListener("DOMContentLoaded", () => {
  // Seleciona os botões de idioma (português e inglês)
  const ptButton = document.getElementById("ptButton");
  const enButton = document.getElementById("enButton");

  // Carrega o conteúdo inicial em português ao carregar a página
  fetchContent().then((data) => {
    loadContent(data, "pt");
  });

  // Adiciona um evento de clique ao botão de português
  ptButton.addEventListener("click", () => {
    fetchContent().then((data) => {
      loadContent(data, "pt");
    });
  });

  // Adiciona um evento de clique ao botão de inglês
  enButton.addEventListener("click", () => {
    fetchContent().then((data) => {
      loadContent(data, "en");
    });
  });
});

// Função que carrega o conteúdo no HTML
function loadContent(data, language) {
  var content = data[language];

  Object.keys(content).forEach(function (key) {
    var value = content[key];
    let idElement = document.getElementById(key);

    if (idElement) {
      // se o elemento for um input adicione o valor para o place holder
      if (idElement.tagName === "INPUT" || idElement.tagName === "TEXTAREA") {
        if (key == "mensagem") {
          idElement.textContent = data[language]["textoMensagem"];
        }

        if (idElement.type === "submit") {
          idElement.value = value;
        } else {
          idElement.placeholder = value;
        }
      } else if (key == "downloadCvButton") {
        const aTag = idElement.parentElement;

        aTag.href = content["downloadCvSource"];

        idElement.innerHTML = value;
      } else {
        idElement.innerHTML = value;
      }
    }
  });
}

// Função que busca o conteúdo do arquivo JSON
async function fetchContent() {
  try {
    // Faz uma requisição para o arquivo JSON na pasta 'scripts'
    const response = await fetch("js/content.json");

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
    return {}; // Retorna um objeto vazio se houver erro
  }
}
