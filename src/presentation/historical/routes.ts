import { Router } from "express";
import { HistoricalController } from "./controller";

export class HistoricalRoutes{

    static get routes(): Router{
        const router = Router();
        const historicalController = new HistoricalController();

        router.get('/',historicalController.getHistorical);
       // router.get('/:id', ordersController.getOrderById);

       // router.post('/', ordersController.createOrder);
        // router.put('/:id', productsController.updateProduct);
        // router.delete('/:id', productsController.deleteProduct)

        return router;
    }
}