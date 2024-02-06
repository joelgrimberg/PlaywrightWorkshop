import { faker } from "@faker-js/faker";

export class AccountGenerator {
  constructor() {
    faker.seed();
  }

  public createRandomUser() {
    return {
      name: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  }
}
