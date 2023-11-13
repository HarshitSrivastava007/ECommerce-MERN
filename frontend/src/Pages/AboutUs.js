import React from 'react'
import { Row, Col, Card, ListGroup} from 'react-bootstrap'

const AboutUs = () => {
    return (
        
            <>
            <h1>E-commerce USING MERN STACK</h1>
            <Row sm={8} md={4} lg={8} >
            <Col md={9}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>About Application</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                <p>This thesis is about studying the basic components of MERN Stack technology such as:
                                        MongoDB, ExpressJS framework, ReactJS library, and NodeJS platform. Discussing the
                                        basic functions of an e-commerce web application such as sign up, sign in, showing dashboards,
                                        displaying store categories and products Using MERN Stack technology in thisweb application to search for product stores and payment gateway.
                                        Develop administrative functions for the website such as: user management, store
                                        management, statistics, and reports.
                                    </p>
                                    <p>Since then, this topic is declared to research and create an online product search website
                                        so that small product stores and Store Admin can post and manage their products right on the
                                        website. website system and branding. For customers, they can quickly search for urgent products.
                                    </p>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>


                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            {/* <ListGroup.Item>
                
                            </ListGroup.Item> */}
                            <ListGroup.Item>
                                <Row className='mr-auto ml-auto'>
                                <img src="images/myimage.jpg" alt="Harshit Srivastava"></img>
                                <h4 className='mr-auto ml-auto'>Harshit Srivastava</h4>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col> 
            
            </Row>
      
        </>
    )
}

export default AboutUs
