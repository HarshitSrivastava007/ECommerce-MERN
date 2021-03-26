import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch , useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import { getOrderDetails, payOrder, deliverOrder } from '../Actions/OrderAction'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET  } from '../Constents/OrderConstent'



const OrderScreen = ({match,history}) => {
    const orderId = match.params.id

    const [sdkReady, setSdkReady] = useState(false)

    const dispatch = useDispatch() 

    
    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error }= orderDetails

    const orderPay = useSelector((state) => state.orderPay)
    const { loading: loadingPay, success: successPay }= orderPay

    const orderDeliver = useSelector((state) => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver }= orderDeliver

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo }= userLogin


    //calculating prices
    if(!loading )
    {
        order.itemsPrice = order.orderItems.reduce((acc, item)=> acc + item.price * item.quantity, 0 )
    }
    
    

    useEffect(()=>{
        if(!userInfo){
            history.push('login')
        }
       const addPayPalScript = async () =>{
           const { data: clientId } = await axios.get('/api/config/paypal')
           const script = document.createElement('script')
           script.type = 'text/javascript'
           script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`                   //its a Software Development kit, that paypal give us
           script.async = true
           script.onload = () => {
               setSdkReady(true)
           }
           document.body.appendChild(script)                                                 //this is going to add script Dynamically
       }

       if(!order || successPay || successDeliver ){                                                            //it also shows the order is paid  //we also want to see the order if successPay fails and it also shows the order is paid
        dispatch({ type: ORDER_PAY_RESET })                                                //we adding Loop      if we dont pay it will keep refreshing    
        dispatch({ type: ORDER_DELIVER_RESET })                                                //we adding Loop      if we dont pay it will keep refreshing    
        dispatch(getOrderDetails(orderId)) 
       } else if (!order.isPaid) 
       {
        if (!window.paypal)
        {
            addPayPalScript()
        }
        else{
            setSdkReady(true)                               //if order is not paid then it will add this paypal script
        }
       }
    }, [dispatch, orderId, successPay, order, successDeliver,history, userInfo])


    const successPaymentHandler = (paymentResult) =>{
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    return loading ? (<Loader /> 
    ) : error ?(
     <Message variant='danger'>{error}</Message> 
      )  : (
            <> 
                <h1>ORDER: {order._id}</h1>
                <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                            <strong>Name: </strong> {order.user.name}       
                            </p>
                            <p>
                            <strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                            </p>
                            <p>
                                <strong>Address: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}{' '},
                                {order.shippingAddress.pincode},{' '}
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (<Message variant='success'>Delivered On {order.deliveredAt}</Message>)
                            : (<Message variant="danger">Not Delivered</Message>)}
                        </ListGroup.Item>


                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                            </p>
                            {order.isPaid ? (<Message variant='success'>Paid {order.paidAt}</Message>)
                            : (<Message variant='danger'>Not Paid</Message>)}
                        </ListGroup.Item>


                        <ListGroup.Item>
                            <h2>Order Items: </h2>
                            {order.orderItems.length === 0 ? (<Message>Order is empty</Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index)=>(
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} 
                                                        fluid 
                                                        rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>

                                                <Col md={4}>
                                                        {item.quantity} x ${item.price} = ${item.quantity * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>               
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? (
                                        <Loader />
                                    ) : (
                                        <PayPalButton amount={order.totalPrice}
                                                      onSuccess={successPaymentHandler}
                                        />
                                    )}
                                </ListGroup.Item>             
                            )}
                            {loadingDeliver && <Loader />}
                            { userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListGroup.Item>
                                    <Button type="button" className='btn btn-block' onClick={deliverHandler}>MARK AS DELIVERED</Button>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            </>
      )
    }

export default OrderScreen