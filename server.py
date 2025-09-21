from flask import Flask, request, jsonify, send_from_directory
import os
import cohere

app = Flask(__name__, static_folder=".")

co = cohere.Client(os.environ.get("COHERE_API_KEY"))

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message", "")

    try:
        response = co.chat(
            model="xlarge",
            messages=[{"role": "user", "content": message}]
        )
        return jsonify({"reply": response.output_text})
    except Exception as e:
        print(e)
        return jsonify({"reply": "Erro ao conectar na API."}), 500

@app.route("/<path:filename>")
def static_files(filename):
    return send_from_directory(".", filename)

@app.route("/")
def index():
    return send_from_directory(".", "index.html")

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 3000))
    app.run(host="0.0.0.0", port=port)
