import React, { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'   //useDispatch will dispatch will action and selector with use to select part of the state(productList) 
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Product from '../components/Product'
import Message from '../components/Message'
import ProductCarousel from '../components/ProductCarousel'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import Paginate from '../components/Paginate'
import { listProducts } from '../Actions/PdoductAction'

//import products from '../products'

const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)       //using productList from ReduxStore
    const { loading, error, products, page, pages} =productList                     //we are pulling that from our state

    useEffect(() => {                                                 //request will go backend to get product from action(listProducts)
        dispatch(listProducts(keyword,pageNumber))
    }, [dispatch, keyword,pageNumber])


   
   
    //we want to loading and if not then give Error from backend and we want to show our Product data
    return (
        <>
        
        <Meta />
        {!keyword ? <ProductCarousel /> : <Link className='btn btn-dark my-3' to='/'>
            Go Back
        </Link>}
            <h1>Latest Products</h1>
            { loading ? ( 
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                <Row>
                    {products.map((product) =>(
                        <Col key={product._id}  sm={12} md={6} lg={4} xl={3}>
                            <Product product={product}/>
                        </Col>
                    ))}
                 </Row>
                 <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
                </>
            )}
        </>
    )
}

export default HomeScreen
