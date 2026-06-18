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
        res.json({
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

app.delete('/user/:id', (req, res) => {
    const userObtainer = getUserIdFromRequest(req, res);
    if (!userObtainer) return;

    const index = users.findIndex(user => user.id === userObtainer.id);
    if (index !== -1) {
        users.splice(index, 1)
        res.json({
            'message': `Se elimino el usuario ${userObtainer.name} correctamente`
        })
        return;
    }

})

app.put('/user/:id', (req, res) => {
    const userObtainer = getUserIdFromRequest(req, res);
    if (!userObtainer) return;
    const index = users.findIndex(user => user.id === userObtainer.id);
    if(!req.body){
        res.json({
            'message':'No se encuentran propiedades en el body'
        })
        return;
    }
    users[index].name = req.body.name;
    res.json({
        'message':'Usuario modificado correctamente',
        'res': users[index]
    })

})

app.listen(port, () => {
    console.log(`listening in http://localhost:${port}`);
})