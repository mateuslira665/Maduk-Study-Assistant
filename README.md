# Maduk Study Assistant

O **Maduk Study Assistant** é uma aplicação web voltada para estudos.

O sistema utiliza Inteligência Artificial para transformar textos em:

- Resumos
- Flashcards
- Mini-quizzes

## Problemas identificados

### 1. Retorno JSON incorreto da IA

A API de Inteligência Artificial pode retornar informações fora do padrão JSON esperado.

Isso pode causar erros no frontend e impedir a exibição dos flashcards e quizzes.

### Solução

No backend:

- Validar o JSON recebido.
- Utilizar `try/except`.
- Utilizar Pydantic para validar os dados.
- Trabalhar com respostas JSON estruturadas da API.

---

### 2. Múltiplos cliques no botão Gerar

A resposta da IA pode levar alguns segundos.

Nesse tempo, o usuário pode clicar várias vezes no botão **Gerar Material**, causando várias requisições ao backend.

Isso pode gerar:

- Requisições duplicadas.
- Maior consumo de tokens.
- Sobrecarga da API.
- Conteúdo duplicado.

### Solução

No frontend:

- Criar um estado `isLoading`.
- Desabilitar o botão durante a requisição.
- Exibir um spinner de carregamento.
- Liberar o botão após a resposta da API.

Exemplo:

```javascript
const [isLoading, setIsLoading] = useState(false);