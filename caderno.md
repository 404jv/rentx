> 💡 Pergunta: Por definição, o que é o TypeScript? Quais os benefícios em utilizá-lo no projeto?

Responda aqui

Typescript é um conjunto de tipagens feita para o Javascript pela Microsoft e mantido em opensource.

Alguns do benefício de se utilizar:

- Melhor Produtividade
- Maior legibilidade no código
- Consigo unir o melhor dos dois mundo Tipagem + vantagens do JS
- Consigo misturar TS com JS

> 💡 Pergunta: Ao executar o arquivo `server.ts` diretamente com o `node`, é disparado um erro, por qual motivo isso acontece? Como podemos resolver?

Responda aqui

O Node não entende nativamente o Typescript. Ele entende apenas Javascript, ou seja, para funcionar precisamos converte Typescript para Javascript, um processo chamado "Transpilar". Para isso rodo o comando abaixo, com o executável tsc instalado (global ou local):

```bash
yarn tsc
```

> 💡 Sugestão: Exemplifique como pode ser feito a tipagem de parâmetros como `request` , `response` e métodos presentes dentro das classes.

Responda aqui:

Para realizar a tipagem do request e  response, precisamos pegar as tipagens dentro do framework Express, para isso importe assim:

```tsx
import { Request, Response } from "express";
```

Com as tipagens importadas é só usa-las onde precisar, por exemplo:

```ts
function controller(request: Request, response: Response) {}
```

Nessa função a tipagem é feita.


> 💡 Pergunta: Em uma tipagem, quando é preciso definir um parâmetro ou propriedade como opcional, o que é preciso fazer? Junto a isso, como informar um valor padrão para essa propriedade?

Responda aqui

Podemos colocar como opcional quando um parâmetro não é necessário ser informado ou não é preciso deixar explicito o valor. Por exemplo: em um sistema que cadastra usuários que são administradores ou não.

Nesse caso eu posso criar um objeto user (name, admin), admin é um boolean que se for true o usuário é administrador e ser false não é administrador. A tipagem poderia ser assim:

```ts
interface user {
	name: string;
	admin?: boolean;
}
```

O admin tem o sinal "?", logo esse um objeto do tipo user não precisa ter um valor para admin.

Na função de criação de um user podemos colocar um valor padrão para o admin, ou seja, caso não venha um admin true, logo esse user não é admin. Assim:

```ts
function createUser({ name, admin = false }: user}) {
	console.log(name, admin);
}
```

se eu chamar essa função passando apenas o name, createUser({ name: 'João'}) e o output vai ser João e false.


> 💡 Pergunta: Para que serve o ESLint? Em que ele nos ajuda? O que faz o `ts-node-dev` ? Quais as suas vantagens durante o desenvolvimento?

Responda Aqui

Eslint é uma ferramenta para padronização de código, geralmente os dev's de um time instalam nos editores deles e ao escreve o código o Eslint "corrige" o código em um só tipo, então se o time definiu aspas dupla como o padrão, ao escrever aspas simples o Eslint vai trocar a aspas simples pela dupla ou vai reclamar no terminal que uma aspas simples no código.

ts-node-dev serve para dar o reload na aplicação toda vez que há uma atualização no código, assim como o nodemon, porém o ts-node-dev é para typescript já que é necessário uma transpilação de código.


> 💡 Pergunta: O que significa "debugar a aplicação"?

Responda aqui

Debugar é o processo de procurar errors (bugs) no código, existem ferramentas nos editores que ajudam nesse processo.

> 💡 Pergunta: Para isolarmos as rotas em outros arquivos é preciso utilizar uma função do express, que função é essa? Como seria essa implementação? (Exemplifique com código se achar necessário)

Responda aqui

Para isso podemos importar apenas instanciar o Router de dentro do express, importamos assim:

```tsx
import { Router } from "express";
```

Com o Router importado, podemos instancia-lo em uma constantes, assim:

```tsx
const routes = Router();
```

E pronto, temos um objeto routes do express e agora e só criar as rotas necessárias.

> 💡 Pergunta: Como pode ser definido um path base para uma rota e/ou middleware? Ex.: Quero que todas as rotas do arquivo `categoriesRoutes` sejam acessíveis pela rota base `/categories` (Exemplifique com código se achar necessário)

Responda aqui

Para isso podemos colocar o path base no middleware use do express, exemplo:

```ts
app.use(categoriesRoutes);
```

Aqui temos todas as rotado da categories como padrão "/", caso eu queira mudar para "/categories" eu preciso passar esse path como uma string no primeiro parâmetro, assim:

```ts
app.use("/categories", categoriesRoutes);
```

Pronto agora todos os recursos do categories vão estar depois do path /categories.

> 💡 Pergunta: Qual a funcionalidade do `constructor` dentro de uma `class`?

Responda aqui

o constructor é responsável por instanciar a classe, ou seja, se eu tiver uma classe Category e eu quiser instancia-la eu preciso fazer assim:

```tsx
const objeto = new Category();
```

dentro dessa classe Category eu tenho um constructor que vai se inciar ao eu instanciar, que pode ser assim:

```tsx
constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
```

esse constructor para todos os objetos dessa classe vai verificar se uuid está vindo, caso não estiver o mesmo vai criar um com a função uuidV4().


> 💡 Pergunta: Explique os conceitos de **repositórios** e **DTO.**

Responda aqui

**Repositórios** é a camada responsável pela a manipulação dos dados no banco, ou seja, select, insert, update de dados acontecem na camada de repositório.

DTO (data transfer object) é uma interface para representar os atributos/métodos de um determinado objeto. A importância de ter um DTO é para que outras camadas não precisam saber os dados desse objeto, com um DTO a route não vai sabe o que está sendo transferido para um repository.

> 💡 Pergunta: Para que servem os **Services**? Explique também o conceito do Princípio de Responsabilidade Única (SRP).

Responda aqui:

Os services são responsáveis pela verificação das regras de negócios dos dados e pela manipulação dos mesmos.

O SRP é o princípio que diz que uma classe/rota/método deve ter apenas uma responsabilidade, então um service de Category seria uma classe para fazer a criação, deleção, atualização, listagem de Categories, caso essa aplicação respeitasse a regra SRP a aplicação teria 4 classes, uma para criação, para deleção, atualização e listagem, ou seja, cada classe teria uma responsabilidade única.

> 💡 Pergunta: Qual o conceito em separar a aplicação em módulos?

Responda aqui

