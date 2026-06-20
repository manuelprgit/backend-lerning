import { Router } from "express";

import { 
    createUser, 
    deleteUser, 
    getUser, 
    getUsers, 
    updateUser 
} from "../controllers/users.controllers";

const router = Router();

app.get('/users', getUsers);
app.get('/users/:id', getUser);
app.post('/users', createUser);
app.put('/users/:id', updateUser);
app.delete('/users/:id', deleteUser)

export default router;