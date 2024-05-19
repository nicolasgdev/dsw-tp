import express from 'express';
import dotenv from 'dotenv';
import { User } from './user.js';

dotenv.config();

const app = express();
app.use(express.json()); //Middleware
const PORT = process.env.PORT;

const users = [new User('1', '182834', 'Matt', 'Tuck', 'bfmv@gmail.com')];

app.get('/api/users', (req, res) => {
  res.json({ data: users });
});

app.get('/api/users/:id', (req, res) => {
  const user = users.find((user) => user.id === req.params.id);
  if (!user) {
    res.status(404).send({ message: 'user not found' });
  }
  res.json({ data: users });
});

app.post('/api/users', (req, res) => {
  const { id, dni, name, surname, email } = req.body;

  const user = new User(id, dni, name, surname, email);

  users.push(user);
  res.status(201).send({ message: 'User created' });
});

app.put('/api/users/:id', (req, res) => {
  const userId = users.findIndex((user) => user.id === req.params.id);

  if (userId === -1) {
    res.status(404).send({ message: 'User not found' });
  }
  const input = {
    id: req.body.id,
    dni: req.body.dni,
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
  };
  users[userId] = { ...users[userId], ...input };

  res
    .status(200)
    .send({ message: 'User edited successfully!', data: users[userId] });
});

app.delete('/api/users/:id', (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
