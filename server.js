const chatForm = document.getElementById('chatForm');
const userMessageInput = document.getElementById('userMessage');
const chatContainer = document.getElementById('chatContainer');
const typingIndicator = document.getElementById('typingIndicator');

function appendMessage(text, type) {
    const div = document.createElement('div');
    div.className = `message ${type}`;
    div.innerHTML = text.replace(/\n/g, '<br>');
    chatContainer.appendChild(div);
    setTimeout(() => div.classList.add('show'), 60);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function showTyping() { typingIndicator.style.display = 'block'; }
function hideTyping() { typingIndicator.style.display = 'none'; }

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const mensagem = userMessageInput.value.trim();
    if (!mensagem) return;

    appendMessage(mensagem, 'sent');
    userMessageInput.value = '';
    showTyping();

    try {
        const resposta = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: mensagem })
        });
        const dados = await resposta.json();
        hideTyping();

        if (dados.reply) {
            appendMessage(dados.reply, 'received');
        } else {
            appendMessage("⚠️ Erro na resposta da IA", 'received');
        }
    } catch (err) {
        hideTyping();
        appendMessage("❌ Erro ao conectar com o servidor", 'received');
    }
});
