import { Router } from "express";
import { UsersController } from "./users/controller";
import { UsersRoutes } from "./users/routes";
import { ProductsRoutes } from "./products/routes";
import { ProductsController } from "./products/controller";
import { OrdersRoutes } from "./orders/routes";
import { OrdersController } from "./orders/controller";
import { HistoricalRoutes } from "./historical/routes";




export class AppRoutes{
    static get routes(): Router{
        const router = Router();
        
        router.use('/api/users', UsersRoutes.routes);
        const studentController = new UsersController();
        router.use('/api/products', ProductsRoutes.routes );
        const productsController = new ProductsController();
        router.use('/api/orders', OrdersRoutes.routes );
        const ordersController = new OrdersController();
        router.use('/api/historical', HistoricalRoutes.routes );
        return router;
    }


}