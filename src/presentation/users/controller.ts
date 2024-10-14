import { Request, Response } from "express";
import { prisma } from "../../data/postgres";


export class UsersController{



        public getUsers = async (req: Request, res: Response)=>{
            const users = await prisma.users.findMany();
            return res.json(users)
        };

        public getUserById = async(req: Request, res: Response)=>{
            const id = +req.params.id;
            if(isNaN(id))return res.status(400).json({error: 'ID argument is not a number'});

            const user = await prisma.users.findFirst({
                where: {id_user: id }
            });

            (user)
                ?res.json(user)
                :res.status(404).json({error: `USER with id ${ id } not found`})
        };

        public createUser = async(req: Request, res: Response)=>{
            const { name_user, last_name, email, address } = req.body;
            if(!name_user || !last_name || !email || !address)return res.status(400).json({error: 'all property is required'});

            const user = await prisma.users.create({
                data: {name_user, last_name, email, address}
            });

            
            res.json(user)
        };

        public updateUser = async(req: Request, res:Response)=>{
            const id = +req.params.id;
                if(isNaN(id))return res.status(400).json({error: 'ID argument is not a number'})
                
                const user = await prisma.users.findFirst({
                        where: {id_user: id}
                });
                if(!user)return res.status(404).json({error: `USER with id ${id} not found`});

                const { email, address} = req.body;
                const updateUser = await prisma.users.update({
                    where: {id_user:id},
                    data: {email, address}
                })

                    res.json(updateUser)
        }

        public deleteUser = async (req: Request, res:Response)=>{
            const id= +req.params.id;
            if(isNaN(id))return res.status(400).json({error: 'ID argument is not a number'});

            const user = await prisma.users.findFirst({
                where: {id_user: id}
            });
            if(!user)return res.status(404).json({error: `Todo with id ${id} not found`});

            const deleted = await prisma.users.delete({
                where: { id_user:id }
            });

                res.json({user, deleted});
        }








}