import { Request, Response } from "express";
import { prisma } from "../../data/postgres";


export class ProductsController{



        public getProducts = async (req: Request, res: Response)=>{
            const product = await prisma.products.findMany();
            return res.json(product)
        };

        public getProductById = async(req: Request, res: Response)=>{
            const id = +req.params.id;
            //if(isNaN(id))return res.status(400).json({error: 'ID argument is not a number'});

            const product = await prisma.products.findFirst ({
                where: {id_product:id}
            });

            (product)
                ?res.json(product)
                :res.status(404).json({error: `PRODUCT with id ${ id } not found`})
        };

        public createProduct = async(req: Request, res: Response)=>{
            const { name_product, price, description } = req.body;
            if(!name_product || !price)return res.status(400).json({error: 'name property is required'});

            const product = await prisma.products.create({
                data: {name_product, price, description }
            });

            
            res.json(product)
        };

        public updateProduct = async(req: Request, res:Response)=>{
            const id = +req.params.id;
               // if(isNaN(id))return res.status(400).json({error: 'ID argument is not a number'})
                
                const product = await prisma.products.findFirst({
                        where: {id_product:id}
                });
                if(!product)return res.status(404).json({error: `PRODUCT with id ${id} not found`});

                const {price, description} = req.body;
                const updatedProduct = await prisma.products.update({
                    where: {id_product:id},
                    data: {price, description}
                })

                    res.json(updatedProduct)
        }

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