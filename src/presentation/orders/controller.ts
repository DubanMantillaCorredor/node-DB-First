import { Request, Response } from "express";
import { prisma } from "../../data/postgres";


export class OrdersController{



        public getOrders = async (req: Request, res: Response)=>{
            const orders = await prisma.orders.findMany();
            return res.json(orders)
        };

        public getOrderById = async(req: Request, res: Response)=>{
            const id = +req.params.id;
            if(isNaN(id))return res.status(400).json({error: 'ID argument is not a number'});

            const order = await prisma.orders.findFirst ({
                where: {id_order:id}
            });

            (order)
                ?res.json(order)
                :res.status(404).json({error: `ORDER with id ${ id } not found`})
        };

        public createOrder = async(req: Request, res: Response)=>{
            const { date_order, id_user , id_product } = req.body;
            if(!id_user || !id_product)return res.status(400).json({error: 'all property is required'});
            const id = +id_user;
            const idProduct = +id_product;

            // const user_id =  prisma.users.findFirst({
            //     where: {id_user:id_user}
            // });
            // if(!user_id)return res.status(404).json({error: `USER with id ${id_user} not found`});

            // const product_id = prisma.products.findFirst({
            //     where: {id_product:id_product}
            // });
            // if(!product_id)return res.status(404).json({error: `PRODUCT with id ${id_user} not found`});
                

            const order = await prisma.orders.create({
                data: {date_order, id_user:id }
            });

            // const idOrder = +order.id_order

            const historic = await prisma.historical.create({
                data:{id_order:order.id_order, id_product:idProduct}
            })

            
            res.json({order, historic})
        };

        // public updateProduct = async(req: Request, res:Response)=>{
        //     const id = +req.params.id;
        //        // if(isNaN(id))return res.status(400).json({error: 'ID argument is not a number'})
                
        //         const product = await prisma.products.findFirst({
        //                 where: {id_product:id}
        //         });
        //         if(!product)return res.status(404).json({error: `PRODUCT with id ${id} not found`});

        //         const {price, description} = req.body;
        //         const updatedProduct = await prisma.products.update({
        //             where: {id_product:id},
        //             data: {price, description}
        //         })

        //             res.json(updatedProduct)
        // }

        // public deleteProduct = async (req: Request, res:Response)=>{
        //     const id= +req.params.id;
        //     if(isNaN(id))return res.status(400).json({error: 'ID argument is not a number'});

        //     const product = await prisma.products.findFirst ({
        //         where: {id_product:id}
        //     });
        //     if(!product)return res.status(404).json({error: `PRODUCT with id ${id} not found`});

        //     const deleted = await prisma.products.delete({
        //         where: { id_product:id }
        //     });

        //         res.json({deleted});
        // }
    }