Com a aplicação em módulos temos tópicos separados em pastas, por exemplo, um módulo de carro teria uma pasta cars com todo o código relacionado (repositories, services) ao tópico carro dentro desta pasta. Isso ajuda pois se colocarmos tudo em pastas generalizadas como services e repositories, teríamos muitos arquivos dependendo da aplicação, o que implicaria em perca de produtividade.

> 💡 Pergunta: Explique os conceitos de Controllers e useCases.

Responda aqui

Os Use Cases são todas as operações que é feita na aplicação, separadas por pastas, então uma operação de criar uma categoria seria uma pasta (CreateCategory) e dentro dessa pasta todos os services, regras de negócio e todo o código necessário para executar tal operação.

Controllers recebem os dados da request, podem fazer certas verificações que não sejam regras de negócio, por exemplo, verificar se um campo obrigatório está sendo enviado. Os controller são responsáveis por passar esses dados para um service.

> 💡 Pergunta: Explique sobre o Singleton Pattern.

Responda aqui

Singleton é um padrão de projeto que consiste em exportar uma instância de um Repository para toda a aplicação, isso evita que temos dois Repositories diferentes, um exemplo seria em uma listCategories instância um Repository e uma createCategory instância o mesmo Repository, ou seja, nunca a listCategories conseguira listar categories criadas, já que o repositroy usado na createCategory é uma instância diferente.

> 💡 Sugestão: Documente o processo de configuração do [multer](https://github.com/expressjs/multer).

Responda aqui

O primeiro passo é importar o multer:

```tsx
import multer from "multer";
```

Agora é necessário criar um objeto multer com as configurações necessárias. Como queremos colocar os arquivos que serão enviados em uma pasta tmp, colocamos o local da pasta tbm no atributo dest, assim:

```tsx
const upload = multer({
  dest: "./tmp",
});
```

agora todos os arquivos vão ser armazenados em uma pasta raiz chamada tbm, é necessário criar a pasta antes de fazer o upload.

Agora precisamos escolher a rota, no caso:

```tsx
categoriesRoutes.post("/import", (request, response) => {

  return response.send();
});
```

Com a rota criada, passa um método do upload como um middleware antes da request e response. Esse método recebe um parâmetro indicando que queremos passar nessa rota apenas um arquivo, assim:

```tsx
categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
```

Agora nosso objeto request vai ter um atributo chamado file, para pegar podemos fazer isso:

```tsx
categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
  const { file } = request;

  return response.send();
});
```

pronto! O arquivo foi salvo na pasta dist

> 💡 Pergunta: Explique sobre o conceito de Stream. Sugestão: Documente o código criado na aula, para futuras dúvidas. (Exemplifique com código se achar necessário)

Responda aqui

Stream por definição é um fluxo constante de algo. Na programação isso vai ser um processo em partes, como ler um arquivo grande em pequenas partes para não exigir muito do processador de uma só vez.

Para ler um arquivo CSV em modo stream, precisamos dessas duas libs:

```tsx
import csvParse from "csv-parse";
import fs from "fs";
```

agora com os dois arquivos, vamos criar uma função chamada execute, que receba um parâmetro chamado file, do tipo `Express.Multer.File` que é justamente o tipo de arquivo que podemos receber através do `Multer`em uma rota.

```tsx
execute(file: Express.Multer.File): void {}
```

a primeira coisa que precisamos é criar um stream através do FS, o método `createReadStream`

e como parâmetro passamos o path do arquivo, assim:

```tsx
execute(file: Express.Multer.File): void {
  const stream = fs.createReadStream(file.path);
}
```

massa, mas ainda nosso arquivo não foi lido. Ante de ler precisamos iniciar um objeto `csvParser`

como o nosso arquivo é CSV precisamos de algo que vai fazer essa conversão de csv para JS. Fica assim:

```tsx
execute(file: Express.Multer.File): void {
  const stream = fs.createReadStream(file.path);

  const parseFile = csvParse();
}
```

oks, agora temos um objeto csv que vai receber todo o arquivo csv e temos um stream para ler por partes esse arquivo, agora precisamos de fato fazer isso. Então vamos ler esse arquivo com o método pipe do objeto stream e como parâmetro o pipe recebe o destino do nosso conteúdo no arquivo csv, que advinha quem é? Exatamente o nosso objeto `parseFile` então vai ficar assim:

```tsx
execute(file: Express.Multer.File): void {
  const stream = fs.createReadStream(file.path);

  const parseFile = csvParse();

  stream.pipe(parseFile);
}
```

todo o nosso arquivo localizado no `file.path` será lido em modo stream (parte por parte) e armazenado no objeto `parseFile` Simples assim. Agora podemos manipular essas informações que foram lidas, o objeto `parseFile` tem um método chamado on, o primeiro parâmetro vai ser uma string com data e o segundo é uma callback assíncrona, essa callback tem um parâmetro que é a linha do arquivo, ou seja, podemos passar em todo o arquivo linha por linha, vamos dar um console log nessas linhas:

```tsx
execute(file: Express.Multer.File): void {
  const stream = fs.createReadStream(file.path);

  const parseFile = csvParse();

  stream.pipe(parseFile);

  parseFile.on("data", async (line) => {
    console.log(line);
  });
}   
```

> 💡 Sugestão: Documente o processo de configuração do Swagger na aplicação.

Responda aqui

Para as configs do swagger, o primeiro passo é instalar:

```bash
yarn add swagger-ui-express
```

para instalar as dependências:

```bash
yarn add @types/swagger-ui-express
```

Com o swagger instalado, precisamos importar o objeto `swaggerUi`:

```tsx
import swaggerUi from "swagger-ui-express";
```

Antes de usar precisamos declarar uma rota que a documentação vai ficar, no express fazemos assim:

```tsx
app.use("/api-docs")
```

Agora como segundo parâmetro passamos o método server do objeto `swaggerUi`

```tsx
app.use("/api-docs", swaggerUi.serve)
```

Agora com o server do swagger rodando, precisamos mostrar algumas configurações que é feita em um arquivo `swagger.json` dentro da pasta `src` dentro desse arquivo tem que ficar mais ou menos assim:

```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "RentalX Documatation",
    "description": "This is an API Rent",
    "version": "1.0.0",
    "contact": {
      "email": "joaovictorramalho7@gmail.com"
    }
  }
}
```

O primeiro parâmetro é a versão do swagger no caso vamos utilizar a ultima, nas `infos` vão todas as configurações da nossa API, como o titulo, descrição, versão e o contato do desenvolvedor da API. Para o swagger ter acesso a essa config precisamos importa-la, assim:

```tsx
import swaggerFile from "./swagger.json";
```

Lembrando que o typescript não aceita importações `json` como padrão, para aceitar precisamos passar esse propriedade como true no `tsconfig.json`:

```json
"resolveJsonModule": true
```

Agora finalmente passamos como terceiro parâmetro, as configurações do nosso `swagger.json` ficando assim:

```tsx
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
```

Agora a documentação vai estar disponível na rota `/api-docs`.

> 💡 Pergunta: O que é o Docker? Como ele nos ajuda durante o desenvolvimento? 

Responda aqui
O Docker usa containers que podem ser usados para separar ambientes diferentes, já que um container é um local com sistema a parte e isolado. Podemos colocar um sistema diferente em cada container através a imagem, existem várias imagens como: Ubuntu, Windows, Linux, Debian e entre outras que podem ser usadas como um sistema de um container. Algo que o Docker traz é se roda localmente sempre vai rodar em produção e outra vantagem de se utilizar Docker é que os containers dividem processamento com o sistema principal, então é mais leve.

> 💡 Sugestão: Documente sobre o processo de configuração do arquivo Dockerfile, para futuras dúvidas.

Responda aqui

Primeiro para inciar o docker é necessário um arquivo chamado `Dockerfile` na raiz do projeto. Esse arquivo é responsável por mostrar o passo a passo para usar o container. Com o arquivo criado, precisamos mostra a imagem desse container, que no caso pode ser assim:

```docker
FROM node
```

Para mais imagens esse [site](https://hub.docker.com/search) mostra. Agora com a imagem pronta, precisamos mostrar o local em que a nossa aplicação vai colocar os arquivos necessários para roda-la:

```docker
WORKDIR /usr/app
```

Agora algo importante é fazer uma copia do atual `package.json` da nossa aplicação para o Work Dir configurado anteriormente. Para isso temos o comando `COPY` que recebe o arquivo em primeiro e depois o local onde será copiado, no caso o arquivo é `package.json` e o local é `./` a nossa raiz do Work Dir:

```docker
COPY package.json ./
```

Com o package no docker precisamos instalar as dependências do mesmo,  então para isso usamos o comando RUN. Lembrando que é melhor usar o `npm` já que o `yarn` pode não ser instalado por padrão:

```docker
RUN npm install
```

Agora com as dependências instaladas, é necessário copiar todo o código para o container, podemos fazer isso com o mesmo comando COPY usado para o `package.json` mas como parâmetro passamos . e . já que queremos copiar quase todos os arquivos para o container:

```docker
COPY . .
```

Agora usamos esse comando para escolher a porta, no caso 3333:

```docker
EXPOSE 3333
```

E esse CMD para indicar como rodar a nossa aplicação, lembrando de utilizar o `npm`  e esse CMD separa o comando em um array cada parte fica em uma posição em ordem, assim: 

```docker
CMD ["npm", "run", "dev"]
```

Por fim precisamos criar outro arquivo chamado de `.dockerignore` que funciona semelhando ao `.gitignore` porém esse faz o Docker não fazer copias desses para o container. Então coloque esses nomes:

```
node_modules
.vscode
.git
```

E para roda a aplicação, o primeiro parâmetro é o nome do projeto e o segundo o local do arquivo `dockerfile`:

```bash
docker build -t rentx .
```

> 💡 Sugestão: Documente o processo de configuração do arquivo `docker-compose.yml`

Responda aqui

A primeira parte é mostrar a versão do docker, no caso 3.7, assim:

```yaml
version: "3.7"
```

com a versão declarada, agora a configuração do nosso serviço que é feito pelo:

```yaml
services:
```

Para declara o primeiro service que é o `app` podemos fazer assim:

```yaml
services: 
  app:
```

agora dentro do `app` passamos toda a configuração e a primeira é a a localização do `dockerfile` que vai ser o `.` já que está na pasta raiz:

```yaml
services: 
  app:
    build: .
```

após isso, podemos colocar o nome desse container:

```yaml
services: 
  app:
    build: .
    container_name: rentx
```

e algo importante são as portas, na máquina principal queremos a `3333` e no container também a `3333` e isso pode ser feito assim:

```yaml
services: 
  app:
    build: .
    container_name: rentx
    ports: 
      - 3333:3333
```

e por fim precisamos mostra aonde os nossos arquivos da aplicação serão guradados, no caso podemos colocar um diretório `/usr/app` fazemos assim:

```yaml
services: 
  app:
    build: .
    container_name: rentx
    ports: 
      - 3333:3333
    volumes: 
      - .:/usr/app
```

> 💡 Sugestão: Liste e descreva sobre os principais comandos que são utilizados no Docker e Docker Compose.

Responda aqui

Esse é para listar os containers rodando:

```bash
docker-compose ps
```

Para parar o container podemos usar esse:

```bash
docker-compose stop
```

E para rodar o container:

```bash
docker-compose start
```

Para criar o container:

```bash
docker-compose up
```

Para remover o container:

```bash
docker-compose down
```

> 💡 Pergunta: Quais as diferenças entre trabalhar com o driver nativo do banco de dados, Query Builder e ORM? Explique sobre cada um deles.

Responda aqui

A diferença entre eles são o tamanho da abstração, o driver nativo é o mais próximo do banco, pois é necessário escreve o SQL puro, já o Query Builder tem um abstração um pouco maior, nele utilizamos funções e objetos, e por baixo do pano é feito a comunicação para o SQL, tanto é que quando utilizamos um Query Builder como o Knex precisamos instalar também o Driver nativo do banco utilizado na aplicação. Já o ORM é uma abstração maior, ele não só usa funções e objetos para comandos SQL, como ele traz as tabelas e entidades para o código, tendo tabelas sendo representadas por classes e isso traz uma legibilidade para o código muito maior.

> 💡 Sugestão: Documente o processo de configuração do TypeORM no projeto, para futuras consultas. Dica: Fale sobre os pacotes instalados e arquivos criados.

Responda aqui

A primeira parte é instalar o `TypeORM` e o `reflect-metadata` que pode ser feito assim:

```bash
yarn add typeorm reflect-metadata
```

Após a instalação dos dois, é necessário instalar um Driver Nativo do banco escolhido na aplicação, no caso:

```bash
yarn add pg
```

Agora precisamos passar os `dacorators` no `tsconfig.json` lá no final do arquivo descomente essas duas opções:

```json
"emitDecoratorMetadata": true,
"experimentalDecorators": true,
```

Agora na raiz do projeto é preciso criar um arquivo `ormconfig.json` com as seguintes configurações:

```json
{
  "type": "postgres",
  "host": "localhost",
  "port": 3306,
  "username": "postgres",
  "password": "test",
  "database": "rentx",
  "synchronize": true,
  "logging": false,
  "entities": [
     "src/entity/**/*.ts"
  ],
  "migrations": [
     "src/migration/**/*.ts"
  ]
}
```

Antes de usar é preciso importar o `reflect-metadata` em um arquivo principal, por exemplo o `server.ts` lembrando que importe na primeira linha do arquivo:

```tsx
import "reflect-metadata";
```

> 💡 Pergunta: Qual o conceito de migrations? Como elas nos ajudam a trabalhar em equipe?

Responda aqui

As Migrations são os processos passo a passo da manipulação das tabelas no banco de dados, cada migration é responsável por criar, editar ou deletar, uma tabela. As migrations ajudam a manter uma produtividade maior no time, já que elas versionam as tabelas assim evitando que o time tenha a mesma tabela porém com campos diferentes.

> 💡 Pergunta: Documente o passo a passo para criar uma migration, desde o comando até como devem funcionar as funções `up` e `down`.

Responda aqui

A primeira coisa a se fazer para criar uma migration, é configurar o cli do `typeorm`, pois é ele em que vai rodar as migrations. Para isso temos duas possibilidades baixando a cli globalmente ou baixando localmente. No caso vamos utilizar localmente já que sempre que instalarmos o `typeorm` ele vira na última versão. Agora para melhor produtividade vamos criar um script que nos leva até  cli dentro do `node_modules` assim:

```json
"typeorm": "ts-node-dev ./node_modules/typeorm/cli"
```

E antes de fato de começar a criar as migrations, é importante definir o local onde as migrations vão ficar, caso contrário ao rodar a migration, elas ficariam na raiz do projeto. Para definir um path, precisamos ir no `ormconfig.json` e colocar um objeto cli e dentro um campo `migrationDir` que recebe uma string com o path:

```json
"cli": {
    "migrationsDir": "./src/database/migrations"
}
```

Lembre-se de criar a pasta migrations e database. Agora vamos de fato para criação de uma migration, para isso rodamos o código abaixo:

```bash
yarn typeorm migration:create -n NOME_MIGRATION
```

Agora vai ser criado um arquivo parecido com esse `1628515148712-NOME_MIGRATION` agora dentro do arquivo existem uma classe com dois métodos o de criação e edição chamado de `up` e o que faz o oposto do `up` geralmente para deleção que é chamado `down` . Com eles vamos criar os campos na tabela,  primeiro dentro do `up` rodamos o método `createTable` do objeto `queryRunner` assim:

```tsx
await queryRunner.createTable()
```

agora dentro dele passamos um objeto com o campo name que é o nome da tabela e um array columns que serão os campos da tabela. Assim:

```tsx
await queryRunner.createTable(
      new Table({
        name: "NAME_TABLE",
        columns: [
          {
            name: "CAMPO1",
            type: "varchar",
          **},
        ],
      })
    );
```

Já no `down` podemos apenas dar um `dropTable` assim:

```tsx
public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("NAME_TABLE");
}
```

> 💡 Sugestão: Explique como pode ser feita a integração de uma Entidade com o `TypeORM`. Ex.: Fale sobre os decorators, como podemos definir uma coluna, uma chave primária e etc.

Responda aqui

Para criar uma entidade com `TypeORM` precisamos usar o Entity que um decorator para declarar uma entidade do banco:

```tsx
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("categories")
class Category {
```

Agora com para cada atributo da classe colocamos um decorator, para a chave primária colocamos assim:

```tsx
@Entity("categories")
class Category {
  @PrimaryColumn()
  id?: string;
```

Já para outros atributos normais apenas coloque o Column:

```tsx
@Entity("categories")
class Category {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;
```

Agora para atributo `created_at` existe um decorator para ele:

```tsx
@Entity("categories")
class Category {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;
}
```
> 💡 Pergunta: Qual a diferença entre utilizar o `extends Repository` e o `getRepository` junto a propriedade `private` nas classes?

Responda aqui

`extends Repository` é usado para herdar atributos ou métodos. Já o `getRepository` é um método público para retornar apenas um repository de uma determinada entity e a propriedade private é para determinar a visibilidade de um atributo ou método.

> 💡 Pergunta: Como a lib `TSyringe` pode nos auxiliar com a injeção de dependências?

Responda aqui

A `TSyringe` é uma dependência para inserção automática de dependência, logo não precisamos se preocupara com objetos que uma determinada classe recebe, podemos fazer isso apenas uma fez e após isso a `TSyring` faz a injeção das dependências necessárias para uma determinada classe.

> 💡 Explique o processo de configuração para o input de arquivo.

Responda Aqui

Com uma rota declarada, assim:

```json
"/categories/import": { 
 },
```

Podemos começara o processo de receber um arquivo como input. Para isso podemos colocar o `requestBody` pode ser assim:

```json
"/categories/import": {
	"requestBody": {}
},
```

dentro dele colocamos o `content` e dentro do content a propriedade `multipart/form-data` que é responsável por declarar o tipo de arquivo que vai ser enviado para essa rota:

```json
"/categories/import": {
	"requestBody": {
    "content": {
      "multipart/form-data": {}
		}
	}
},
```

agora podemos montar o schema do body, dentro da propriedade `schema` vai o `type` que é "object" e outra propriedade dentro do schema chamada de `properies` assim:

```json
"requestBody": {
  "content": {
    "multipart/form-data": {
      "schema": {
        "type": "object",
        "properties": {
          "file": {}
        }
      }
    }
  }
},
```

por fim declaramos o `type` dentro da propriedade `file` que será "string" e tem um `format` que recebe `binary` ficando assim:

```json
"requestBody": {
  "content": {
    "multipart/form-data": {
      "schema": {
        "type": "object",
        "properties": {
          "file": {
            "type": "string",
            "format": "binary"
          }
        }
      }
    }
  }
},
```
> 💡 Pergunta: Como pode ser feito a remoção de uma coluna em uma tabela do banco de dados?

Responda aqui

Usando o `TypeORM` podemos criar uma nova migration e através do método `dropColumn` remover essa coluna, não esquecendo de cria-la dentro do método `down` já que esse método faz o oposto do `up` após isso basta rodar  a migration e a remoção da coluna no banco será realizada.

> 💡 Sugestão: Explique sobre a importância de criptografar a senha antes de salvar no banco de dados.

Responda aqui

Caso houvesse um vazamento de dados, não comprometesse tanto os dados dos usuários e seja um impedimento a mais de alguém mal intencionado acaba tendo acesso ao banco de dados.

> 💡 Pergunta: Como funciona o fluxo de autenticação JWT? Quais tipos de dados **não** devemos passar no `payload`?

Responda aqui

O usuário passa o email e senha, verificamos os dados passados e caso estejam corretos geramos um token e retornamos. Assim para cada request que exige autenticação, o usuário usa o token dele.

Não podemos passar dados críticos no `payload` como senhas ou documentos pessoais.

> 💡 Explique sobre o processo para gerar o JWT do usuário.

Responda aqui

Para criar um token de usuário antes precisamos verificar as credencias do mesmo, um simples if para verificar se o e-mail existe já basta, como este:

```tsx
const user = await this.usersRepository.findByEmail(email);

if (!user) {
  throw new Error("Email or password incorrect!");
}
```

Assim é para o password:

```tsx
const isValidPassword = await compare(password, user.password);

if (!isValidPassword) {
	throw new Error("Email or password incorrect!");
}
```

Agora com todas as validações precisamos de fato gerar o token, para isso o JWT tem uma função chamada sign, onde o primeiro parâmetro é um objeto que pode ser preenchido com informações básicas como e-mail, nome ou usuário, isso facilita a vida do frontend já que com o acesso a este token é possível descriptografar e pegar essas informações, portanto não coloque dados sensíveis como passwords, documentos e etc... O segundo parâmetro é uma chave que você criar e coloca ali como uma string, o JWT vai usar a criptografia com base nessa chave, então escolha uma boa e o terceiro parâmetro é um objeto que contêm informações sobre o token, por exemplo o `subject` que é o dono desse token e o `expiresIn` que é o tempo que esse token vai durar no caso "1d" dura apenas um dia. Um exemplo de token:

```tsx
const token = sign({}, ".AGx.9JwW)FESW;~", {
  subject: user.id,
  expiresIn: "1d",
});
```
> 💡 Pergunta: Como funciona o middleware `ensureAuthenticated`?

Responda aqui

Primeiro é pego o header de authorization que contêm o token:

```tsx
const authHeader = request.headers.authorization;
```

Após isso é feito uma verificação para saber se o token está vindo:

```tsx
if (!authHeader) {
	throw new Error("Token missing");
}
```

E então é preciso pegar a parte que vem o token de fato, já que uma autenticação Bearer é composto por duas seções "Bearer token" por exemplo `"bearer I6MTYyiIjoiYzU5NjVkMWItMTc..."`

Para pegar a apenas o token:

```tsx
const [, token] = authHeader.split(" ");
```

Agora é a parte da verificação e como o verify lança um error caso o token é inválido precisamos colocar essa verificação dentro de um `try/catch` e chamar a função `verify` passando o token como primeiro parâmetro e o código que o token foi criado por segundo:

```tsx
const { sub: user_id } = verify(token, ".AGx.9JwW)FESW;~") as IPayload;
```

Como o retorno desse verify pode ser `string | (() => string)` é necessário fazer uma interface como o `IPayload` e forçar o retorno do `sub` como apenas string, o `IPayload` é assim:

```tsx
interface IPayload {
  sub: string;
}
```

Após a verificação é  preciso saber se o usuário com o id vindo do token realmente existe e isso é feio assim:

```tsx
const usersRepository = new UsersRepository();

const user = await usersRepository.findById(user_id);

if (!user) {
  throw new Error("User does not exist!");
}
```

Agora é só chamar a função `next()` para ir para o próximo.  E o `try/catch` fica assim:

```tsx
try {
    const { sub: user_id } = verify(token, ".AGx.9JwW)FESW;~") as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new Error("User does not exist!");
    }

    next();
  } catch (error) {
    throw new Error("Invalid Token");
  }
```

Pergunta: Qual a importância de ter um tratamento de exceções e uma classe de erro personalizada?

Sugestão: Documente a criação da classe `AppError` para futuras dúvidas.

Responda aqui

Podemos ter um controle maior sobre errors e conseguimos ter uma liberdade em errors customizáveis, por exemplo, se a aplicação necessitar de atributos além do `status code` e `message` então pode ser criado nesse classe própria.

> 💡 Pergunta: Como funciona o método `stat` e `unlink` do módulo `fs`?

Responda aqui

O `stat` verifica se um arquivo existe com o nome do arquivo passado pelo parâmetro, já o `unlink` deleta o arquivo, cujo o nome é passado por parâmetro.

> 💡 Sugestão: Explique sobre os testes unitários e testes de integração. Suas principais diferenças e qual propósito de cada um.

Responda aqui

O teste unitário é responsável por testar pequenas partes do nosso código, essa parte é o serviço da aplicação por exemplo um de criar usuário, especificamente o Use Case responsável por criar usuários e aplicar toda a regra de negócio. Já o teste de integração é responsável por testar o fluxo complexo da aplicação, enquanto o teste unitário foca apenas no service, o teste de integração foca desda rota, indo para o controller, serviços externos, use cases, repository e criação no banco de dados.<br />

`TDD` - é uma metodologia dirigida por testes, essa metodologia consiste em escrever os testes por primeiro e depois começar a desenvolver as funcionalidades.

> 💡 Pergunta: Qual a funcionalidade das funções `describe` , `it` e `toBe` ? (Exemplifique com código se achar necessário)

Responda aqui

`describe` é a função que inicia um tópico de teste, por exemplo `UserRepository` Já o `it` são os testes de fato da aplicação como `Should be able to delete a user` já o `toBe` é um método que verifica se o resultado que está vindo é igual ao valor passado por parâmetro no `toBe` por exemplo, `expect(2 + 2).toBe(4);`


> 💡 Pergunta: Em testes unitários não se deve trabalhar diretamente com o banco de dados. Como resolvemos o problema dos ***`useCases`*** que utilizam os repositórios?

> 💡 Pergunta: Como funciona a função `beforeEach`? Como ela nos ajuda? (Exemplifique com código se achar necessário)

Responda aqui

Para fazer testes com os `useCases` é necessário criar um novo `repository` apenas para rodar os testes, no caso da aplicação é criado um repository in memory, ou seja, um repository que usa um array como banco de dados.

o `beforeEach` é uma função que será executada antes dos testes acontecer, é importante para instanciar objetos necessários para o teste, como o próprio `useCase` e `repositories`.

> 💡 Sugestão: Ao utilizar a funcionalidade de `paths` do TypeScript, os testes executados por meio do Jest acusam erros de importação. Documente a configuração necessária no arquivo `jest.config.ts` para resolver esse problema.

(Exemplifique com código se achar necessário)

Responda aqui

Primeiro de tudo, precisamos importar uma função e um arquivo:

```tsx
import { pathsToModuleNameMapper } from "ts-jest/utils";

import { compilerOptions } from "./tsconfig.json";
```

a função `pathsToModuleNameMapper` é responsável por pegar todos os `path` e retornar um objeto contendo os `paths` da forma que `jest` entende. Para usar precisamos ir na propriedade `moduleNameMapper` e colocar a  função  `pathsToModuleNameMapper`  como valor:

```json
moduleNameMapper: pathsToModuleNameMapper(),
```

Agora o primeiro parâmetro dessa função é o array `paths` do objeto `compilerOptions` e como segundo passamos um objeto com uma chave `prefix` que recebe uma string, esta será o nome da `baseUrl` declarada anteriormente. Entretanto a string precisa ter `<rootDir>` Ficando assim:

```json
moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/src/",
}),
```

> 💡 Pergunta: Qual a responsabilidade da camada de `infra`? Quais arquivos devemos colocar nesse local?

Responda aqui

A camada `infra` recebe todos os arquivos que possuem código de terceiro como `frameworks` tipo o `TypeOrm` ou o `Express.js`.

> 💡 Explique sobre os Requisitos Funcionais (`RF`), Requisitos não Funcionais (`RNF`) e Regras de Negócio (`RN`).

Responda aqui

Requisitos funcionais são todas as funcionalidades da aplicação descrita pelo cliente por exemplo "Deve ser possível cadastrar um carro" ou "Deve ser possível cadastrar um usuário".

Já os requisitos não funcionais são as regras que definem a parte técnica da aplicação como qual tecnologia será usada para fazer upload de imagens.

E as regras de negócios são responsáveis por definirem como tal funcionalidade deve se comportar com determinado dado, por exemplo, "Um usuário não pode ter o mesmo email já cadastrado" ou "O aluguel de um carro deve ter duração mínima de 24 horas." e assim em diante.

> 💡 Pergunta: O que é uma *Foreign Key (Chave estrangeira)?* Sugestão: Documente a configuração de uma Foreign Key dentro de uma migration para uma futura consulta.

Responda aqui

Uma *Foreign Key* é uma chave que vem de outra tabela, geralmente o `id` de uma outra tabela. Por exemplo uma tabela user pode ter o `id`, caso existisse uma tabela que tivesse o `id` do user poderia receber uma *Foreign Key*, chamada `user_id`.

Para criar uma *Foreign Key*, na migration é necessário declarar a coluna normal dentro do `colums` por exemplo:

```tsx
columns: [
    {
      name: "id",
      type: "uuid",
      isPrimary: true,
    },
    {
      name: "name",
      type: "varchar",
    },
    {
      name: "category_id", // FK
      type: "uuid",
      isNullable: true,
    },
  ],
})
```

Com a `category_id` definida agora é preciso fazer a relação dela com a outra tabela, podemos passar um objeto `foreignKeys` logo depois, que recebe alguns parâmetro, por exemplo:

```tsx
columns: [
    {
      name: "id",
      type: "uuid",
      isPrimary: true,
    },
    {
      name: "name",
      type: "varchar",
    },
    {
      name: "category_id", // FK
      type: "uuid",
      isNullable: true,
    },
  ],
foreignKeys: [
    {
      name: "FKCategoryCar",
      referencedTableName: "categories",
      referencedColumnNames: ["id"],
      columnNames: ["category_id"],
      onDelete: "SET NULL",
      onUpdate: "SET NULL",
    },
	],
})
```

o `name` define o nome dessa *Foreign Key*, como padrão sempre colocamos FK no inicio depois o nome da coluna e depois o nome da tabela, já o `referencedTableName` recebe uma string com o nome da tabela de referência, bem semelhante o `referencedColumnNames` que referência a coluna no caso o `id` já o `columnNames` é o nome da coluna que vai receber esse `id` vindo da tabela `categories` o `onDelete` diz o que fazer quando alguma category for deletada, no caso ao deletar uma category nossa `FKCategoryCar` vai receber `null` e por fim o `onUpdate` que faz mesma coisa porém é ao atualizar uma category.

> 💡 Pergunta: Para que serve uma `seed` ? Como ela nos ajuda com a questão do usuário `admin` ?

Responda aqui

Seeds são usados para automatizar o processo de desenvolvimento são usados para criar entidades de teste como um usuário admin, ou seja, é um arquivo que ao ser rodado será criado no banco de dados vários exemplos que foram definidos no arquivo. No caso do usuário admin, nos ajudou pois não precisamos ficar criando o usuário na mão.

> 💡 Pergunta: Ao utilizar o `createQueryBuilder`, como funciona o `where` e `andWhere` ?

Responda aqui

`where` Coloca uma condição onde as os valores da tabela precisam satisfazer essa condição para ser escolhido, o `andWhere` é usado quando existe uma condição e é preciso fazer outra condição também necessária para ser satisfeita, ou seja, caso exista uma condição e precisamos de mais uma obrigatória usamos o `andWhere`.

> 💡 Pergunta: Como podemos criar Foreign Keys fora do `new Table` ?

Responda aqui

podemos usar o método `createForeignKey` do objeto `queryRunner` para isso após a criação da tabela que deseja realizar a criação da FK, por exemplo:

```tsx
await queryRunner.createTable(
      new Table({
        name: "specifications_cars",
        columns: [
          {
            name: "car_id",
            type: "uuid",
          },
          {
            name: "specification_id",
            type: "uuid",
          },
        ],
      })
    );
```

agora podemos passar como primeiro parâmetro do método `createForeignKey` o nome da tabela 

`specifications_cars` e como segundo parâmetro instanciamos a classe `TableForeignKey` passando um objeto no construtor:

```tsx
await queryRunner.createForeignKey(
    "specifications_cars",
    new TableForeignKey({})
);
```

 nesse objeto tem a chave `name` que é o nome da chave estrangeira, no caso `FKSpecificationCar` tem a `referencedTableName` que é a tabela de onde vem essa chave no caso `specifications`

 `referencedColumnNames` recebe um array de dos nomes da colunas que estão sendo referenciada da tabela `specifications` no caso apenas a `id` agora a `columnNames` é um array de nomes das tabelas que estão recebendo essas referencias no caso `specification_id` e por fim `onDelete` é oque é para fazer ao deletar o dado usado para referência, no caso colocar NULL e assim o `onUpdate` porém ao atualizar:

```tsx
await queryRunner.createForeignKey(
    "specifications_cars",
    new TableForeignKey({
      name: "FKSpecificationCar",
      referencedTableName: "specifications",
      referencedColumnNames: ["id"],
      columnNames: ["specification_id"],
      onDelete: "SET NULL",
      onUpdate: "SET NULL",
    })
  );
```

> 💡 Pergunta: Como funciona o decorator de relacionamento `@ManyToMany` ?

Sugestão: Documente sobre as configurações necessárias para esse decorator.

(Exemplifique com código se achar necessário)

Responda aqui

`@ManyToMany` é para fazer uma relação de muitos para muitos, o código funciona parecido com o `@ManyToOne` porém de muitos para muitos.


> 💡 Pergunta: Utilizando o [multer](https://www.npmjs.com/multer), como podemos receber mais de um arquivo? Como podemos enviar esses arquivos no Insomnia (ou outro app que esteja utilizando)?

Responda aqui

Para receber várias imagens, podemos colocar um `middlerware` parecido com o de enviar uma foto porém ao invés do método `single` utilizamos o método `array` assim:

```tsx
carsRoutes.post(
  "/images",
  upload.array("images"),
  uploadCarImagesController.handle
);
```

Lembrando que images sendo passado como parâmetro será o nome do campo que vai ser enviado em uma requisição, por exemplo no multipart uma requisição ficaria assim:

![File](https://ik.imagekit.io/dwei78ukbe/upload_DJ5Fpmse-.png)

Com isso declarado no `middleware` agora a `request` tem um atributo chamado `files` que retorna o Array do tipo `Express.Multer.File` que são justamente todos os arquivos do upload.

> 💡 Pergunta: O que faz o seguinte código de SQL? `alter table users add primary key(id)`

Responda aqui

Altera a tabela `users` para transformar o `id` em uma chave primária.

> 💡 Pergunta: Como podemos utilizar o Day.js em UTC?

(Exemplifique com código se achar necessário)

Responda aqui:

Primeiro de tudo, é necessário importar o `dayjs` e o plugin que vem instalada junto com a lib chamado `utc` importamos assim:

```tsx
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
```

Agora podemos pegar a data que queremos e formatar para isso podemos usar a função assim:

```tsx
const dateNow = dayjs()
```

agora com a data atual em formato `string` podemos passar a mesma para o padrão UTC usando o método `utc` assim:

```tsx
const dateNow = dayjs().utc();
```

Após isso usamos o método `local` e `format`  para formatar a data, ficando assim:

```tsx
const dateNow = dayjs().utc().local().format();
```

> 💡 Pergunta: Como criar um *provider* de data deixa o nosso código mais organizado e escalável?

Responda aqui

Para fazer isso precisamos de uma classe chamada `DayjsDateProvider` importante colocar o nome da dependência já que em um futuro podemos trocar de dependência então é importante separarmos pelo próprio nome. Além disso, importante criarmos uma interface para conter os métodos que serão implementados pelas classes que terão o papel de tratar data, pro em quanto apenas a `DayjsDateProvider` a interface pode ser assim:

```tsx
interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): string;
  dateNow(): Date;
}

export { IDateProvider };
```

agora classe implementa essa interface usando a dependência, no caso:

```tsx
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number {
    const startDateUtc = this.convertToUTC(start_date);
    const endDate = this.convertToUTC(end_date);

    return dayjs(endDate).diff(startDateUtc, "hours");
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  dateNow(): Date {
    return dayjs().toDate();
  }
}

export { DayjsDateProvider };
```

> 💡 Pergunta: Porque é importante colocar `isNullable` em algumas colunas da *migration* de `CreateRentals` ?

Responda aqui

Quando criamos um rental algumas colunas não serão preenchida ou seja, o valor padrão vai tem que ser `null` porém o banco de dados não permite coluna como null por padrão, então precisamos passar `isNullable` como `true`


> 💡 Pergunta: Como a lib [supertest](https://www.npmjs.com/package/supertest) ajuda a criar os testes de integração? Quais as configurações necessárias no projeto para utilizar essa lib? (Exemplifique com código se achar necessário)

Responda aqui

Esta lib ajuda com as requisições que serão feitas pelos `contollers` Primeiro precisamos tirar o servidor do `app`  `express` pois o servidor é responsável apenas de subir o server com o `listen` já o `app` por configurar o servidor seja com as rotas tanto da documentação com de `controllers` e por colocar `middlewares` como o que trata `errors` jogados pelos os use cases.

Para configurar precisamos importar o  `app` e o `request` do `supertest`

```tsx
import request from "supertest";
import { app } from "@shared/infra/http/app";
```

agora criamos um teste do `jest` com o `it`:

```tsx
describe("Create category controller", () => {
  it("test", async () => {

  });
});
```

após isso damos uma `request` do tipo `get` passando como parâmetro o `app` na rota `"/cars/available"` e um `expect` passando como parâmetro 200 pois esperamos que esta rota retorne Ok.

```tsx
describe("Create category controller", () => {
  it("test", async () => {
    await request(app).get("/cars/available").expect(200);
  });
});
```

> 💡 Sugestão: Documente sobre a configuração do teste para criar o usuário admin, criar o seu token e utilizá-lo nas *requests*.

Responda aqui

Para criar o usuários fazemos isso na callback da função `beforeAll` que é justamente a função que vai ser executada uma vez antes de tudo:

```tsx
beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const passwordHash = await hash("admin", 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      VALUES('${id}', 'admin', 'admin@rentx.com.br', '${passwordHash}', true,'now()','123')`
    );
  });
```

Agora com o usuário admin estamos disponível  para usa-lo nas rotas que precisam, no caso para criar uma category antes precisamos estar logado, ou seja, fazemos a seção no mesmo `it` ficando assim:

```tsx
it("Should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { token } = responseToken.body;
});
```

Muito simples a seção criada temos acesso ao token que é retornado no body. Agora, vamos colocar a request post na rota `categories` enviando um `name` e uma `description` assim:

```tsx
it("Should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { token } = responseToken.body;

	const response = await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Supertest",
  });
});
```

Porém se rodarmos esse teste vamos receber um `statusCode` 401 pois a nossa requisição não possui um token de um admin. Para passarmos o token usamos o método `set` passando um objeto com uma chave chamada `Authorization` que recebe uma string que é justamente o nosso token, lembrando que usamos o token do tipo Bearer, ou seja, precisamos concatenar o mesmo desta forma ``Bearer ${token}`` ficando assim:

```tsx
it("Should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Supertest",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });
  });
