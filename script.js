window.onload = function() {
  const chatForm = document.getElementById("chatForm");
  const userMessageInput = document.getElementById("userMessage");
  const chatContainer = document.querySelector(".chat-container");
  const warningOverlay = document.getElementById("warning");
  
  let loadingAnimation = document.querySelector(".loading-animation");
  let emptyText = document.querySelector(".empty-text");
  
  if (!loadingAnimation) {
    loadingAnimation = document.createElement("div");
    loadingAnimation.className = "loading-animation";
    chatContainer.appendChild(loadingAnimation);
  }
  if (!emptyText) {
    emptyText = document.createElement("div");
    emptyText.className = "empty-text";
    emptyText.textContent = "Nenhuma mensagem por aqui...";
    chatContainer.appendChild(emptyText);
  }
  
  const proibidas = ['xingamento1', 'xingamento2', 'palavraproibida', 'sexo', 'palavraimpropria'];
  let avisoCount = 1;
  
  function displayMessage(message, isUser) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", isUser ? "sent" : "received");
    messageDiv.textContent = message;
    chatContainer.appendChild(messageDiv);
    setTimeout(() => messageDiv.classList.add("show"), 100);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
  
  function showWarning() {
    if (!warningOverlay) return;
    warningOverlay.style.display = "flex";
    setTimeout(() => {
      warningOverlay.style.display = "none";
    }, 5000);
  }
  
  async function getCohereResponse(userMessage) {
    try {
      const res = await fetch("https://niggle-ai.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage })
      });
      const data = await res.json();
      return data.reply || "Sem resposta no momento.";
    } catch (err) {
      return "Erro ao conectar com a API.";
    }
  }
  
  chatForm.addEventListener("submit", async function(e) {
    e.preventDefault();
    const userMessage = userMessageInput.value.trim();
    if (!userMessage) return;
    
    const msgLower = userMessage.toLowerCase();
    if (proibidas.some(palavra => msgLower.includes(palavra))) {
      avisoCount++;
      showWarning();
      if (avisoCount >= 5) {
        alert("Você foi banido por 5 dias devido a comportamento imprópria.");
        userMessageInput.disabled = true;
        chatForm.querySelector("button").disabled = true;
      }
      return;
    }
    
    displayMessage(userMessage, true);
    userMessageInput.value = "";
    
    loadingAnimation.style.display = "block";
    emptyText.style.display = "none";
    
    const botResponse = await getCohereResponse(userMessage);
    displayMessage(botResponse, false);
    
    loadingAnimation.style.display = "none";
  });
};
