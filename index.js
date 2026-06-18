const express = require('express');

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

app.get('/users', (req, res) => {
    res.json(users);
})

app.get('/users/:id', (req, res) => {
    const user = getUserIdFromRequest(req, res);
    if (!user) return;
    res.json(user)
})

app.post('/users', (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.status(400).json({
            'message': 'El nombre es requerido'
        })
        return;
    }
    users.push({
        id: users[users.length - 1].id + 1,
        name
    })
    res.status(201).json({
        message: `Se ha creado el usuario ${name} correctamente`,
        res: users
    })
})

app.put('/users/:id', (req, res) => {
    const userObtainer = getUserIdFromRequest(req, res);
    if (!userObtainer) return;
    const index = users.findIndex(user => user.id === userObtainer.id);
    if (!req.body?.name) {
        res.status(400).json({
            'message': 'No se encuentran propiedades name'
        })
        return;
    }

    if(!req.body?.name?.trim()){
        res.status(406).json({
            'message': 'La propiedad name no puede estar vacía'
        })
        return;
    }
    users[index].name = req.body.name;
    res.status(200).json({
        'message': 'Usuario modificado correctamente',
        'res': users[index]
    })

})

app.delete('/users/:id', (req, res) => {
    const userObtainer = getUserIdFromRequest(req, res);
    if (!userObtainer) return;

    const index = users.findIndex(user => user.id === userObtainer.id);
    if (index !== -1) {
        users.splice(index, 1)
        res.status(200).json({
            'message': `Se elimino el usuario ${userObtainer.name} correctamente`
        })
        return;
    }

})

app.listen(port, () => {
    console.log(`listening in http://localhost:${port}`);
})