# LLMa
Fullstack AI Solutions Development Framework Large Language Models AI

# LLMa.php

**LLMa.php** is a unified, enterprise-ready, single-file PHP framework for building production LLM, RAG, vector search, and micro web applications.  
It combines a minimal microframework (routing, SleekDB JSON NoSQL, views) with a comprehensive, extensible AI backend supporting OpenAI, Anthropic, Ollama, Google Gemini, Cohere, Mistral, and more—plus advanced RAG, vector DB, evaluation, and full Docker/cloud deployment.

---

## 🚀 Features

- **Minimal Microframework**: Routing, views, SleekDB NoSQL, auto .htaccess, auto folder setup.
- **Seamless LLM & RAG**: 
  - Chat: OpenAI, Anthropic, Ollama, Gemini (Google), Cohere, Mistral
  - Embeddings: OpenAI, Ollama, Gemini, Cohere
  - Vision: OpenAI, Gemini (image-to-text)
- **Enterprise Vector Stores**: Memory, SQLite, PostgreSQL, Redis, File/JSON, Elasticsearch
- **Advanced RAG Pipeline**: 
  - Document loading & splitting
  - Reranking, multi-query, semantic chunking, metadata filtering
- **Function Calling/Tools**: OpenAI-style function calling with automatic parameter validation
- **Security**: Prompt injection detection, input validation, file type checks
- **Performance**: Caching (memory, file, Redis), batch processing, rate limiting, retries
- **Observability**: Rotating logs, health checks, metrics endpoint
- **Evaluation**: String similarity (ROUGE, BLEU), semantic similarity (cosine)
- **Deployment**: Docker, Kubernetes, and cloud-ready
- **Extensible**: Add providers, tools, routes, vector backends easily

---

## 📦 Installation

1. **Clone or copy `LLMa.php`** into your project directory.
2. *(Optional)* Copy the provided `Dockerfile` for containerized deployment.
3. *(Optional)* Create a `.env` file to store your API keys and config.

---

## ⚡ Quick Start

### 1. Run with PHP's built-in server

```bash
php -S localhost:8000
```
Open http://localhost:8000 in your browser for the default home page.

### 2. Use in PHP scripts

```php
require_once 'LLMa.php';

// Simple chat with OpenAI
$chat = new LlamaChat('openai', 'gpt-4-turbo');
echo $chat->ask('What is retrieval augmented generation?');

// Vector search (RAG)
$rag = new LlamaRAG('openai', 'openai', 'memory');
$rag->loadText('The capital of France is Paris.');
echo $rag->ask('What is the capital of France?');
```

### 3. REST API Example

```php
$app = new LLMaMicroApp();
$app->get('/api/ask', function() use ($app) {
    $q = $_GET['q'] ?? '';
    $chat = new LlamaChat('openai');
    header('Content-Type: application/json');
    echo json_encode(['answer' => $chat->ask($q)]);
});
$app->listen();
```

---

## 🔌 Configuring Providers

Set your API keys in a `.env` file or directly in your code:

```
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_API_KEY=AIza...
COHERE_API_KEY=...
MISTRAL_API_KEY=...
```

Or use:

```php
LlamaConfig::set('api_keys.openai', 'sk-...');
LlamaConfig::set('api_keys.gemini', '...');
```

Default models, URLs, and embedding models can be edited in the `LlamaConfig` class.

---

## 🧠 Advanced Usage

### RAG with PostgreSQL

```php
$rag = new LlamaRAG('openai', 'openai', 'postgresql', [
    'host' => 'db',
    'port' => 5432,
    'database' => 'llama',
    'username' => 'llama',
    'password' => 'secret',
]);
$rag->loadDirectory('/path/to/docs');
echo $rag->ask('What are the docs about?');
```

### Function Calling (Tools)

```php
$tool = new LlamaFunctionTool('sum', 'Add two numbers', [
    new LlamaFunctionParameter('a', 'integer', 'First number'),
    new LlamaFunctionParameter('b', 'integer', 'Second number')
], fn($args) => $args['a'] + $args['b']);

$chat = new LlamaChat('openai');
$chat->addTool($tool);
echo $chat->ask('What is 2 plus 3?');
```

### Vision (Image-to-Text)

```php
$desc = LlamaVision::describeImage('/path/to/image.png', 'openai');
echo $desc;
```

### Evaluation

```php
$eval = new LlamaStringComparisonEvaluator();
print_r($eval->evaluate("Paris is the capital of France", "The capital of France is Paris"));
```

---

## 🐳 Docker & Deployment

1. Copy the Dockerfile from the repo root.
2. Build & run:

```bash
docker build -t llma-php .
docker run -p 8080:8080 llma-php
```
Visit [http://localhost:8080](http://localhost:8080).

### Kubernetes, Cloud, & Scaling

- Use the Docker image in Kubernetes, Heroku, AWS ECS, or any container platform.
- For persistent data (vector stores, uploads), mount volumes or use hosted DBs.

---

## 🛡️ Security & Production

- Input validation and prompt injection detection enabled by default.
- Use HTTPS and a reverse proxy (Nginx/Apache) for SSL and routing.
- Configure logging, monitoring, and API limits for production.

---

## 📑 Feature Comparison

| Feature            | Status                   |
|--------------------|-------------------------|
| Microframework     | ✅ Jogu/LLMaMicroApp     |
| LLM Providers      | ✅ OpenAI, Anthropic, ...|
| Vector Stores      | ✅ Memory, SQLite, PGSQL |
| Embeddings         | ✅ OpenAI, Cohere, ...   |
| Vision             | ✅ OpenAI, Gemini        |
| RAG Pipeline       | ✅                       |
| Function Calling   | ✅                       |
| Security           | ✅                       |
| Logging/Monitoring | ✅                       |
| Docker/K8s         | ✅                       |
| README/Docs        | ✅                       |

---

## 🤝 Community & Support

- Project: [https://github.com/johnmahugu/LLMa](https://github.com/johnmahugu/LLMa)
- Raise issues or PRs for bugs, features, or questions.
- Dedicated to יהוה (YHWH) - the Eternal One.

---

## 👋 License

MIT License

---

**LLMa.php**: All-in-one PHP LLM, RAG, vector DB, and web framework.  
Ready for production, research, and rapid prototyping.

