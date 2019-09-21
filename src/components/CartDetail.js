import React, {Component} from "react";
import CartItem from "./CartItem";
import {Link} from "react-router-dom";

class CartDetail extends Component {

    render() {
        if (this.props.cartTotalItem === 0) {
            return null;
        }

        return (
            <div className="col-lg-12 col-md-12 col-sm-1" style={{
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "#ff569d50",
                padding: "5em"
            }}
            >
                <div style={{
                    position: "relative",
                    backgroundColor: '#fff',
                    boxShadow: "3px 3px 5px -2px rgba(0,0,0,0.75)",
                    borderRadius: "8px",
                    margin: '0 auto'
                }}>
                    <div className="row" style={{background: "#F1f1f1", margin: 0, padding: ".5em 0", borderTopLeftRadius:"6px", borderTopRightRadius:"6px"}}>
                        <div className="col" style={{textAlign: "left"}}>
                            <h4 style={{}}>Cart Items</h4>
                        </div>
                        <div className="col" style={{textAlign: "right"}}>
                            <a href="#" style={{textDecoration: "none", color: "black"}}
                               onClick={this.props.toggleCartList}
                            ><i className="fas fa-2x fa-times-circle"/></a>
                        </div>
                    </div>
                    <div style={{height: "400px", overflow: "scroll"}}>
                        {this.props.cartItemList.map(p => (
                            <CartItem key={'cartItem'+p.id} Item={p}
                                      removeFromCart={this.props.removeFromCart}
                                      updateCart={this.props.updateCart}
                            />
                        ))}
                    </div>
                    <div className="row" style={{
                        background: "#F1f1f1",
                        padding: ".5em 0",
                        margin: 0,
                        position: "inherit",
                        bottom: 0,
                        width: "100%",
                        borderBottomLeftRadius: "8px",
                        borderBottomRightRadius: "8px"
                    }}>
                        <div className="col-lg-6 col-md-6 col-sm-1" style={{textAlign:"center"}}>
                            <button className="btn btn-secondary" onClick={this.props.toggleCartList}>Close</button>
                            <Link className="btn btn-danger" style={{marginLeft: ".5em"}}
                                  key={"finalcheckout"} to={{pathname:"/order", state: "desiredState"}}
                                  onClick={this.props.toggleCartList}><i className="fas fa-thumbs-up"/>  Final Checkout</Link>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-1" style={{textAlign:"right"}}>
                            <span style={{fontSize:"18pt"}}>Total = <b>{this.props.cartCost}</b> Taka</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CartDetail
