import { Router } from "express";
import { ProductsController } from "./controller";

export class ProductsRoutes{

    static get routes(): Router{
        const router = Router();
        const productsController = new ProductsController();

        router.get('/',productsController.getProducts);
        router.get('/:id', productsController.getProductById);

        router.post('/', productsController.createProduct);
        router.put('/:id', productsController.updateProduct);
        // router.delete('/:id', productsController.deleteProduct)

        return router;
    }
}