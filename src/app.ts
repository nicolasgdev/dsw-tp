import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { User } from './user/user.entity.js';
import { UserRepository } from './user/user.repository.js';

dotenv.config();

const app = express();
app.use(express.json()); //Middleware
const PORT = process.env.PORT;

const repository = new UserRepository();

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
  res.json({ data: repository.findAll() });
});

app.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const user = repository.findOne({ id });
  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }
  res.json({ data: users });
});

app.post('/api/users', sanitizeUserInput, (req, res) => {
  const input = req.body.sanitizedInput;

  const userInput = new User(
    input.id,
    input.dni,
    input.name,
    input.surname,
    input.email
  );

  const user = repository.add(userInput);
  return res.status(201).send({ message: 'User created', data: user });
});

app.put('/api/users/:id', sanitizeUserInput, (req, res) => {
  req.body.sanitizedInput.id = req.params.id;
  const user = repository.update(req.body.sanitizedInput);

  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }

  res.status(200).send({ message: 'User edited successfully!', data: user });
});

app.patch('/api/users/:id', sanitizeUserInput, (req, res) => {
  req.body.sanitizedInput.id = req.params.id;
  const user = repository.update(req.body.sanitizedInput);

  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }

  res.status(200).send({ message: 'User edited successfully!', data: user });
});

app.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const user = repository.delete({ id });

  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }
  return res.status(200).send({ message: 'User deleted successfully' });
});

app.use((_, res) => {
  res.status(404).send({ message: 'Resource not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
