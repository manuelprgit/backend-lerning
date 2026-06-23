import { Router } from "express";

import {
    createUser,
    deleteUser,
    getUser,
    getUserByIdRange,
    getUsers,
    updateUser
} from "../controllers/users.controllers.js";
import validateIds from "../middlewares/validateIds.js";

const router = Router();

router.get('/users', getUsers);
router.get('/users/:id', validateIds, getUser);
router.post('/users', createUser);
router.put('/users/:id', validateIds, updateUser);
router.delete('/users/:id', validateIds, deleteUser);
router.get('/users/:sinceId/:fromId', getUserByIdRange);

export default router;