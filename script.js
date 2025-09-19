window.onload = function () {
  // Elementos principais
  const chatForm = document.getElementById("chatForm");
  const userMessageInput = document.getElementById("userMessage"); // Use o id correto do input!
  const chatContainer = document.querySelector(".chat-container");
  const loadingAnimation = document.querySelector(".loading-animation");
  const emptyText = document.querySelector(".empty-text");
  const warningOverlay = document.getElementById("warning");

  // Lista de palavras proibidas
  const proibidas = ['xingamento1', 'xingamento2', 'palavraproibida', 'sexo', 'palavraimpropria'];
  let avisoCount = 0;

  // Função para exibir mensagem (com animação)
  function displayMessage(message, isUser) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", isUser ? "sent" : "received");
    messageDiv.textContent = message;
    chatContainer.appendChild(messageDiv);
    setTimeout(() => messageDiv.classList.add("show"), 100);

    // Rolar até a última mensagem
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  // Função para mostrar animação de loading e texto vazio
  function showLoadingThenEmpty() {
    // Remove mensagens existentes
    const messages = document.querySelectorAll(".message");
    messages.forEach((msg) => (msg.style.display = "none"));
    loadingAnimation.style.display = "block";

    // Após 4s, mostra texto vazio
    setTimeout(() => {
      loadingAnimation.style.display = "none";
      emptyText.style.display = "block";
    }, 4000);
  }

  // Função para mostrar overlay de aviso
  function showWarning() {
    warningOverlay.style.display = "flex";
    setTimeout(() => {
      warningOverlay.style.display = "none";
    }, 5000);
  }

  // Função para chamar API (simulada/cohere)
  async function getCohereResponse(message) {
    // API real (descomente para usar de verdade)
    /*
    const response = await fetch('https://api.cohere.ai/v1/chat', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer pREbPYxvCDNEV4PDVEneXTWreFjhZVUNaHX5yShX',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: message,
        model: 'command-r-08-2024',
        preamble: `Seu preâmbulo aqui...`,
        chatHistory: [{ role: "USER", message: message }]
      })
    });
    const data = await response.json();
    return data.text || "Desculpe, não consegui entender.";
    */
    // Simulação para testes:
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Cara, você num tem nem certez aqse ela qer te dar n");
      }, 1500);
    });
  }

  // Evento principal do formulário
  chatForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const userMessage = userMessageInput.value.trim();
    if (!userMessage) return;

    // Filtro de palavras proibidas
    const msgLower = userMessage.toLowerCase();
    if (proibidas.some(palavra => msgLower.includes(palavra))) {
      avisoCount++;
      showWarning();
      if (avisoCount >= 5) {
        alert("Você foi banido por 5 dias devido a comportamento impróprio.");
        userMessageInput.disabled = true;
        chatForm.querySelector("button").disabled = true;
      }
      return;
    }

    // Exibe mensagem do usuário
    displayMessage(userMessage, true);
    userMessageInput.value = "";

    // Exibe animação de loading
    loadingAnimation.style.display = "block";

    try {
      // Obtem resposta do bot
      const botResponse = await getCohereResponse(userMessage);
      displayMessage(botResponse, false);
    } catch (error) {
      displayMessage("Desculpe, houve um erro. Tente novamente.", false);
    }

    // Esconde animação
    loadingAnimation.style.display = "none";
  });

  // Se quiser mostrar loading+empty após X tempo (exemplo: ao abrir página)
  // showLoadingThenEmpty();
};