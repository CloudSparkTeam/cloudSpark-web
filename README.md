# cloudSpark-web
# Plataforma Web

Este serviço é responsável por estruturar a interface web da plataforma.

## Pré-requisitos

Certifique-se de ter o **Node.js** e o **npm** instalados no seu ambiente de desenvolvimento.

- Se ainda não tiver, acesse [Node.js](https://nodejs.org/pt) e faça o download da versão mais recente.

Siga os passos abaixo para rodar o frontend localmente:

1. **Clone o repositório:**

   Clone o projeto utilizando o comando:

   ```bash
   git clone https://github.com/CloudSparkTeam/cloudSpark-web.git

2. **Navegue até a pasta do projeto:**

    Vá até o diretório onde o repositório foi clonado:
    ```bash
    cd cloudSpark-web

3. **Instale as dependências:**
    Execute o seguinte comando para instalar todas as dependências necessárias:
    ```bash
    npm install

4. **Configuração do Ambiente (.env):**
    Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:
    ```bash
    REACT_APP_MAP_TOKEN='SEU_TOKEN_DO_GOOGLE'
    ```
    Substitua 'SEU_TOKEN_DO_GOOGLE' pelo token da API do Google Maps que você vai utilizar no projeto. Para obter o token, acesse o Google Cloud Console.

5. **Inicie o servidor:**

    Após configurar o arquivo .env e instalar as dependências, inicie o servidor com o comando:
    ```bash
    npm start

O servidor será iniciado localmente na porta 3000. Acesse o aplicativo web através do navegador em:

```bash
http://localhost:3000