import React, {Component} from 'react';
import "./bootstrap/css/bootstrap.min.css";
import "./font_awesome/css/font-awesome.min.css";
import './App.css';
import Products from "./components/Products";
import {Route} from "react-router-dom";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import CartDetail from "./components/CartDetail";
import PlaceOrder from "./components/PlaceOrder";
import Success from "./components/Success";

const deepClone = require('lodash/cloneDeep');
const axios = require('axios');
const basketId = localStorage.getItem('basket_id');


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedMenuItem: "All",
            cartTotalItem: 0,
            cartCost: 0,
            cartItemList: [],
            showCartList: false
        };
    }

    toggleCartList = () => {
        this.setState({
            showCartList: !this.state.showCartList
        });
    };

    componentWillMount() {
        this.getBasketInfo(basketId);
    }

    getBasketInfo = (basketId) => {
        var self = this;
        axios.get('https://8dxyapw3pb.execute-api.ap-northeast-1.amazonaws.com/dev/basket/'+basketId)
            .then(function (response) {
                console.log(response.data);

                var cartItems = response.data;
                var cartCost = 0;
                var cartTotalItem = 0;

                for (var i = 0; i < cartItems.length; i++) {
                    cartCost = parseInt(cartCost) + (parseInt(cartItems[i].qty) * parseInt(cartItems[i].unit_price));
                    cartTotalItem = parseInt(cartTotalItem) + parseInt(cartItems[i].qty);
                }

                self.setState({
                    cartTotalItem: cartTotalItem,
                    cartCost: cartCost,
                    cartItemList: cartItems
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    addToCart = (item) => {
        console.log("Add to cart", item);

        var product = deepClone(item);
        var cartProduct = null;

        var cartItemList = this.state.cartItemList.length > 0 ? this.state.cartItemList : [];
        var cartCost = 0;
        var cartTotalItem = 0;

        var cartItemExist = false;
        for (var i = 0; i < cartItemList.length; i++) {
            if (cartItemList[i].id === product.id) {
                cartItemList[i].qty = parseInt(cartItemList[i].qty) + parseInt(product.qty);
                cartProduct = deepClone(cartItemList[i]);
                cartItemExist = true;
                break;
            }
        }

        if (!cartItemExist) {
            console.log("cartItemList",cartItemList);
            cartItemList.push(product);
            cartProduct = deepClone(product);
        }

        for (var i = 0; i < cartItemList.length; i++) {
            cartCost = parseInt(cartCost) + (parseInt(cartItemList[i].qty) * parseInt(cartItemList[i].unit_price));
            cartTotalItem = parseInt(cartTotalItem) + parseInt(cartItemList[i].qty);
        }

        this.setState({
            cartTotalItem: cartTotalItem,
            cartCost: cartCost,
            cartItemList: cartItemList,
            showCartList: false
        });
        console.log("cart info", cartTotalItem, cartCost, cartItemList);
        console.log("cart product", cartProduct);
        this.updateDB(cartProduct);
    };

    updateDB = (p) => {
        if (basketId && basketId.length> 5) {
            axios.put('https://8dxyapw3pb.execute-api.ap-northeast-1.amazonaws.com/dev/basket', {
                "basket_id": basketId,
                "category": p.category,
                "currency": p.currency,
                "discount": p.discount,
                "product_id": p.id,
                "unit": p.unit,
                "unit_price": p.unit_price,
                "qty": p.qty,
                "vat": 0,
                "created": new Date()
            })
                .then(function (response) {
                    console.log("updateDB", response.data);

                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            axios.post('https://8dxyapw3pb.execute-api.ap-northeast-1.amazonaws.com/dev/basket', {
                "category": p.category,
                "currency": p.currency,
                "discount": p.discount,
                "product_id": p.id,
                "unit": p.unit,
                "unit_price": p.unit_price,
                "qty": p.qty,
                "tax": 0,
                "created": new Date()
            })
                .then(function (response) {
                    console.log("updateDB", response.data);

                    localStorage.setItem('basket_id', response.data.basket_id);

                    // self.setState({
                    //     product: response.data[0]
                    // });
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    };

    deleteFromDB = (basketId, productId) => {
        axios.delete('https://8dxyapw3pb.execute-api.ap-northeast-1.amazonaws.com/dev/basket/'+basketId+"/"+productId)
                .then(function (response) {
                    console.log("deleteFromDB", response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
    };

    removeFromCart = (item) => {
        // console.log("remove from cart", item);

        var product = deepClone(item);

        var cartItemList = this.state.cartItemList;
        var cartCost = 0;
        var cartTotalItem = 0;

        for (var i = 0; i < cartItemList.length; i++) {
            if (cartItemList[i].id === product.id) {
                cartItemList.splice(i, 1);
            }
        }

        for (var i = 0; i < cartItemList.length; i++) {
            cartCost = parseInt(cartCost) + (parseInt(cartItemList[i].qty) * parseInt(cartItemList[i].unit_price));
            cartTotalItem = parseInt(cartTotalItem) + parseInt(cartItemList[i].qty);
        }

        this.setState({
            cartTotalItem: cartTotalItem,
            cartCost: cartCost,
            cartItemList: cartItemList
        });
        var basket_id = localStorage.getItem('basket_id');

        this.deleteFromDB(basket_id, product.id);
    };

    updateCart = (item) => {
        // console.log("update cart", item);

        var product = deepClone(item);
        var cartProduct = null;

        var cartItemList = this.state.cartItemList;
        var cartCost = 0;
        var cartTotalItem = 0;

        for (var i = 0; i < cartItemList.length; i++) {
            if (cartItemList[i].id === product.id) {
                cartItemList[i] = product;
                cartProduct = deepClone(cartItemList[i]);
            }
        }

        for (var i = 0; i < cartItemList.length; i++) {
            cartCost = parseInt(cartCost) + (parseInt(cartItemList[i].qty) * parseInt(cartItemList[i].unit_price));
            cartTotalItem = parseInt(cartTotalItem) + parseInt(cartItemList[i].qty);
        }

        this.setState({
            cartTotalItem: cartTotalItem,
            cartCost: cartCost,
            cartItemList: cartItemList
        });
        this.updateDB(cartProduct);
    };

    render() {
        return (
            <div className="App container-fluid">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-1 top_nav_stamp"
                         style={{padding: "1em", background: "#ffcae5", marginBottom: ".5em"}}>
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-1" style={{textAlign: "left"}}>
                                <a href="/" style={{textDecoration: "none"}}>
                                    <span style={{fontWeight: "bold", color: "#eb3479", fontSize: "24pt"}}>monozuna</span>
                                    <span style={{display:"block",color: "#ce3685", fontSize: "9pt"}}>Local Product to Global People</span>
                                </a>
                            </div>
                            <div className="col">
                                <div className="input-group mb-3">
                                    {/*<input className="form-control" placeholder="Search"*/}
                                    {/*       style={{borderColor: "#ffaed7"}}/>*/}
                                    {/*<div className="input-group-append">*/}
                                    {/*    <button className="btn btn-outline-danger" type="button" id="button-addon2">*/}
                                    {/*        <i className="fas fa-search"/></button>*/}
                                    {/*</div>*/}
                                    <span style={{fontFamily: "Futura", width: "100%",  fontSize: "14pt"}}>Call Us (9am to 6pm)</span>
                                    <span style={{fontFamily: "Futura", width: "100%",  fontSize: "26pt", fontWeight:"500"}}>00000000000</span>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-1" style={{textAlign: "right"}}>
                                <Cart cartTotalItem={this.state.cartTotalItem}
                                      cartCost={this.state.cartCost}
                                      cartItems={this.state.cartItemList}
                                      toggleCartList={this.toggleCartList}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {/*<div className="col-lg-2">*/}
                    {/*    <CategoryMenu/>*/}
                    {/*</div>*/}
                    <div className="col-lg-12">
                        <Route path="/" exact={true} component={Products}/>
                        <Route path="/products/:cat" exact={true} component={Products}/>
                        <Route path="/products/" exact={true} component={Products}/>
                        <Route path="/products/:cat/:id" exact={true}
                               render={(routeProps) => (<ProductDetail {...routeProps} addToCart={this.addToCart}/>)}/>
                        <Route path="/order/" exact={true}
                               render={(routeProps) => (<PlaceOrder {...routeProps}/>)}/>
                        <Route path="/success/:id" exact={true} component={Success}/>
                    </div>
                </div>

                {
                    this.state.showCartList ?
                        <CartDetail cartTotalItem={this.state.cartTotalItem} cartItemList={this.state.cartItemList}
                                    cartCost={this.state.cartCost}
                                    toggleCartList={this.toggleCartList}
                                    removeFromCart={this.removeFromCart}
                                    updateCart={this.updateCart}
                        /> : null
                }
                <div className="row d-flex flex-row justify-content-between" style={{marginTop: "5em", background: "#f3d3e3",
    color: "#ce3685", padding: "1em", fontSize: "9pt", position:"relative", bottom:0}}>
                    <div className="p-2 col-lg-8 col-md-8 col-sm-1" style={{textAlign:"left"}}>

                        <h5>Products from Japan</h5>
                        <div className="d-flex flex-row justify-content-between">
                            <div className="p-2">
                                <ul style={{padding: "0"}}>
                                    <li>Acne spot remover cream</li>
                                    <li>Pregnancy spot prevention cream</li>
                                    <li>Skin whitening and moisturizer cream</li>
                                    <li>Beauty face mask</li>
                                    <li>Female menstrual pain remover</li>
                                </ul>
                            </div>
                            <div className="p-2">
                                <ul style={{padding: "0"}}>
                                    <li>Men hair growth</li>
                                    <li>Elders' Knee & Joint pain remover</li>
                                </ul>
                            </div>
                            <div className="p-2">
                                <ul style={{padding: "0"}}>
                                    <li>Baby medicated body soap</li>
                                    <li>Baby medicated shampoo</li>
                                    <li>Baby milk powder for 0 - 1 year age</li>
                                    <li>Baby milk powder for 1 - 2 year age</li>
                                </ul>
                            </div>
                            <div className="p-2">
                                <ul style={{padding: "0"}}>
                                    <li>Mosquito repellent</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="p-2 col-lg-3 col-md-3 col-sm-1" style={{textAlign:"left"}}>
                        <h5>Contact Us</h5>
                        <p>
                            Monozuna Trade<br/><br/>
                            Bangladesh Office:<br/>
                            Savar-1349
                            <br/><br/>
                            Japan Office:<br/>
                            814-023, 福岡市早良区原田<br/>
                            Mobile: +81 070 2162 6806<br/>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
