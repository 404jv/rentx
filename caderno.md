> 💡 Pergunta: Por definição, o que é o TypeScript? Quais os benefícios em utilizá-lo no projeto?

Responda aqui

Typescript é um conjunto de tipagens feita para o Javascript pela Microsoft e mantido em opensource.

Alguns do benefício de se utilizar:

- Produtuvidade maior
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