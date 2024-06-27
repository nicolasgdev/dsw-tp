import express from 'express';
import dotenv from 'dotenv';
import { userRouter } from './user/user.routes.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT;
//Middlewares
app.use(express.json());
app.use('/api/users', userRouter);
app.use((_, res) => {
    res.status(404).send({ message: 'Resource not found' });
});
//Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
//# sourceMappingURL=app.js.map