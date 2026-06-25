import express from 'express'
import { connectDB } from './config/db.js';
import router from './routes/users.routes.js';
import { logger } from './middlewares/logger.middleware.js';
await connectDB();

const app = express();
const port = 3000;

app.use(express.json());
app.use(logger);
app.use(router);

app.listen(port, () => {
    console.log(`listening in http://localhost:${port}`);
})