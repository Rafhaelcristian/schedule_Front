# React + TypeScript + Vite

    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>

## Passos necessários para rodar a aplicação

É necessário após baixar o repositório instalar as dependências com uma **npm install**

Após a instalação execute o servidor back end e depois o front end com os mesmos compando, **npm run dev**,

### Rotas desprotegidas

**http://localhost:3000/cadastro**
É possível registrar client

**http://localhost:3000/**
É possível fazer login

### Rota protegida

**http://localhost:3000/dashboard**

É possível criar contatos, editar o client, e excluir o cliente, mas apenas se o mesmo não tiver contatos cadastrados.
