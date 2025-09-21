from flask import Flask, request, jsonify
import cohere, os

app = Flask(__name__)

API_KEY = os.getenv("COHERE_API_KEY")
co = cohere.Client(API_KEY)

HTML = """
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Niggle AI - CSS Corrigido</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lexend+Giga:wght@200;400;600&family=Poppins:wght@300;400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    
    <header>
        <img src="/2073 Sem Título_20250919184018.png" alt="Logo Niggle.AI">
        <nav aria-label="Links principais">
            <a href="#" id="baixarLink">Baixar .ngl</a>
            <a href="#" id="importarLink">Importar .ngl</a>
            <a href="#" id="novidadesLink">Novidades</a>
            <a href="#" id="configLink">Config.</a>
        </nav>
    </header>

    <main class="chat-container" id="chatContainer" aria-live="polite">
        <div class="message received show">Olá, <strong>bem-vindo</strong> ao Niggle.AI!</div>
    </main>

    <footer>
        <div class="textareabtn">
        <form class="chat-input" id="chatForm" autocomplete="off" aria-label="Envio de mensagem">
            <textarea type="text" id="userMessage" placeholder="Digite sua mensagem..." maxlength="90000" required aria-label="Mensagem"></textarea>
            <button type="submit" aria-label="Enviar mensagem"><img class="send_ic" src="/1887 Sem Título_20250919194748.png"></button>
        </form>
        </div>
        <div class="typing-indicator" id="typingIndicator">Niggle está digitando...</div>
    </footer>

    <div id="configModal" class="modal" role="dialog" aria-modal="true" aria-labelledby="configModalTitle">
        <div class="modal-content">
            <h2 id="configModalTitle">Configurações</h2>
            <button onclick="closeModal('configModal')">Fechar</button>
        </div>
    </div>

    <div id="newsModal" class="modal" role="dialog" aria-modal="true" aria-labelledby="newsModalTitle">
        <div class="modal-content">
            <h2 id="newsModalTitle">Novidades</h2>
            <ul style="text-align:left; margin: 0 auto; max-width: 290px;">
                <li>Agora você pode continuar seu chat importando o .ngl</li>
                <li>Melhoria no design</li>
                <li>Correções de bugs</li>
                <li>Compatibilidade móvel</li>
            </ul>
            <button onclick="closeModal('newsModal')">Fechar</button>
        </div>
    </div>

    <div id="donationNotification">
        <p>Você gostou de usar meu projeto? Poderia me ajudar fazendo uma doação?</p>
        <p><strong>Pix:</strong> matheusnunesdevzn@gmail.com</p>
        <button onclick="closeNotification()">Fechar</button>
    </div>

</body>
<script src="script (1).js"></script>

</html>
<script>
    const resposta = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: mensagemUsuario })
});
const dados = await resposta.json();
appendMessage(dados.reply, 'received');
</script>

"""

@app.route("/")
def home():
    return HTML

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message", "")
    try:
        response = co.generate(
            model="xlarge",
            prompt=message,
            max_tokens=100
        )
        reply = response.generations[0].text
        return jsonify({"reply": reply})
    except Exception as e:
        print(e)
        return jsonify({"reply": "Erro ao conectar na API."})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
