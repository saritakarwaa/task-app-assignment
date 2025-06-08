Task Management App with Vector Search

A full-stack task manager that allows users to create, read, delete, and semantically search tasks using vector embeddings via pgvector. Built with **PostgreSQL**, **pgvector**, **Node.js**, **Express**, **React**, **Tailwind CSS**, and **Docker**.

---

🚀 Features

- ✅ **Task CRUD**: Create, Read, and Delete tasks
- 🔍 **Semantic Search**: Find similar tasks by meaning using vector search (via Sentence Transformers + pgvector)
- 🎨 **Modern UI**: Responsive design built with Tailwind CSS
- 🐳 **Containerized**: Docker support for seamless deployment
- ⚡ **PostgreSQL + pgvector**: Efficient similarity search with vector operations


---

## 🛠️ Tech Stack

### 🧠 Backend

- **Node.js**, **Express**,  **TypeScript**
- **PostgreSQL** (with `pgvector` extension)
- **pg** + **pgvector** npm packages
- **Sentence Transformers** (via Python for generating embeddings)
- **CORS**, **dotenv**

### 💻 Frontend

- **React** + **TypeScript**
- **Tailwind CSS**


### 🐳 DevOps

- **Docker** + **Docker Compose**
- **pgAdmin** 

---

---

## ⚙️ Setup Instructions

### ✅ Prerequisites

- Docker + Docker Compose installed
- Python 3.8+
- Node.js + npm

---

### 🐳 Run the App with Docker

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/task-vector-app.git
   cd task-vector-app
2. Add environment variables
Create a .env file in backend: see the .env.example file 
3.Run the app
docker compose up --build


🔎 Vector Search (Task Similarity)
🧠 How it works
Description of each task is converted into a 384-dimensional vector using Sentence Transformers.

Vectors are stored in PostgreSQL using pgvector.

When a user searches, the query is also embedded and compared with stored vectors using cosine similarity.

🐍 Python Embedding Service
Example (used in backend or as microservice):

python
Copy
Edit
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')

def get_embedding(text: str):
    return model.encode(text).tolist()
🧪 Sample SQL for Vector Search
sql
Copy
Edit
SELECT id, title, description, status
FROM tasks
ORDER BY embedding <-> '[query_embedding_here]'
LIMIT 3;


