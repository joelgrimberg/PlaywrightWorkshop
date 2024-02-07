import { faker } from "@faker-js/faker";

export class Generator {
  constructor() {
    faker.seed();
  }

  public generateUser() {
    return {
      name: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  }

  public generateTodo() {
    return {
      title: faker.lorem.sentence(),
      priority: faker.helpers.arrayElement(["Important", "Not Important"]),
    };
  }
}

export type todo = {
  title: string;
  priority: string;
};