```

Por fim, colocamos o que esperamos que no caso é um 201 de criado que deve estar no `statusCode` da response:

```tsx
it("Should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Supertest",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.statusCode).toBe(201);
  });
```

> 💡 Pergunta: Como funciona o uso do `createQueryBuilder()` para atualizar a disponibilidade do carro?

Responda aqui

`createQueryBuilder()` é usado para montar uma `query` com as funções, então após o método `createQueryBuilder()` é possível usar outros métodos como `update()` `set()` `where()` e entre outros.

> 💡 Pergunta: Como funciona o método `compareInDays` do provider de data?

Sugestão: Explique como ficou a regra de negócio do `DevolutionRentalUseCase`.

Responda aqui

`compareInDays` recebe dois parâmetros `start_date` e `end_date` essas datas são convertidas para UTC e retornada a quantidade de dias que existem entre o `start_date` e o `end_date` 

a RN do `DevolutionRentalUseCase` diz que uma devolução de um carro feita em menos de 24h a diária vai se cobrada por completo, além das multas caso tenham.


> 💡 Pergunta: Porque foi preciso corrigir os métodos `findOpenRentalByCar` e `findOpenRentalByUser`?

Responda aqui

Os métodos como o próprio nome já diz, é para buscar carros cujo estão disponíveis para serem alugados e os carros que estavam sendo buscados eram não só os disponíveis como os não disponíveis, pois a condição passada não verificava que o `end_date` era null.

> 💡 Pergunta: Ao fazer uma busca no banco de dados, como podemos trazer os objetos de relacionamentos? Qual a configuração necessária na entidade para essa funcionalidade?

Responda aqui

Na entidade é necessário que criamos um atributo que será o objeto relacionado, no caso o `car` e também continuamos com o `car_id` pois é através dessa coluna que o `car` será relacionado. Para isso, passamos o decorator `@ManyToOne` com uma callback retornando a entidade `Car` que é a entidade do objeto relacionado e por fim, o decorator `@JoinColumn` passando um objeto com o `name` da coluna que será usada para relacionar, no caso `car_id` Ficando assim:

```tsx
@Entity("rentals")
class Rental {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Car)
  @JoinColumn({ name: "car_id" })
  car: Car;

  @Column()
  car_name: string;
}
```

> 💡 Pergunta: Qual a configuração necessária no swagger para informar que uma rota precisa ser autenticada?

(Exemplifique com código se achar necessário)

Responda aqui

Primeiro, criamos um `component` e dentro passamos um `securitySchemes` assim:

```json
"components": {
    "securitySchemes": {}
    }
  }
