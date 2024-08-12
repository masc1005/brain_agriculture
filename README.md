# Teste - Brain Agriculture

O teste tem como objetivo acurar as habilidades do candidato em resolver alguns problemas relacionados à lógica de programação, regra de negócio e orientação à objetos.

O mesmo consiste em um cadastro de produtor rural com os seguintes dados:

1.  CPF ou CNPJ
2.  Nome do produtor
3.  Nome da Fazenda
4.  Cidade
5.  Estado
6.  Área total em hectares da fazenda
7.  Área agricultável em hectares
8.  Área de vegetação em hectares
9.  Culturas plantadas (Soja, Milho, Algodão, Café, Cana de Açucar)

# Requisitos de negócio

- O usuário deverá ter a possibilidade de cadastrar, editar, e excluir produtores rurais.
- O sistema deverá validar CPF e CNPJ digitados incorretamente.
- A soma de área agrícultável e vegetação, não deverá ser maior que a área total da fazenda
- Cada produtor pode plantar mais de uma cultura em sua Fazenda.
- A plataforma deverá ter um Dashboard que exiba:
  - Total de fazendas em quantidade
  - Total de fazendas em hectares (área total)
  - Gráfico de pizza por estado.
  - Gráfico de pizza por cultura.
  - Gráfico de pizza por uso de solo (Área agricultável e vegetação)

# Requisitos técnicos

- O desenvolvedor front-end deverá utilizar:

  - [ReactJS](http://reactjs.org);
  - [Redux](https://redux.js.org/) para controlar o estado da aplicação.
    - Caso entenda que faça sentido, utilize [Context API](https://reactjs.org/docs/context.html) como recurso adicional ou substituto ao Redux (Opcional)
  - Crie pelo menos um teste unitário por componente (Opcional)
  - A criação das estruturas de dados "mockados" faz parte da avaliação.

- O desenvolvedor back-end deve:

  - Salvar os dados em um banco de dados Postgres usando o NodeJS como layer de Backend, e entregar os endpoints para cadastrar, editar, e excluir produtores rurais, além do endpoint que retorne os totais para o dashboard.
  - A criação das estruturas de dados "mockados" faz parte da avaliação.

  Desejável:

  - TypeScript
  - Conceitos como SOLID, KISS, Clean Code, API Contracts, Tests, Layered Architecture

  Bonus:

  - Aplicação disponibilizada em algum cloud provider de sua preferência

- O desenvolvedor full-stack deve realizar ambos, e concluir a integração.
  > Não envie a solução como anexo, suba os fontes para seu Github (ou outro repositório) e envie o link para o avaliador.





#

## Como executar o projeto?

- Opcional: utilizar o docker.
- Caso opte por utilizar o docker-compose da aplicação, execute o comando: docker compose up -d, isso fará com que os serviços do docker sejam executados.
- Com os serviços do docker funcionando, você tera o postgres e o pg admin para a vizualização do banco de dados. (Existe tambem a possibilidade de utilizar o prisma studio, mas não me agrada muito.)
- Execute o comando `docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' postgres`
- Deve retornar um IP, algo assim: `172.19.0.2`, Esse é o host do seu banco de dados.
- Agora no .env.example tem um exemplo de URL, preencha com as informações necessarias e podemos executar o projeto

  - URL segundo docker: "postgresql://ag_user:ag_password@172.19.0.2:5432/ag_db?schema=public"

- instala as dependências: `yarn` || `npm install`

- comando: yarn||npx prisma generate

## Endpoint da aplicação:

### Tem um documento exportado do insomnia com todas as rotas testaveis

`POST /api/agriculture`

- **Descrição**: Cria um novo registro de fazenda.
- **Corpo da Requisição**:

  - {
    "nome": "Amazon",
    "nome_fazenda": "Fazenda Prime",
    "documento": "13.347.016/0001-17",
    "cidade": "Belo Horizonte",
    "estado": "MG",
    "area_fazenda": 600,
    "area_agricutaravel": 400,
    "area_vegetacao": 400,
    "plantacoes": ["Milho", "Soja", "Cana-de-açúcar"]
    }

- **Respostas**:
  - `201 Created`: Registro criado com sucesso.
  - `500 Internal Server Error`: Erro no servidor.

#

`GET /api/agriculture`

- **Descrição**: Retorna uma lista paginada de fazendas.
- **Query Params**:
  - `page` (number): Página a ser retornada (padrão: 1).
  - `quantity` (number): Número de registros por página (padrão: 10).
- **Respostas**:
  - `200 OK`: Lista de fazendas retornada com sucesso.
  - `500 Internal Server Error`: Erro no servidor.

#

`GET /api/agriculture/:id`

- **Descrição**: Retorna os detalhes de uma fazenda específica pelo ID.
- **Parâmetros**:
  - `id` (number): ID da fazenda.
- **Respostas**:
  - `200 OK`: Detalhes da fazenda retornados com sucesso.
  - `404 Not Found`: Fazenda não encontrada.
  - `500 Internal Server Error`: Erro no servidor.

#

`GET /api/agriculture/document`

- **Descrição**: Retorna o documento de uma fazenda específica.
- **Query Params**:
  - `document` (string): Documento a ser buscado (em formato JSON).
  - `page` (number): Página a ser retornada (padrão: 1).
  - `quantity` (number): Número de registros por página (padrão: 10).
- **Respostas**:
  - `200 OK`: Documento retornado com sucesso.
  - `404 Not Found`: Documento não encontrado
  - `500 Internal Server Error`: Erro no servidor.

#

`PUT /api/agriculture/:id`

- **Descrição**: Atualiza os dados de uma fazenda específica pelo ID.
- **Parâmetros**:
  - `id` (number): ID da fazenda.
- **Corpo da Requisição**:

  - {
    "nome": "Amazon",
    "nome_fazenda": "Fazenda Prime",
    "documento": "13.347.016/0001-17",
    "cidade": "Belo Horizonte",
    "estado": "MG",
    "area_fazenda": 600,
    "area_agricutaravel": 400,
    "area_vegetacao": 400,
    "plantacoes": ["Milho", "Soja", "Cana-de-açúcar"]
    }

- **Respostas**:
  - `200 OK`: Fazenda atualizada com sucesso.
  - `404 Not Found`: Documento não encontrado.
  - `500 Internal Server Error`: Erro no servidor.

#

`DELETE /api/agriculture/:id`

- **Descrição**: Exclui uma fazenda específica pelo ID.
- **Parâmetros**:
  - `id` (number): ID da fazenda.
- **Respostas**:
  - `204 No Content`: Fazenda excluída com sucesso.
  - `404 Not Found`: Documento não encontrado.
  - `500 Internal Server Error`: Erro no servidor.
