import {
    delUser,
    getAllUsers,
    getUserById,
    getUsersByRange,
    postUser,
    putUser
} from "../services/users.services.js";

export const getUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        return res.json(users);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener los usuarios'
        });
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await getUserById(req.validatedId);

        if (!user) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            })
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener el usuario'
        });
    }
}

export const createUser = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                'message': 'El nombre es requerido'
            })

        }

        const user = await postUser(name);

        return res.status(201).json({
            message: `Se ha creado el usuario ${name} correctamente`,
            res: user
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error al crear el usuario'
        });
    }
}

export const updateUser = async (req, res) => {
    try {
        const userObtainer = await getUserById(req.validatedId);

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

        const user = await putUser(req.validatedId, name);

        return res.status(200).json({
            'message': 'Usuario modificado correctamente',
            'res': user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Error al actualizar el usuario'
        });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const wasDeleted = await delUser(req.validatedId);

        if (!wasDeleted) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            })
        }

        return res.json({
            message: 'Usuario eliminado correctamente'
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error al eliminar el usuario'
        });
    }
}

export const getUserByIdRange = async (req, res) => {

    const { sinceId, fromId } = req.params;

    if (isNaN(sinceId) || isNaN(fromId)) {
        return res.status(400).json({
            message: 'ID inválido'
        });
    }

    const users = await getUsersByRange(sinceId, fromId);

    if (!users) {
        return res.status(404).json({
            message: 'No se encontró ningún usuario con ese ID'
        })
    }

    return res.status(200).json({
        users
    })

}