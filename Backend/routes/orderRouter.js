import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/OrderModel.js';
import { isAuth } from '../utils.js';


// CREATE ORDER 

const orderRouter = express.Router();

orderRouter.post('/order', isAuth, expressAsyncHandler(async (req, res) => {
    const newOrder = new Order({
        orderItems: req.body.orderItems.map((x) => ({...x, product: x._id})),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id
    });
    const order = await newOrder.save();
    res.status(201).send({message: 'New Order Created', order})
}));

orderRouter.get('/order/mine', isAuth, expressAsyncHandler(async(req, res)=>{
    const order = await Order.find({user: req.user._id})
    res.send(order);
}))

// GET SINGLE ORDER 

orderRouter.get('/order/:id', isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if(order){
        res.send(order);
    } else {
        res.status(404).send({message: 'Order Not Found'});
    }
}));

orderRouter.put('/order/:id/pay', isAuth, expressAsyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id);
    if(order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id : req.body.id,
            status : req.body.status,
            email_address : req.body.email_address,
            update_time : req.body.update_time
        }
        const updatedOrder = await order.save();
        res.send({message: 'Order Paid', order: updatedOrder });
    } else {
        res.status(404).send({message: 'Order Not Found'});
    }
}));

export default orderRouter;