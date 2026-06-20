import express from 'express'
import { connectDB } from './src/config/db.js';
import router from './src/routes/users.routes.js';
await connectDB();

const app = express();
const port = 3000;

app.use(express.json());
app.use(router)

app.listen(port, () => {
    console.log(`listening in http://localhost:${port}`);
})