```

Após isso, passamos um `bearerAuth` que o tipo de autenticação que estamos usando, e esse objeto recebe um `type` que vai ser `http` , um `scheme` que vai ser `bearer` e por fim,  um `bearerFormat` que recebe JWT. Ficando assim:

```json
"components": {
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    }
  }
```

Agora toda vez que precisamos de uma rote com autenticação podemos passar o seguinte:

```json
"security": [
  { "bearerAuth": [] }
],
```

Como por exemplo nas rotas de criação de uma category:

```json
...
"/categories": {
      "post": {
        "tags": ["Category"],
        "summary": "Create category",
        "description": "Create new Category",
        "security": [
          { "bearerAuth": [] }
        ],
...
```

> 💡 Pergunta: Como podemos receber um parâmetro de rota no Swagger? Qual a configuração necessária para enviar múltiplos na requisição do Swagger?

(Exemplifique com código se achar necessário)

Responda aqui

Através da propriedade `parameters` que recebe um objeto contendo o `name` que é justamente o nome do parâmetro, o `in` que mostra por onde esse parâmetro vai vir, no caso `path` significa que vai vir da rota, o `description` que é a descrição, o `required` mostra que é um parâmetro obrigatório (por mais que todos os `params` sejam obrigatórios, é necessário passar mesmo assim para ser feita a estilização nas docs) e por fim, o `schema` que é um objeto dizendo com uma propriedade chamada `type` que diz o tipo do parâmetro. Por exemplo:

```json
"parameters": [
  {
    "name": "id",
    "in": "path",
    "description": "Car id",
    "required": true,
    "schema": {
      "type": "string"
    }
  }
],
```

> 💡 Pergunta: Quais as refatorações necessárias para que os testes passem?

Responda aqui

Primeiro foi preciso criarmos um carro antes de fazer o teste de qualquer renta, pois agora estamos aplicando essa regra de negócio no `use case` e outra mudança foi colocar dentro do `expect` apenas o método que esperamos que algo aconteça de fato. Por fim, mudamos o método de verificação no expect, antes era o `toBeInstanceOf` e agora é `toEqual`.

> 💡 Pergunta: Por qual motivo precisamos de um Refresh Token?

Responda aqui

Colocar um tempo longo como 1 dia ou mais, não é tão seguro. Pois, pode acontecer de acontecer um roubo ou vazamento do token de um usuário, porém colocar um tempo muito curto faz com que o usuário precise ficar se autenticando muitas vezes e claramente isso é uma péssima experiência. Então, para resolver esse problema utilizamos o Refresh Token.

> 💡 Pergunta: Por qual motivo precisamos salvar o Refresh Token no banco de dados?

Responda aqui

Precisamos disso, pois para gerar um novo token o refresh token precisa ser consultado e ser comparado com o refresh token vindo do usuário, caso seja valido e o refresh token não tenha expirado, então é feito um novo token.

> 💡 Pergunta: Como funciona o fluxo de Refresh Token?

Responda aqui

Então, a aplicação recebe um `refresh token` e se for válido, é criado um novo `refresh token` e o antigo é removido e o novo é colocado no banco de dados.

> 💡 Pergunta: Como a ferramenta [Ethereal](https://ethereal.email/) nos ajuda? <br />
Pergunta: Para que serve a lib [Nodemailer](https://nodemailer.com/about/)?

Responda aqui

O Ethereal é uma ferramenta que faz a configuração necessária para enviar um email, então não precisamos se preocupar com esse tipo de informação no ambiente de desenvolvimento. Ou seja, configuração de host, porta, segurança, e criar autenticação, isso tudo é gerado por esta ferramenta.

Já o `Nodemailer` é a ferramente que envia de fato o email, então o assunto, o copo, o destinatário e entre outros detalhes do email, é feito no `Nodemailer`.