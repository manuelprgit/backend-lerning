import {
    delUser,
    getAllUsers,
    getUserById,
    postUser,
    putUser
} from "../services/users.services.js";

export const getUsers = (req, res) => {
    const users = getAllUsers();
    return res.json(users);
}

export const getUser = (req, res) => {
    const id = Number(req.params.id);
    const user = getUserById(id);

    if (!user) {
        return res.status(404).json({
            message: 'Usuario no encontrado'
        })
    }

    return res.status(200).json(user);
}

export const createUser = (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({
            'message': 'El nombre es requerido'
        })

    }

    const users = postUser(name);

    return res.status(201).json({
        message: `Se ha creado el usuario ${name} correctamente`,
        res: users
    })
}

export const updateUser = (req, res) => {
    const userId = Number(req.params.id);
    const userObtainer = getUserById(userId);

    if (!userObtainer) {
        return res.status(400).json({
            message: 'No se encontró ningún usuario con ese ID'
        });
    }

    const name = req.body?.name

    if (!name?.trim()) {
        return res.status(406).json({
            'message': 'La propiedad name no puede estar vacía'
        })

    }

    const user = putUser(userId, name);

    return res.status(200).json({
        'message': 'Usuario modificado correctamente',
        'res': user
    })
}

export const deleteUser = (req, res) => {

    const userId = Number(req.params.id);
    const wasDeleted = delUser(userId);

    if (!wasDeleted) {
        return res.status(404).json({
            message: 'Usuario no encontrado'
        })
    }

    return res.json({
        message: 'Usuario eliminado correctamente'
    })
}
