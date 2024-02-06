import { faker } from "@faker-js/faker";

export class AccountGenerator {
  constructor() {}

  public createRandomUser() {
    return {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  }
}
