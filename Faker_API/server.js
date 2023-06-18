
const express = require("express");
const app = express();
const { faker } = require('@faker-js/faker');


// make sure these lines are above any app.get or app.post code blocks
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

// req is short for request
// res is short for response
app.get("/api", (req, res) => {
  res.send("Our express api server is now sending this over to the browser");
});

const server = app.listen(8000, () =>
  console.log(`Server is locked and loaded on port ${server.address().port}!`)
);

const createUser = () => {
  const newUser = {
    password: faker.internet.password(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.number(),
    lastName: faker.person.lastName(),
    firstName: faker.person.firstName(),
    _id: faker.number.int()
  };
  return newUser;
};

const createCompany = () => {
  const newCompany = {
    _id: faker.number.int(),
    name: faker.company.name(),
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      country: faker.location.country()
    }
  };
  return newCompany;
};

const newFakeUser = createUser();
console.log(newFakeUser);

app.get("/api/users/new", (req, res) => {
 res.json({ newFakeUser });
});

const newFakeCompany = createCompany();
console.log(newFakeCompany);

app.get("/api/companies/new", (req, res) => {
  res.json({ newFakeCompany });
});

app.get("/api/user/company", (req, res) => {
  res.json ( {newFakeUser, newFakeCompany});
});