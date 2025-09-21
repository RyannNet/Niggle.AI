from flask import Flask, request, jsonify, send_from_directory
import os
import requests

app = Flask(__name__, static_folder=".")

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message", "")

    try:
        response = requests.post(
            "https://api-que-tu-usa.com/chat",
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {os.environ.get('API_KEY')}"
            },
            json={"message": message}
        )
        res_data = response.json()
        return jsonify({"reply": res_data.get("reply", "Sem resposta da API.")})
    except Exception as e:
        print(e)
        return jsonify({"reply": "Erro ao conectar na API."}), 500

@app.route("/<path:filename>")
def static_files(filename):
    return send_from_directory(".", filename)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 3000))
    app.run(host="0.0.0.0", port=port)
