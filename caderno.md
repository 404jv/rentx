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
