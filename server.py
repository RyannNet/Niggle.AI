from flask import Flask, request, jsonify
import cohere
import os

app = Flask(__name__)
co = cohere.Client(os.environ.get("COHERE_API_KEY"))

SYSTEM_PROMPT = "Você é um assistente engraçado e direto. Responda sempre de forma curta e clara."

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message")
    if not user_message:
        return jsonify({"reply": "Mensagem vazia."}), 400
    try:
        prompt = f"{SYSTEM_PROMPT}\nUsuário: {user_message}\nAssistente:"
        response = co.generate(
            model="xlarge",  # modelo da Cohere
            prompt=prompt,
            max_tokens=100
        )
        return jsonify({"reply": response.generations[0].text.strip()})
    except Exception as e:
        print(e)
        return jsonify({"reply": "Erro ao conectar na API."}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
