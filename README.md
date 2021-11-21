# 🚗 Rentx
API Restful to rent cars


## ❓ Why?
This project was created during the Rocketseat Bootcamp. Therefore, it’s for my portfolio, so, I really appreciate any feedback that you can give me about the project, code, architecture, design pattern, or anything else that you could report because this makes me a better developer. To help me with that, you can email me: [joaovictorramalho7@gmail.com](mailto:joaovictorramalho7@gmail.com), or connect with me on [LinkedIn](https://www.linkedin.com/in/404jv/), or even open an issue [here](https://github.com/404jv/rentx/issues/new).

## 🔧 Requirements
The functions requirements and nonfunctional requirements are on this [file](func.md)

## 📃 Notes
Some of my answers to questions are on this [file](caderno.md).

## 🎖 Extra mile
- [X] Delete images of a car.
- [ ] Fix error when create a new car with a non-existent category.

## ⚖ Rest
The goal of the rest is basic improve some details in a web service. There are a lot of benefits that Rest gives to us, for example, performance and reliability. Performance is one of the factors that make the users use an APP, so, the higher the speed the better, and the reliability is important to the service, since, other applications will consume the API, it’s important that clear communications between them happen.

Now, about this API. It is separated from the client, the API is stateless. Therefore, every request is different from each other, for example, the route `cars/images` needs a bearer token to authenticate, and so if a user does two requests to this route, both requests must have the user’s token. 

The Uniform Interface is applied here, in all the routes, messages, and resources, I tried to make it more clear possible. So, when the token was not sent in a request, the error is `“Token missing”` and the status code is 401, also, some routes are self-explanatory, for example, the route to upload an avatar is `users/avatar`, and the methods HTTP is used to describe the communication as well. The route to list categories (“categories/”) is a GET because I just want to retrieve data about the resource (categories) and the route to create a category is a POST. 

I’m sure there are some details that Rest has and this API does not follow or even more, some break of the Rest’s rules. That’s because I’m not familiar with it, and my ignorance around this topic doesn’t let me correct it. Of course, I always will correct the mistakes, so, if you see some let me know it (you can open an issue [here](https://github.com/404jv/rentx/issues/new)) 😉.

## 🔨 Architecture
First of all, I used Clean Architecture, to learn some architecture that is used in the real world, so I don’t know a lot of architecture yet. However, I will try to explain why is Clean Architecture in this project.

1. The code is more testable than other architectures like MVC (Model - View - Controller).

2. The project is separated into layers that have one purpose. Consequently, it’s easy to navigate between them, and if I have something to do with the database, I know that I have to go to the Data Layer, or if I have to fix some business rule, I go to the Use Case layer, and so on…

3. When the project is already structured is easy to implement a new feature, since everything is separated, we don’t have to worry if we are going to break something that has nothing to do with the new feature. Of course, it’s not impossible to do that but it’s not frequent as other architectures.

4. If the project needs to change some dependencies, the process to do that is going to be easier, since the layers don’t affect each other. For example, in this project, I’m using [dayjs](src/shared/container/providers/DateProvider/implementations/DayjsDateProvider.ts) to compare dates in days, hours, and so on… If the project needs to change this lib to [date-fns](https://github.com/date-fns/date-fns), what I have to do is create a new class called `DatefnsDateProvider` that implements the interface [IDateProvider](src/shared/container/providers/DateProvider/IDateProvider.ts) that have all methods needed for the project, I implement those methods using date-fns, I register a singleton (in this [file](src/shared/container/providers/index.ts)) for the `DatefnsDateProvider` like this: 

```ts
...
container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
);

container.registerSingleton<IDateProvider>(
  "DatefnsDateProvider",
  DatefnsDateProvider
);
...
```

And then start to immigrate all the injections of DayjsDateProvider to `DatefnsDateProvider`. For example, in the CreateRentalUseCase:

```typescript
...
@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DayjsDateProvider") // Here would be like @inject("DatefnsDateProvider")
    private dateProvider: IDateProvider,
...
```
it must be emphasized that this project does not follow every single detail of the Clean Architecture, so, some files are in different places. For example, the unity tests and integration tests are together on their use case:

    .
    ├── useCases
    │   ├── CreateCategory                        # Use Case
    │   │   ├── CreateCategoryController.spec.ts  # Integration test
    │   │   ├── CreateCategoryController.ts
    │   │   ├── CreateCategoryUseCase.spec.ts     # Unit test
    │   │   └── CreateCategoryUseCase.ts
    │   └── ... 
    └── ...

I think this is better because when I see them I know that those tests are for `CreateCategory`, and If I want to search for a specific test I know that it’s in the same folder as its use case. Furthermore, other details that do not follow exactly the Clean Architecture, but it’s fine because architecture like this is created for a lot of different scenarios, and for some projects, it needs to adapt some things.

## 🚀 Run project

**Clone Repository**
```bash
$ git clone https://github.com/404jv/rentx
```

**Enter directory**
```bash
$ cd rentx
```

**Install dependencies, if you use npm**
```bash
$ npm install
```

<p align="center">or<p>

**Install dependencies, if you use yarn**
```bash
$ yarn
```

**Open `psql` and create the database**
```sql
$ CREATE DATABASE rentx;
```

**Open the file `ormconfig.json` and change the config for your database**
```json
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "docker",
  "password": "ignite",
  ...
}
```
**Open the file `docker-compose.yml` and change the config as well**
```yml
environment:
  - POSTGRES_USER=docker
  - POSTGRES_PASSWORD=ignite
  - POSTGRES_DB=rentx
```

**Now run docker**
```bash
$ docker-compose up
```

## 🔷 Database Diagram
<img src="public/diagram.png" />
