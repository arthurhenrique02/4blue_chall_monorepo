# Desafio 4Blue

Aplicação que simula um chatbot para testar as skills. Feito em um único repositório e com objetivo de atender aos requisitos do desafio.

### Tópicos 

:small_blue_diamond: [Tecnologias Utilizadas (requisitos)](#Tecnologias-Utilizadas-(requisitos))

:small_blue_diamond: [Como rodar?](#Como-rodar?)

:small_blue_diamond: [Fluxo](#Fluxo)

:small_blue_diamond: [Rodando aplicação](#Rodando-aplicação)

:small_blue_diamond: [Tabelas (banco de dados)](#Tabelas-(banco-de-dados))

:small_blue_diamond: [Endpoints](#Endpoints)

:small_blue_diamond: [Componentes do Frontend](#Componentes-do-Frontend)

:small_blue_diamond: [Observações gerais](#Observações-gerais)


## Tecnologias Utilizadas (requisitos)

### Backend
- Python 3.12+ ([docs](https://www.python.org/))
- Django Rest Framework ([docs](https://www.django-rest-framework.org/))
- SQLite

### Frontend
- Node 22+ ([docs](https://nodejs.org/pt))
- React ([docs](https://react.dev/))
- Vite ([docs](https://vite.dev/))
- Tailwind ([docs](https://tailwindcss.com/))

## Como rodar?

### Backend
- Para rodar o backend, primeiro é necessário abrir um terminal e mudar para a pasta
contendo os arquivos do mesmo. Para isso, no terminal, cole o comando:
    ```sh
    cd backend 
    ```
- Após mudar de pasta, crie um ambiente virtual:
    ```sh
    python -m venv .venv
    ou
    py -m venv .venv
    ```
- Com o ambiente criado, precisamos ativá-lo. Digite:
    ```sh
    source venv/bin/activate  # No windows, use: `venv\Scripts\activate`
    ```
- Após ativado, instale as dependências
    ```sh
    pip install -r requirements.txt
    ```
- Agora, devemos criar um arquivo `.env` para armazenar as credenciais, segue exemplo:
    ```
    DJ_KEY=)eeb-z-z38k%8#yk=s6*#d2c2c6hz%cbg#=cr-)y$^xo^j)a7a
    ```
    O arquivo deve conter apenas a `secret key` do Django
- Por fim, basta inicializar o servidor:
    ```sh
    python manage.py runserver
    ```
### Frontend
- Para rodar o frontend, abra um terminal e vá para a pasta do frontend:
    ```sh
    cd frontend
    ```
- Em seguida, instale as dependências:
    ```sh
    npm install
    ```
- Logo após a instalação, crie um arquivo `.env` com as seguintes informações:
    ```sh
    VITE_API_BASE=http://localhost:8000
    VITE_ARTHUR_USERNAME=Arthur
    VITE_ARTHUR_PASSWORD=admin1234!
    VITE_RAYSSA_USERNAME=Rayssa
    VITE_RAYSSA_PASSWORD=admin1234!
    ```
- Despois de criar o arquivo .env, inicie o servidor do Vite:
    ```sh
    npm run dev # recomendado para os testes
    ou 
    npm run build
    ```

Pronto, você já está pronto para acessar a aplicação. Basta acessar `http://localhost:5173`

## Fluxo
- Ao acessar a aplicação, vocês poderá escolher entre 2 usuários:
    <img width="664" height="297" alt="image" src="https://github.com/user-attachments/assets/7fb07185-13c7-4a5f-900a-074a41904bba" />

  Ao clicar em um dos usuários, a aplicação fará uma requisição para o backend em busca do token do usuário
- Com sucesso ao logar, você será redirecionado para a página do chat, onde pode iniciar uma nova conversa
    <img width="899" height="730" alt="image-1" src="https://github.com/user-attachments/assets/dd797d9f-3168-4f83-ab45-a62ee2cbcbdd" />

- inserindo o texto e clicando em 'Enviar' você será mantido na conversa que acabou de ser iniciada
    <img width="849" height="735" alt="image-2" src="https://github.com/user-attachments/assets/84f97dc9-c71e-4893-9aae-f5eb2aa3e439" />

    É possível enviar mais mensagens, ou iniciar uma nova conversa
- Também podemos verificar o histórico de conversas clicando em 'Minhas conversas', no canto superior esquerdo:
    <img width="849" height="735" alt="image-3" src="https://github.com/user-attachments/assets/b93e7b5a-7fa2-41ab-ba79-ac89851eeba6" />

- Nele você verá todas as conversas que teve em uma ordem cronológica
    <img width="918" height="316" alt="image-4" src="https://github.com/user-attachments/assets/db0a4879-ad17-4d9c-b36a-60b3ebbe546c" />

- Por fim, o botão de 'Logout' serve para você desconectar da conta
    <img width="914" height="214" alt="image-5" src="https://github.com/user-attachments/assets/9a7f9b32-5736-4808-93cb-8ad6943bafe6" />

## Tabelas (banco de dados)
    <img width="1920" height="1080" alt="tabelas" src="https://github.com/user-attachments/assets/6d17f264-acd9-402d-ac34-28119483cbda" />

### Chat
    Tabela definida para armazenar as informações dos chats criados, guardando dados como: id, usuário dono do chat e quando foi criado

### Message
    Tabela definida para armazenar informações das mensagens, trazendo um desacomplamento e maior facilidade de escalabilidade, os dados armazenados são: id, chat ao qual a mensagem pertence, quem enviou (usuário ou sistema), conteúdo e quando foi criada

#### Observações:
- O id para o Chat foi definido como um uuid padrão por questões de segurança, devido sua natureza não sequencial e 'aleatória' e também para uma maior flexibilidade na criação, podendo ser exposto de uma maneira mais segura.
- Foi escolhido duas tabelas separadas para que dados fossem mantidos de uma maneira mais consistente, desacoplando o possível alto fluxo de mensagens para poucos chats. Dessa forma, pode-se analisar informações mais rápido e manter a tabela de chat 'desafogada'.

## Endpoints
- `POST /api/auth/` — Obter token de autenticação (DRF Token Auth).
  - Payload: 
    ```json
    { 
        "username": "...",
        "password": "..." 
    }
    ```
  - Resposta: 
    ```json
    { "token": "<token>" }
    ```
  - Uso: envia o token de autenticação do usuário
- `GET /api/chat/history/` — Listar chats do usuário autenticado.
  - Resposta: 
    ```json
    [
        {
            "id": "...",
            "timestamp": "2025-12-25T21:53:47.413654Z"
        }
    ]
    ```
- `GET /api/chat/history/{pk}/` — Recuperar um chat específico com suas mensagens.
  - Resposta: 
    ```json
    {
        "chat": {
        "id": "00000000-0000-0000-0000-000000000000",
        "timestamp": "2025-11-25T21:53:47.413654Z"
        },
        "messages": [
        {
            "sender": "U",
            "content": "Olá! Como posso ajudar?",
            "timestamp": "2025-11-25T21:54:00.000000Z"
        }
        ]
    }
    ```
  - Erro: `404` com `{ "error": "Chat not found." }` caso o chat não pertença ao usuário ou não foi encontrado.
- `POST /api/chat/messages/` — Enviar mensagem (cria mensagem do usuário e resposta automática).
  - Payload:
    ```json
    {
        "message": "Olá, preciso de ajuda",
        "chat_id": "00000000-0000-0000-0000-000000000000"  
    }
    ```
  - Ou sem `chat_id` (cria um novo chat):
    ```json
    {
        "message": "Olá, preciso de ajuda"
    }
    ```
  - Comportamento: se `chat_id` informado adiciona ao chat, senão cria um novo `Chat`.
  - Respostas automáticas: o backend cria duas mensagens em `bulk_create` (a do usuário e a resposta padrão do sistema/bo).
  - Resposta (201):
    ```json
    {
        "chat_id": "00000000-0000-0000-0000-000000000000",
        "messages": [
        {
            "sender": "U",
            "content": "Olá, preciso de ajuda",
            "timestamp": "2025-11-25T21:54:00.000000Z"
        },
        {
            "sender": "B",
            "content": "Obrigado por seu contato, Arthur. Em breve responderemos.",
            "timestamp": "2025-11-25T21:54:01.000000Z"
        }
        ]
    }
    ```
  - Erros: `400` quando `message` vazio; `404` se `chat_id` inválido ou chat não pertencer ao usuário ou não encontrado.

## Componentes do Frontend
- ### Páginas
  - **Login.jsx**: página inicial com botões para login automático de usuários pré-configurados via variáveis de ambiente.
  - **Chat.jsx**: interface principal do chat - exibe mensagens, Input e envia mensagens para `POST /api/chat/messages/` quando clica em Enviar.
  - **History.jsx**: lista históricos de chats carregados de `GET /api/chat/history/`; é possível verificar a mensagem de cada chat ao clicar no mesmo.
- ### Componentes reutilizáveis
  - **Button.jsx**: botão estilizado usado pela UI.
  - **Input.jsx**: input controlado simples com callback `onChange` e `onKeyDown`.
  - **Message.jsx**: renderiza uma mensagem; determina se é do usuário (`sender === 'U'`) para alinhar/estilizar diferente.
  - **Navbar.jsx**: barra superior com links para 'Chat' e 'Minhas conversas' e botão de 'Logout' (limpa token e redireciona).
  - **Toast.jsx**: provider de toasts (`ToastProvider`) e hook `useToast()` para exibir notificações temporárias.
- ### Serviços
  - **api.js**: cria cliente Axios com e injeta a autenticação para conexão com o backend.
  - **auth.js**: realiza o trâmite de autenticação (login e logout).

#### Observações
- Mesmo utilizando dois usuários existentes e mockados, o login ainda faz uma requisição para a API afim de conseguir o token. Isso ocorre para uma simulação melhor de como seria feito em um ambiente real, sendo necessário apenas algumas mudanças (adição de formulário de login).
- Todas as rotas do backend requerem o usuário estar logado.

## Observações gerais
- Foi escolhido o vite com react pra manter uma arquitetura mais próxima do comum e um maior desempenho na implmentação por ele possui algumas funcionalidades como hot reload
- Na criação de mensagem, por a mensagem do sistema ser fixa (mockada) foi optado por criar as 2 mensagens ao mesmo tempo, com a adição de 1 segundo para a mensagem do sistema.
- O banco de dados SQLite foi enviado para fins de mock, ou seja, para que os testes possam ser feitos sem a necessidade de uma configuração a mais.
- O sistema foi desenvolvido para atender aos requisitos e algums melhorias são necessárias.
