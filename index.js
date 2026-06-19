import express from 'express'
import { getUsers, getUser, createUser, updateUser, deleteUser } from './src/controllers/users.controllers.js';

const app = express();
const port = 3000;

app.use(express.json());

const users = [
    {

        id: 1,
        name: 'Manuel'
    },
    {
        id: 2,
        name: 'Angel'
    },
    {
        id: 3,
        name: 'Warrant'
    },
];

const getUserIdFromRequest = (req, res) => {
    const userId = Number(req.params.id);
    const user = users.find(user => user.id === userId)
    if (!user) {
        res.status(404).json({
            'message': `Usuario con el id ${req.params.id} no fue encontrado`
        })
        return null;
    }
    return user;
}

app.get('/users', getUsers);

app.get('/users/:id', getUser);

app.post('/users', createUser);

app.put('/users/:id', updateUser);

app.delete('/users/:id', deleteUser)

app.listen(port, () => {
    console.log(`listening in http://localhost:${port}`);
})