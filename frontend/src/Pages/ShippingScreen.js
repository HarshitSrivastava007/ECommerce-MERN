import React, {useState} from 'react'
import { Form, Button} from 'react-bootstrap'
import { useDispatch , useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../Actions/CartAction'

const ShippingScreen = ({history}) => {
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart                                                     //shipping Address pulling from cart

    const [address, setAddress] = useState(shippingAddress.address)                 //theis all are going to fill cartReducer's shipping empty Object.
    const [city, setCity] = useState(shippingAddress.city)
    const [pincode, setPinCode] = useState(shippingAddress.pincode)
    const [country, setCountry] = useState(shippingAddress.country)
    
    const dispatch = useDispatch()
    
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, pincode, country }))
        history.push('/payment')
    }


    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter address'
                        value={address}
                        required
                        onChange={(e)=> setAddress(e.target.value)}>
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter city'
                        value={city}
                        required
                        onChange={(e)=> setCity(e.target.value)}>
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId="pincode">
                    <Form.Label>Pin Code</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Pin Code'
                        value={pincode}
                        required
                        onChange={(e)=> setPinCode(e.target.value)}>
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Country'
                        value={country}
                        required
                        onChange={(e)=> setCountry(e.target.value)}>
                    </Form.Control>
                </Form.Group>

            <Button type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen

