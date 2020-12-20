const prisma = require('../models/prisma.js');
const {validate} = require('../helpers/validator.js');
const aobj = require('aobj');

module.exports = {
    getUsers: () => async (ctx) => {
        ctx.body = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                birthDate: true,
                address: {
                    select: {
                        id: true,
                        street: true,
                        state: true,
                        city: true,
                        country: true,
                        zip: true
                    }
                }
            }
        });
    },

    createUsers: () => async (ctx) => {
        let bodyValidation = await validate(ctx.request.body, {
            id: 'integer|min:0',
            name: 'required|string|max:255',
            email: 'required|email|max:255',
            birthDate: 'required|date',
            address: {
                id: 'integer|min:0',
                street: 'required|string|max:255',
                state: 'required|string|max:255',
                city: 'required|string|max:255',
                country: 'required|string|max:255',
                zip: 'required|string|max:255'
            }
        });

        if(bodyValidation.errors) {
            ctx.throw(405, 'Invalid input');
            return;
        }
        
        let addressInput = aobj.extract(ctx.request.body.address, ['street', 'state', 'city', 'country', 'zip']);
        let userInput = aobj.extract(ctx.request.body, ['name', 'email', 'birthDate']);

        userInput.birthDate = new Date(userInput.birthDate);

        let address = await prisma.address.create({data: addressInput});

        let user = await prisma.user.create({
            data: {
                ...userInput,
                address: {
                    connect: {
                        id: address.id
                    }
                }
            },
            select: {
                id: true,
                name: true,
                email: true,
                birthDate: true,
                address: {
                    select: {
                        id: true,
                        street: true,
                        state: true,
                        city: true,
                        country: true,
                        zip: true
                    }
                }
            }
        });

        ctx.status = 201;
        ctx.body = user;
    },

    getUsersById: () => async (ctx) => {
        let validation = await validate(ctx.params, {userId: 'required|integer|min:0'});
        
        if(validation.errors) {
            ctx.throw(400, 'Invalid user id');
            return;
        }

        let userId = parseInt(ctx.params.userId);

        let user = await prisma.user.findFirst({
            where: {
                id: userId
            },
            select: {
                id: true,
                name: true,
                email: true,
                birthDate: true,
                address: {
                    select: {
                        id: true,
                        street: true,
                        state: true,
                        city: true,
                        country: true,
                        zip: true
                    }
                }
            }
        });

        if(!user) {
            ctx.throw(404, 'User not found');
            return;
        }

        ctx.body = user;
    },
    
    updateUsersById: () => async (ctx) => {
        let paramsValidation = await validate(ctx.params, {userId: 'required|integer|min:0'});
        
        if(paramsValidation.errors) {
            ctx.throw(400, 'Invalid user id');
            return;
        }

        let userId = parseInt(ctx.params.userId);

        let user = await prisma.user.findFirst({
            where: {
                id: userId
            }
        });

        if(!user) {
            ctx.throw(404, 'User not found');
            return;
        }

        let bodyValidation = await validate(ctx.request.body, {
            name: 'required|string|max:255',
            email: 'required|email|max:255',
            birthDate: 'required|date',
            address: {
                street: 'required|string|max:255',
                state: 'required|string|max:255',
                city: 'required|string|max:255',
                country: 'required|string|max:255',
                zip: 'required|string|max:255'
            }
        });

        if(bodyValidation.errors) {
            ctx.throw(405, 'Invalid input');
            return;
        }
        
        let addressInput = aobj.extract(ctx.request.body.address, ['street', 'state', 'city', 'country', 'zip']);
        let userInput = aobj.extract(ctx.request.body, ['name', 'email', 'birthDate']);

        userInput.birthDate = new Date(userInput.birthDate);

        let updated_user = await prisma.user.update({
            data: {
                ...userInput,
                address: {
                    update: addressInput
                }
            },
            where: {
                id: user.id
            },
            select: {
                id: true,
                name: true,
                email: true,
                birthDate: true,
                address: {
                    select: {
                        id: true,
                        street: true,
                        state: true,
                        city: true,
                        country: true,
                        zip: true
                    }
                }
            }
        });

        // delete updated_user.address_id;
        // updated_user.address = address;

        ctx.status = 200;
        ctx.body = updated_user;
    },

    deleteUsersById: () => async (ctx) => {
        let validation = await validate(ctx.params, {userId: 'required|integer|min:0'});
        
        if(validation.errors) {
            ctx.throw(400, 'Invalid user id');
            return;
        }

        let userId = parseInt(ctx.params.userId);

        let user = await prisma.user.findFirst({
            where: {
                id: userId
            }
        });

        if(!user) {
            ctx.throw(404, 'User not found');
            return;
        }

        await prisma.user.delete({
            where: {
                id: user.id
            }
        });
        
        ctx.status = 200;
    },
}