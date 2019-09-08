import React, { Component } from 'react';
import '../../SneakersDetail.css';
import { Button, Input } from 'reactstrap';
import axios from 'axios';
import { base_url } from '../../config';
export default class SneakersDetail extends Component {
    state = {
        name: null,
        prize: null,
        image: null,
        quantity: null,
        sneakersId: null,

    }
    componentWillMount() {

        const sneakersId = this.props.match.params.id;
        axios({
            url: base_url + '/api/sneakers/' + sneakersId,
            method: 'GET'
        })
            .then(data => {
                this.setState({
                    name: data.data.name,
                    prize: data.data.prize,
                    image: data.data.image,
                    sneakersId: data.data._id
                });
            })
            .catch(err => {
                console.log(err);
            });


    }

    render() {
        return (
            <div className='sneakers_detail'>
                <div className='sneakers_img'></div>
                <div className='description'>
                    <div className='sneakers_name'>{this.state.name}</div>
                    <div className='sneakers_prize'>{this.state.prize}</div>
                    <div className='quantity'>
                        <Input type="number" onChange={this.quantityChange} step={1} min={0} placeholder='quantity' />
                    </div>
                    <Button id='btn_add_to_cart' type='button' onClick={this.addToCart}>Add to cart</Button>
                </div>
            </div>
        )
    }
    quantityChange = (event) => {
        const quantity = event.target.value;
        this.setState({ quantity: quantity });
    }

    addToCart = (event) => {
        if (window.localStorage.getItem('cart')) {
            var cart = window.localStorage.getItem('cart');
            cart = JSON.parse(cart);

            cart.push({ id: this.state.sneakersId, quantity: this.state.quantity });
            window.localStorage.setItem('cart', JSON.stringify(cart));
            console.log(cart);
        }
        else {
            const initiate_cart = []
            window.localStorage.setItem('cart', JSON.stringify(initiate_cart));
            var cart = window.localStorage.getItem('cart');
            cart = JSON.parse(cart);
            cart.push({ id: this.state.sneakersId, quantity: this.state.quantity });
            window.localStorage.setItem('cart', JSON.stringify(cart));
            console.log(cart);

        }

    }
}
