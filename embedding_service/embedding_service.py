from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = SentenceTransformer('all-MiniLM-L6-v2')

@app.route("/embedding", methods=["POST"])
def generate_embedding():
    data = request.json
    text = data.get("text", "")
    embedding = model.encode(text).tolist()
    return jsonify({"embedding": embedding})

if __name__ == "__main__":
    app.run(port=5000)
