import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { User } from './user.js';

dotenv.config();

const app = express();
app.use(express.json()); //Middleware
const PORT = process.env.PORT;

const users = [new User('1', '182834', 'Matt', 'Tuck', 'bfmv@gmail.com')];

function sanitizeUserInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    id: req.body.id,
    dni: req.body.dni,
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
  }; // Middleware
  //more checks here (content, type)

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined)
      delete req.body.sanitizedInput[key];
  }); // Remove undefined
  next();
}

app.get('/api/users', (req, res) => {
  res.json({ data: users });
});

app.get('/api/users/:id', (req, res) => {
  const user = users.find((user) => user.id === req.params.id);
  if (!user) {
    res.status(404).send({ message: 'user not found' });
  } else {
    res.json({ data: users });
  }
});

app.post('/api/users', sanitizeUserInput, (req, res) => {
  const input = req.body.sanitizedInput;

  const user = new User(
    input.id,
    input.dni,
    input.name,
    input.surname,
    input.email
  );

  users.push(user);
  res.status(201).send({ message: 'User created', data: user });
});

app.put('/api/users/:id', sanitizeUserInput, (req, res) => {
  const userIdx = users.findIndex((user) => user.id === req.params.id);

  if (userIdx === -1) {
    res.status(404).send({ message: 'User not found' });
  } else {
    users[userIdx] = { ...users[userIdx], ...req.body.sanitizedInput };

    res
      .status(200)
      .send({ message: 'User edited successfully!', data: users[userIdx] });
  }
});

app.patch('/api/users/:id', sanitizeUserInput, (req, res) => {
  const userIdx = users.findIndex((user) => user.id === req.params.id);

  if (userIdx === -1) {
    res.status(404).send({ message: 'User not found' });
  } else {
    users[userIdx] = { ...users[userIdx], ...req.body.sanitizedInput };
  }
  res
    .status(200)
    .send({ message: 'User edited successfully!', data: users[userIdx] });
});

app.delete('/api/users/:id', (req, res) => {
  const userIdx = users.findIndex((user) => user.id === req.params.id);
  if (userIdx === -1) {
    res.status(404).send({ message: 'User not found' });
  } else {
    users.splice(userIdx, 1);
    res.status(200).send({ message: 'User deleted successfully' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
