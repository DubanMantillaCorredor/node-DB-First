import { Router } from "express";
import { OrdersController } from "./controller";

export class OrdersRoutes{

    static get routes(): Router{
        const router = Router();
        const ordersController = new OrdersController();

        router.get('/',ordersController.getOrders);
        router.get('/:id', ordersController.getOrderById);

        router.post('/', ordersController.createOrder);
        // router.put('/:id', productsController.updateProduct);
        // router.delete('/:id', productsController.deleteProduct)

        return router;
    }
}