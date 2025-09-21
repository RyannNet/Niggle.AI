from flask import Flask, request, jsonify
import time

app = Flask(__name__)
last_message_time = 0
COOLDOWN = 3  # segundos

@app.route("/api/chat", methods=["POST"])
def chat():
    global last_message_time
    now = time.time()
    if now - last_message_time < COOLDOWN:
        return jsonify({"reply": f"Espera {COOLDOWN - int(now - last_message_time)}s antes de mandar outra mensagem!"})
    last_message_time = now
    return jsonify({"reply": "Resposta do bot aqui..."})

if __name__ == "__main__":
    app.run()
