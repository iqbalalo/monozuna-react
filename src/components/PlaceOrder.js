import React, {Component} from "react";

const axios = require('axios');

class PlaceOrder extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showBkashOption: false,
            cartTotalItem: this.props.cartTotalItem,
            cartCost: this.props.cartCost,
            cartItemList: this.props.cartItemList,
            cartTotalDiscount: 0,
            shippingCharge: 0,
            grandTotal: 0,
            shippingDate: "",
            customerName: null,
            customerPhone: null,
            customerEmail: null,
            customerAddress: null
        }
    }

    getBasketInfo = () => {
        var basketId = localStorage.getItem('basket_id');
        var self = this;
        axios.get('https://8dxyapw3pb.execute-api.ap-northeast-1.amazonaws.com/dev/basket/' + basketId)
            .then(function (response) {
                // console.log(response.data);

                var cartItems = response.data;
                var cartCost = 0;
                var cartTotalItem = 0;
                var cartTotalDiscount = 0;

                for (var i = 0; i < cartItems.length; i++) {
                    cartCost = parseInt(cartCost) + (parseInt(cartItems[i].qty) * parseInt(cartItems[i].unit_price));
                    cartTotalItem = parseInt(cartTotalItem) + parseInt(cartItems[i].qty);
                    cartTotalDiscount = parseInt(cartTotalDiscount) + parseInt(cartItems[i].discount);
                }

                self.setState({
                    cartTotalItem: cartTotalItem,
                    cartCost: cartCost,
                    cartItemList: cartItems,
                    cartTotalDiscount: cartTotalDiscount,
                    grandTotal: parseInt(cartCost - cartTotalDiscount + self.state.shippingCharge),
                    shippingDate: new Date(new Date().getTime()+(5*24*60*60*1000)).toDateString()
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.location.state === 'desiredState') {
            this.getBasketInfo();
        }
    }

    componentDidMount() {
        this.getBasketInfo();
    }

    selectPaymentMethod = (e) => {
        if(e.target.value==="bkash") {
            this.setState({showBkashOption: true});
        } else {
            this.setState({showBkashOption: false});
        }
    };

    setUserName = (e) => {
        this.setState({customerName: e.target.value});
    };

    setUserPhone = (e) => {
        this.setState({customerPhone: e.target.value});
    };

    setUserEmail = (e) => {
        this.setState({customerEmail: e.target.value});
    };

    setUserAddress = (e) => {
        this.setState({customerAddress: e.target.value});
    };

    placeOrder = () => {
        if(this.state.customerName===null || this.state.customerPhone===null || this.state.customerAddress===null) {
            alert("Name, Phone Number and Address are required!");
            return;
        }

        var basketId = localStorage.getItem('basket_id');
        var self = this;
        axios.post('https://8dxyapw3pb.execute-api.ap-northeast-1.amazonaws.com/dev/checkout', {
            "basket_id": basketId,
            "customer_name": self.state.customerName,
            "customer_phone": self.state.customerPhone,
            "customer_email": self.state.customerEmail,
            "customer_address": self.state.customerAddress,
            "payment_type" : "CASH-ON-DELIVERY",
            "estimated_delivery_date": self.state.shippingDate,
            "shipping_charge": 0
        })
            .then(function (response) {
                console.log(response.data);
                if(response.data["basket_id"] === basketId) {
                    localStorage.setItem('basket_id', null);
                    self.props.history.replace('/success/' + basketId);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    bkashOptions = () => {
        if (this.state.showBkashOption) {
            return (
                <div className="row" style={{marginTop: ".5em"}}>
                    <input type="text" className="form-control" placeholder="Date (YYYY-MM-DD)"/>
                    <input type="text" className="form-control" placeholder="Phone Number"
                           style={{marginTop: ".25em"}}/>
                    <input type="text" className="form-control" placeholder="Trx Id (bKash Transaction ID)"
                           style={{marginTop: ".25em"}}/>
                    <input type="text" className="form-control" placeholder="Amount" style={{marginTop: ".25em"}}/>
                </div>
            )
        }
    };

    render() {
        return (
            <div className="col d-flex flex-wrap flex-row justify-content-around">
                <div className="p-2 col-lg-4 col-md-4 col-sm-1">
                    <div style={{textAlign: "left"}}>
                        <h6>Delivery Address</h6>
                    </div>
                    <div style={{marginTop: "1em"}}>
                        <input type="text" className="form-control" placeholder="Name" onChange={this.setUserName}/>
                    </div>
                    <div style={{marginTop: ".5em"}}>
                        <input type="text" className="form-control" placeholder="Phone" onChange={this.setUserPhone}/>
                    </div>
                    <div style={{marginTop: ".5em"}}>
                        <input type="text" className="form-control" placeholder="Email (optional)" onChange={this.setUserEmail}/>
                    </div>
                    <div style={{marginTop: ".5em"}}>
                        <input type="text" className="form-control" placeholder="Address" onChange={this.setUserAddress}/>
                    </div>
                    <div style={{marginTop: "1.5em", textAlign: "left"}}>
                        <h6>Payment Method</h6>
                    </div>
                    <div style={{marginTop: ".5em"}} onChange={this.selectPaymentMethod}>
                        <select className="form-control">
                            <option value="cash">Pay on delivery</option>
                            {/*<option value="bkash">bKash</option>*/}
                        </select>
                    </div>
                    {this.bkashOptions()}
                    <div style={{marginTop: "2em"}}>
                        <button className="btn btn-danger" onClick={this.placeOrder}>Place Order</button>
                    </div>
                </div>
                <div className="p-2 col-lg-4 col-md-4 col-sm-1">
                    <div style={{textAlign: "left"}}>
                        <h6>Order Detail</h6>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                        <div className="col" style={{textAlign: "left",  borderBottom: "1px solid #ddd", padding: ".5em 0", fontSize: "10pt"}}>
                            Total Item
                        </div>
                        <div className="col" style={{textAlign: "right",  borderBottom: "1px solid #ddd", padding: ".5em 0", fontSize: "10pt"}}>
                            {this.state.cartTotalItem}
                        </div>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                        <div className="col" style={{textAlign: "left",  borderBottom: "1px solid #ddd", padding: ".5em 0", fontSize: "10pt"}}>
                            Item Subtotal
                        </div>
                        <div className="col" style={{textAlign: "right",  borderBottom: "1px solid #ddd", padding: ".5em 0", fontSize: "10pt"}}>
                            {this.state.cartCost} Taka
                        </div>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                        <div className="col" style={{textAlign: "left",  borderBottom: "1px solid #ddd", padding: ".5em 0", fontSize: "10pt"}}>
                            Discount
                        </div>
                        <div className="col" style={{textAlign: "right",  borderBottom: "1px solid #ddd", padding: ".5em 0", fontSize: "10pt"}}>
                            - {this.state.cartTotalDiscount} Taka
                        </div>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                        <div className="col" style={{textAlign: "left",  borderBottom: "1px solid #ddd", padding: ".5em 0", fontSize: "10pt"}}>
                           Shipping charge
                        </div>
                        <div className="col" style={{textAlign: "right",  borderBottom: "1px solid #ddd", padding: ".5em 0", fontSize: "10pt"}}>
                            + {this.state.shippingCharge} Taka
                        </div>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                        <div className="col" style={{textAlign: "left",  padding: ".5em 0", fontWeight: "bold", fontSize: "10pt"}}>
                            Grand Total
                        </div>
                        <div className="col" style={{textAlign: "right", padding: ".5em 0", fontWeight: "bold", fontSize: "10pt"}}>
                            = {this.state.grandTotal} Taka
                        </div>
                    </div>
                    <div className="d-flex flex-row justify-content-between" style={{marginTop: "1em"}}>
                        <div className="col" style={{textAlign: "left",  padding: ".5em 0",  fontSize: "10pt"}}>
                            Estimated delivery date
                        </div>
                        <div className="col" style={{textAlign: "right", padding: ".5em 0",  fontSize: "10pt"}}>
                            {this.state.shippingDate}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default PlaceOrder


