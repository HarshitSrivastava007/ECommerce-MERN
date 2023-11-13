import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';          //after clicking any product it will show data in Formate
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import { listProductDetails, } from '../Actions/PdoductAction'


const ProductScreen = ({ history, match }) => {

    const [quantity, setQty]= useState(1)


    const dispatch = useDispatch()

    const productDetails= useSelector((state) => state.productDetails)
    const { loading, error, product}= productDetails


   useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match ])

    const addToCartHandler =() =>{
        history.push(`/cart/${match.params.id}?quantity=${quantity}`)         //http://localhost:3000/cart/60450facd0917323a80701ee?qty=7
    }


    return (
        <>
        <Link className='btn btn-dark my-3' to='/'>
            Go Back
        </Link>
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
           <>
           <Meta title={product.name} />
            <Row>
            <Col md={5}>
                <Image src={product.image} alt={product.name} fluid />                 {/* image will be set proper to the container : fluid */}
            </Col>
            <Col md={4}>
                <ListGroup variant='flush' >
                    <ListGroup.Item>
                        <h2>{product.name}</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating value={product.rating} 
                                text={`${product.numReviews} reviews`}
                        />
                    </ListGroup.Item>
                    <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                    <ListGroup.Item>Discription: {product.description}</ListGroup.Item>
                </ListGroup> 
            </Col>
            <Col md={3}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <Row>
                            <Col>Price:</Col>
                            <Col>
                                <strong>${product.price}</strong>
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    
                    <ListGroup.Item>
                        <Row>
                            <Col>Status:</Col>
                            <Col>
                                {product.countInStock > 0 ? 'In Stock' : 'Out Of Stack'}
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    {product.countInStock > 0 && (
                        <ListGroup.Item>
                            <Row>
                                <Col>Quantity:</Col>
                                <Col>
                                    <Form.Control as='select' value={quantity} onChange={(e) =>
                                    setQty(e.target.value)}>
                                        {[...Array(product.countInStock).keys()].map((x) =>(
                                            <option key={x + 1} value={x + 1}>                 {/*  dropdown list starts with 1 not 0 */}
                                                {x+1}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )}

                    <ListGroup.Item>
                        <Button onClick={addToCartHandler} className="btn-block" type="button" disabled={product.countInStock === 0}>
                            Add To Cart
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
                 
            </Col>
        </Row>

        </>
        )}
        </>
    )
}

export default ProductScreen
