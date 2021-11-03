# 🚗 Rentx
API Restful to rent cars

## 🔧 Requirements
The functions requirements and nonfunctional requirements are on this [file](func.md)

## 📃 Notes
Some of my answers to questions are on this [file](caderno.md).

## 🎖 Extra mile
- [X] Delete images of a car.

## 🔨 Architecture
First of all, I used Clean Architecture, to learn some architecture that is used in the real world, so I don’t know a lot of architecture yet. However, I will try to explain why is Clean Architecture in this project.

1. The code is more testable than other architectures like MVC (Model - View - Controller).

2. The project is separated into layers that have one purpose. Therefore, it’s easy to navigate between them, and if I have something to do with the database, I know that I have to go to the Data Layer, or if I have to fix some business rule, I go to the Use Case layer, and so on…

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

and then start to immigrate all the inject of DayjsDateProvider to `DatefnsDateProvider`. For example, in the CreateRentalUseCase:

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


## 🔷 Database Diagram
<img src="public/diagram.png" />
