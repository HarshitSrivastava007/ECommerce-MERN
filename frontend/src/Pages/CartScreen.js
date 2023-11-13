import React, { useEffect } from 'react'           //we hava to dispatch all the Action thats why useEffect
import { useDispatch, useSelector } from 'react-redux'      //they are hooks
import {Link} from 'react-router-dom'
import {Row,Col,Form,Button, ListGroup,Image,Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../Actions/CartAction'

const CartScreen = ({match,location, history}) => {
    const productId =match.params.id 

    const quantity = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch =useDispatch()

    const cart = useSelector((state)=> state.cart)                      //pulling all cart items From LocalStorage to CartScreen(page)
    const {cartItems }= cart

    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId,quantity))      //we getting both productId and Qty from url,m then it will add to the url
        }
    },[dispatch,productId,quantity])                     //dependecies for useEffect, in case if productId changes and also quantity

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkOutHandler = () =>{
        history.push('/login?redirect=shipping')           //redirecting user to login(if new user) otherwise shipping page 
    }
    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? ( <Message>Cart is Empty <Link to='/'>Go Back</Link></Message>) : (
                    <ListGroup variant="flush">
                        {cartItems.map(item=> (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>${item.price}</Col>
                                    <Col md={2}>
                                    <Form.Control 
                                    as='select' 
                                    value={item.quantity}                 
                                    onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>         {/* we adding curent product Id and the qty Selected , according to qty price will change */}
                                        {[...Array(item.countInStock).keys()].map((x) =>(
                                            <option key={x + 1} value={x + 1}>                 {/*  dropdown list starts with 1 not 0 */}
                                                {x+1}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button type="button" variant="light" onClick={()=>
                                            removeFromCartHandler(item.product)}>
                                                <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <h2>SUBTOTAL: ({cartItems.reduce((acc,item)=> acc + item.quantity,0)})</h2>
                        ${cartItems.reduce((acc,item) => acc + item.quantity * item.price,0)
                                   .toFixed(2)}
                    </ListGroup>
                    <ListGroup.Item>
                        <Button type="button" 
                                className='btn-block' 
                                disabled={cartItems.length === 0} 
                                onClick={checkOutHandler}>Proceed To Checkout</Button>
                    </ListGroup.Item>
                </Card>                            

            </Col>
        </Row>
    )
}

export default CartScreen
