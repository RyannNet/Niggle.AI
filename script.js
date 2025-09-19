window.onload = function () {
  // Elementos principais
  const chatForm = document.getElementById("chatForm");
  const userMessageInput = document.getElementById("userMessage");
  const chatContainer = document.querySelector(".chat-container");
  const warningOverlay = document.getElementById("warning");

  // Elementos de animação (criados só pelo JS)
  let loadingAnimation = document.querySelector(".loading-animation");
  let emptyText = document.querySelector(".empty-text");

  // Criar animação de loading se não existe
  if (!loadingAnimation) {
    loadingAnimation = document.createElement("div");
    loadingAnimation.className = "loading-animation";
    chatContainer.appendChild(loadingAnimation);
  }
  // Criar texto vazio se não existe
  if (!emptyText) {
    emptyText = document.createElement("div");
    emptyText.className = "empty-text";
    emptyText.textContent = "Nenhuma mensagem por aqui...";
    chatContainer.appendChild(emptyText);
  }

  // Lista de palavras proibidas
  const proibidas = ['xingamento1', 'xingamento2', 'palavraproibida', 'sexo', 'palavraimpropria'];
  let avisoCount = 0;

  // Função para exibir mensagem no chat
  function displayMessage(message, isUser) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", isUser ? "sent" : "received");
    messageDiv.textContent = message;
    chatContainer.appendChild(messageDiv);
    setTimeout(() => messageDiv.classList.add("show"), 100);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  // Função para mostrar animação de loading e depois texto vazio
  function showLoadingThenEmpty() {
    // Esconde todas as mensagens
    document.querySelectorAll(".message").forEach(msg => msg.style.display = "none");
    loadingAnimation.style.display = "block";
    emptyText.style.display = "none";
    setTimeout(() => {
      loadingAnimation.style.display = "none";
      emptyText.style.display = "block";
    }, 4000);
  }

  // Função para mostrar aviso de banimento
  function showWarning() {
    if (!warningOverlay) return;
    warningOverlay.style.display = "flex";
    setTimeout(() => {
      warningOverlay.style.display = "none";
    }, 5000);
  }

  // Função para simular resposta da IA
  async function getCohereResponse(message) {
    // Aqui vai sua chamada real da API, se quiser.
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("Cara, você num tem nem certez aqse ela qer te dar n");
      }, 1500);
    });
  }

  // Evento de envio do chat
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
    emptyText.style.display = "none";

    try {
      const botResponse = await getCohereResponse(userMessage);
      displayMessage(botResponse, false);
    } catch (error) {
      displayMessage("Desculpe, houve um erro. Tente novamente.", false);
    }

    loadingAnimation.style.display = "none";
  });

  // Opcional: Exibir animação/loading+empty ao abrir a página
  // showLoadingThenEmpty();
};