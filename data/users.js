import bcrypt from "bcryptjs";

const users = [
  {
    name: "admin",
    email: "test1@test.com",
    password: bcrypt.hashSync('12345'),
    isAdmin: true,
  },
  {
    name: "ali",
    email: "test2@test.com",
    password: bcrypt.hashSync('78797987'),
    isAdmin: false,
  },
];

export default users