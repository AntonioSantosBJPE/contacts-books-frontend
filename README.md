![Logo Contacts Book](https://i.ibb.co/tZjcyHB/logo.png)

---

# Contacts Book

Contacts-book é uma aplicação para gerenciar sua agenda de contatos, permitindo que os usuários se cadastrem como clientes, façam login na aplicação, atualizem suas informações de perfil e gerenciem sua lista de contatos. 
Os usuários autenticados podem criar, atualizar, excluir e listar todos os seus contatos criados. A aplicação está em produção e pode ser acessado no seguinte [link](https://contacts-books-pi.vercel.app/).
Caso deseje rodar o projeto localmente acesse também o repositório da API neste [link](https://github.com/AntonioSantosBJPE/contacts-book-backend). 

---

## Tabela de Conteúdos

- [Visão Geral](#1-visão-geral)
- [Screenshots](#2-screenshots)
- [Funcionalidades](#3-funcionalidades)
- [Início Rápido](#4-início-rápido)
  - [Instalando Dependências](#41-instalando-dependências)
  - [Variáveis de Ambiente](#42-variáveis-de-ambiente)
  - [Rodando Localmente](#43-rodando-localmente)

## 1. Visão Geral

O projeto foi desenvolvido totalmente em typescript, utilizando react, e como framework foi utilizado o next.JS, escolhido com o intuito de melhorar o SEO (Search Engine Optimization), da página home da aplicação.
Para realizar requisições http foi utilizado o axios, para realizar a estilização da aplicação optou-se pele Sass e o controle de formulários foi feito através do react-hook-form em conjunto com o zod. 
Por fim o deploy da aplicação foi feita na Vercel.

Segue os links para mais informações sobre as tecnologias utilizadas:
- [React](https://pt-br.react.dev/)
- [NextJS](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Sass](https://sass-lang.com/)
- [Axios](https://axios-http.com/)
- [React-hook-form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Vercel](https://vercel.com/)

---

## 2. Screenshots
[ Voltar para o topo ](#tabela-de-conteúdos)

![Página Home](https://i.ibb.co/m8ngFX9/home-page-contacts-book.png)
![Página de login](https://i.ibb.co/Yt8K0qP/login-page-contacts-book.png)
![Página de registro](https://i.ibb.co/qjwJ2bt/register-page-contacts-book.png)
![Página dashboard](https://i.ibb.co/wzXYh22/dashboard-page-contacts-book.png)
![Página dashboard](https://i.ibb.co/2WSwGrp/SEO.png)

---

## 3. Funcionalidades
[ Voltar para o topo ](#tabela-de-conteúdos)

- Registro: O usuário pode realizar o seu cadastro na plataforma, onde o formulário conta com controles de dados, feitos com a biblioteca zod;
- Login: O usuário pode realizar o login na plataforma, e assim ter acesso a página dashboard;
- Atualização de perfil pessoal: O usuário autenticado pode atualizar suas informações de perfil na página dashboard;
- Criação de contato: O usuário autenticado pode criar novos contatos para sua lista de contatos;
- Atualizar dados de um contato: O usuário autenticado pode atualizar os dados dos seus contatos;
- Apagar contato: O usuário autenticado pode apagar seus contatos;
- Realizar filtros de dados: O usuário autenticado pode realizar filtros na sua lista de contatos; 
- Exportar dados: O usuário autenticado pode exportar os dados da sua lista em formato csv;
- Imprimir dados: O usuário autenticado pode imprimir uma imagem da sua lista de contatos ou exportar em formato pdf;

---

## 4. Início rápido
[ Voltar para o topo ](#tabela-de-conteúdos)

### 4.1. Instalando dependências

Clone o projeto em sua máquina:

```
  git clone git@github.com:AntonioSantosBJPE/contacts-books-frontend.git
```

Instale as dependências com o comando:
```
npm install
```

### 4.2. Variáveis de Ambiente
Em seguida, crie um arquivo **.env.local**, copiando o formato do arquivo **.env.example**:

```
cp .env.example .env
```

Configure a variável de ambiente com a url do seu servidor backend. Caso queira rodar o pojeto todo localmente, faça uso deste [repositório](https://github.com/AntonioSantosBJPE/contacts-book-backend) , caso deseje utilizar um servidor que esteja em produção faça uso deste [link](https://contacts-book-api-6ydl.onrender.com).

### 4.3. Rodando Localmente

Para rodar a aplicação localmente use o comando:

```
npm run dev
```

---


## Autor

- [@Antonio Santos](https://github.com/AntonioSantosBJPE)
