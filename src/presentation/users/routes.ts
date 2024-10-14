import { Router } from "express";
import { UsersController} from "./controller";

export class UsersRoutes{

    static get routes(): Router{
        const router = Router();
        const usersController = new UsersController();

        router.get('/',usersController.getUsers);
        router.get('/:id', usersController.getUserById);

        router.post('/', usersController.createUser);
        router.put('/:id', usersController.updateUser);
        router.delete('/:id', usersController.deleteUser)

        return router;
    }
}