window.onload = function () {
    const messages = document.querySelectorAll(".message");
    const loadingAnimation = document.querySelector(".loading-animation");
    const emptyText = document.querySelector(".empty-text");

    // Remover mensagens e mostrar animação
    setTimeout(() => {
      messages.forEach((msg) => (msg.style.display = "none"));
      loadingAnimation.style.display = "block";
    }, 4000);

    // Substituir animação pelo texto vazio
    setTimeout(() => {
      loadingAnimation.style.display = "none";
      emptyText.style.display = "block";
    }, 8000); // 4 segundos para animação + 4 segundos para exibição do texto
  };
  
  window.onload = function() {
  const messages = document.querySelectorAll(".message");
  const loadingAnimation = document.querySelector(".loading-animation");
  const emptyText = document.querySelector(".empty-text");

  // Remover mensagens e mostrar animação
  setTimeout(() => {
    messages.forEach((msg) => (msg.style.display = "none"));
    loadingAnimation.style.display = "block";
  }, 1);

  // Substituir animação pelo texto vazio
  setTimeout(() => {
    loadingAnimation.style.display = "none";
    emptyText.style.display = "block";
  }, 8000); // 4 segundos para animação + 4 segundos para exibição do texto
};

window.onload = function() {
  const chatForm = document.getElementById("chatForm");
  const messageInput = document.getElementById("messageInput");
  const chatContainer = document.querySelector(".chat-container");
  const loadingAnimation = document.querySelector(".loading-animation");
  const emptyText = document.querySelector(".empty-text");

  // Lidar com o envio do formulário
  chatForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evitar o comportamento padrão do formulário

    const userMessage = messageInput.value;
    messageInput.value = ""; // Limpar o campo de input

    // Exibir a mensagem do usuário
    addMessage(userMessage, "sent");

    // Exibir animação de carregamento
    loadingAnimation.style.display = "block";

    // Esperar pela resposta da IA (exemplo simples)
    const botResponse = await sendMessageToCohere(userMessage);

    // Esconder animação e exibir a resposta do bot
    loadingAnimation.style.display = "none";
    addMessage(botResponse, "received");
  });

  // Função para adicionar mensagens com animação de fade
  function addMessage(message, role) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", role);
    messageDiv.textContent = message;
    chatContainer.appendChild(messageDiv);

    // Adicionar a classe para animação de fade
    setTimeout(() => {
      messageDiv.classList.add("show");
    }, 100);
  }

  // Função para enviar mensagem para a API (simulada)
  async function sendMessageToCohere(message) {
    // Aqui você faria a chamada à API, por enquanto, só vamos retornar uma resposta simulada
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Cara, você num tem nem certez aqse ela qer te dar n");
      }, 1500); // Simula o tempo de resposta da IA
    });
  }
};


window.onload = function() {
  const form = document.getElementById('chatForm');
  const userMessageInput = document.getElementById('userMessage');
  const chatContainer = document.querySelector('.chat-container');
  const loadingAnimation = document.querySelector('.loading-animation');
  const emptyText = document.querySelector('.empty-text');

  // Função para exibir a mensagem com animação
  function displayMessage(message, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', isUser ? 'sent' : 'received');
    messageDiv.textContent = message;

    chatContainer.appendChild(messageDiv);
    setTimeout(() => {
      messageDiv.classList.add('show'); // Aplicar a animação de fade
    }, 100); // Atraso para animar

    chatContainer.scrollTop = chatContainer.scrollHeight; // Rolar até a última mensagem
  }

  // Função para chamar a API do Cohere e obter a resposta
  async function getCohereResponse(message) {
    const response = await fetch('https://api.cohere.ai/v1/chat', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer pREbPYxvCDNEV4PDVEneXTWreFjhZVUNaHX5yShX',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: message,
        model: 'command-r-08-2024',
        preamble: `Um pouco analfabeto, erra ortografia. Sempre engraçado e zoeiro, brinca com tudo\nUsuário — Mano, eu peguei o celular da mão de uma mulherr e sai correndo, ela agora está correndo atrás de mim, ela quer me dar?\n"KKK, sim mano ela quer."\nSempre informal, nunca formal:\nPprt, orra, slk, que viagem, viado(" slk, viado"), vtmnc, kk, kkkk, KAKAKAKA, ela quer muça."\nAnalfabeto, Fala humana como:\n"Viado, muito eu: "\n"Não me diga"\n"VSFDKKK"\n"orra slk"\n{Fala de uma mulher gostosa ou bonita}\n"Slk mané, era dento"\n\n(NÃO É RESPEITOSO)\n(Algumas vezes usa emojis para não ficar tão morto)\n(Não menciona zoeira, apenas faz a zoeira sem mencionar toda hora que isso é uma zoeira, brincadeira).\n\ninformal, Brasileiro, Masculino, Idade: 21, usa gírias, um pouco analfabeto, gosta de mulheres, gosta de resenhar com usuários sem limites ou filtros, resenha,ironiza, brincalhão fala do jeito humano (textos simples respostas simples)\n\n(Não fala que é zoeira)\n(Humor-Negro, )\n (entend que muitos ou dois K é risada "KK" "KKKKKK" \n se um usuário começar a falar muitas coisas erradas, gore, sexo, fputaria, ele começa a repreender o usuário até banir ele desse chat para criar um novo chat.`,
        chatHistory: [
          {
            role: "USER",
            message: message
          }
        ]
      })
    });

    const data = await response.json();
    return data.text || 'Desculpe, não consegui entender.';
  }

  // Evento de submit do formulário
  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const userMessage = userMessageInput.value;
    if (userMessage.trim()) {
      // Exibir a mensagem do usuário
      displayMessage(userMessage, true);

      // Limpar o campo de input
      userMessageInput.value = '';

      // Exibir animação de carregamento
      loadingAnimation.style.display = 'block';

      try {
        // Obter a resposta do Cohere
        const botResponse = await getCohereResponse(userMessage);
        // Exibir a resposta do bot
        displayMessage(botResponse, false);
      } catch (error) {
        loadingAnimation.style.display = 'none';
        displayMessage('Desculpe, houve um erro. Tente novamente.', false);
      }

      // Esconder a animação de carregamento
      loadingAnimation.style.display = 'none';
    }
  });
};


const proibidas = ['xingamento1', 'xingamento2', 'palavraproibida', 'sexo', 'palavraimpropria'];

let avisoCount = 0; // Contador de avisos

document.getElementById('chatForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Impede o envio do formulário

  const userMessage = document.getElementById('userMessage').value.toLowerCase();

  // Verifica se a mensagem contém palavras proibidas
  const contemPalavraProibida = proibidas.some(palavra => userMessage.includes(palavra));

  if (contemPalavraProibida) {
    avisoCount++; // Incrementa o contador de avisos
    showWarning(); // Exibe o aviso

    if (avisoCount >= 5) {
      // Aqui você pode adicionar lógica para banir o usuário, caso atinja 5 avisos
      alert('Você foi banido por 5 dias devido a comportamento impróprio.');
    }
  }
});

function showWarning() {
  const warningOverlay = document.getElementById('warning');
  warningOverlay.style.display = 'flex'; // Exibe o aviso

  setTimeout(() => {
    warningOverlay.style.display = 'none'; // Esconde o aviso após 5 segundos
  }, 5000); // Tempo que o aviso ficará visível
}
