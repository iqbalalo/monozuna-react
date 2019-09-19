import React, {Component} from "react";

class Cart extends Component {

    render() {
        return (
            <div>
                <button className="btn btn-light"
                onClick={this.props.toggleCartList}
                >
                    <i className="fas fa-shopping-basket" style={{marginRight: "1em"}}/>
                    <span>{this.props.cartTotalItem} {this.props.cartTotalItem > 1 ? "Items" : "Item"}</span><span
                    style={{margin: "0 .5em"}}> | </span><span><b>{this.props.cartCost}</b> Taka</span>
                </button>
            </div>
        )
    }
}

export default Cart
