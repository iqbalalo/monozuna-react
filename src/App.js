import React, {Component} from 'react';
import "./bootstrap/css/bootstrap.min.css";
import "./font_awesome/css/font-awesome.min.css";
import './App.css';
import Products from "./components/Products";
import {Route} from "react-router-dom";
import Home from "./components/Home";
import Orders from "./components/Orders";
import Customers from "./components/Customers";
import Settings from "./components/Settings";

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

    componentDidMount() {
        // this.getBasketInfo(basketId);
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

        for (i = 0; i < cartItemList.length; i++) {
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
                "vat": 0,
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

        for (i = 0; i < cartItemList.length; i++) {
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

        for (i = 0; i < cartItemList.length; i++) {
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
                                    <span style={{display:"block",　color: "#eb3479", fontSize: "8pt", position: "absolute"}}>モノツナ</span>
                                    <span style={{display:"block",　fontWeight: "bold", color: "#eb3479", fontSize: "24pt"}}>monozuna</span>
                                    <span style={{display:"block",　color: "#ce3685", fontSize: "9pt"}}>Japanese product for global people</span>
                                </a>
                            </div>
                            <div className="col">
                                <div className="input-group mb-3">
                                    <input className="form-control" placeholder="Search"
                                           style={{borderColor: "#ffaed7"}}/>
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-danger" type="button" id="button-addon2">
                                            <i className="fas fa-search"/></button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-1" style={{textAlign: "right"}}>
                                <a href={"/"}
                                   style={{textAlign:"left", display:"block", padding:".3em", color:"#ff77bc", marginTop: "5px" }}>Sign In</a>
                                <a href={"/"}
                                   style={{textAlign:"left", display:"block", padding:".3em", color:"#ff77bc", marginTop: "5px" }}>Sign Out</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-2">
                        <a href={"/"}
                           style={{textAlign:"left", display:"block", padding:".3em", color:"#ff77bc", marginTop: "5px" }}>Home</a>
                        <a href={"/products"}
                           style={{textAlign:"left", display:"block", padding:".3em", color:"#ff77bc", marginTop: "5px" }}>Products</a>
                        <a href={"/orders"}
                           style={{textAlign:"left", display:"block", padding:".3em", color:"#ff77bc", marginTop: "5px" }}>Orders</a>
                        <a href={"/customers"}
                           style={{textAlign:"left", display:"block", padding:".3em", color:"#ff77bc", marginTop: "5px" }}>Customers</a>
                        <a href={"/settings"}
                           style={{textAlign:"left", display:"block", padding:".3em", color:"#ff77bc", marginTop: "5px" }}>Settings</a>
                    </div>
                    <div className="col-lg-10">
                        <Route path="/" exact={true} component={Home}/>
                        <Route path="/products" exact={true} component={Products}/>
                        <Route path="/orders" exact={true} component={Orders}/>
                        <Route path="/customers" exact={true} component={Customers}/>
                        <Route path="/settings" exact={true} component={Settings}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
