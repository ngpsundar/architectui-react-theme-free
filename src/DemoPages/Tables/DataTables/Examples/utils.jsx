import { faker } from "@faker-js/faker";

const range = (len) => {
  return Array.from({ length: len }, (_, i) => i);
};

const newPerson = () => {
  const statusChance = Math.random();
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int({ min: 18, max: 60 }),
    visits: faker.number.int({ min: 0, max: 100 }),
    progress: faker.number.int({ min: 0, max: 100 }),
    status:
      statusChance > 0.66
        ? "relationship"
        : statusChance > 0.33
        ? "complicated"
        : "single",
  };
};

export function makeData(len = 5553) {
  return range(len).map(() => ({
    ...newPerson(),
    children: range(10).map(newPerson),
  }));
}
