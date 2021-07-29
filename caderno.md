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