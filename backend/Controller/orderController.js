import asyncHandler from 'express-async-handler'
import Order from '../tables/orderTable.js'

//Create new order, POST=> /api/orders,   its a Private 
const addOrderItems = asyncHandler( async(req,res) =>{
    const { 
            orderItems, 
            shippingAddress,
            paymentMethod, 
            itemsPrice, 
            taxPrice, 
            shippingPrice, 
            totalPrice, 
          } = req.body                             //comes from (client)request Body 

            if(orderItems && orderItems.length === 0)
            {
                res.status(400)
                throw new Error("No order items")
                return
            }
            else{
                const order = new Order({
                    orderItems, 
                    user: req.user._id,
                    shippingAddress,
                    paymentMethod, 
                    itemsPrice, 
                    taxPrice, 
                    shippingPrice, 
                    totalPrice,
                })


                const createdOrder = await order.save()

                res.status(201).json(createdOrder)
            }
})



//get order by Id , Get=> /api/orders/:id,   its a Private 
const getOrderById = asyncHandler( async(req,res) =>{
    const order = await Order.findById(req.params.id).populate('user','name email')

    if(order){
        res.json(order)
    }
    else{
        res.status(404)
        throw new Error("Order Not Found")
    }

})



//update order to paid , Get=> /api/orders/:id/pay,   its a Private 
const updateOrderToPaid = asyncHandler( async(req,res) =>{
    const order = await Order.findById(req.params.id)

    if(order){
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {                             //its come from Paypal
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

        const updatedOrder = await order.save()
        res.json(updatedOrder)
    }
    else{
        res.status(404)
        throw new Error("Order Not Found")
    }
})




//get logged in user orders , Get=> /api/orders/myorders,   its a Private 
const getMyOrders = asyncHandler(async (req,res) =>{
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)

})


//get all orders , Get=> /api/orders,   its a Private/Admin 
const getOrders = asyncHandler(async (req,res) =>{
    const orders = await Order.find({}).populate('user', 'id name')
    res.json(orders)

})


//update order to delivered , Get=> /api/orders/:id/deliver,   its a Private/admin
const updateOrderToDelivered = asyncHandler( async(req,res) =>{
    const order = await Order.findById(req.params.id)

    if(order){
        order.isDelivered = true
        order.deliveredAt = Date.now()
        

        const updatedOrder = await order.save()
        res.json(updatedOrder)
    }
    else{
        res.status(404)
        throw new Error("Order Not Found")
    }
})



export {addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered }