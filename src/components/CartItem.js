import React  from "react";
import * as _ from "lodash";

class CartItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            item: this.props.Item
        };
    }


    removeFromCart = () => {
        this.props.removeFromCart(this.state.item);
    };


    updateCart = (event) => {
        var item = this.state.item;
        item.qty = event.target.value;

        this.setState({
            item: item
        });

        this.props.updateCart(item);
    };


    render() {
        return (
            <div className="row" style={{
                padding: ".5em",
                margin: ".5em",
                border: "1px solid rgb(238, 238, 238)",
                borderRadius: "6px"}}>

                <div className="col-2">
                    <a href="#"><img style={{height: "100%", width: "100%", objectFit: "cover"}} src={this.state.item.images.length > 1 ? this.state.item.images[0]: this.state.item.images}/></a>
                </div>
                <div className="col" style={{textAlign: "left"}}>
                    <a href="#">{this.state.item.name}</a>
                    <p>
                        Description
                    </p>
                    <p>
                        <span>Qty. </span>
                        <select value={this.state.item.qty} onChange={this.updateCart}>
                            {_.range(1,101).map((i) => (
                                <option key={"qtyOpt" + i} value={i}>{i}</option>
                            ))}
                        </select>
                        <span style={{marginLeft: "1em", fontSize:"10pt"}}>Unit Price: {this.state.item.unit_price} {this.state.item.currency}</span>
                    </p>
                </div>
                <div className="col-2" style={{textAlign: "right"}}>
                    <span style={{fontWeight: "500", color:"red"}}>{this.state.item.unit_price * this.state.item.qty} {this.state.item.currency}</span>
                </div>
                <div className="col-1" style={{textAlign: "right"}}>
                    <a href="#" style={{color: "#999"}}
                       onClick={this.removeFromCart}
                    title="Delete" ><i className="fas fa-times"/></a>
                </div>
            </div>
        );
    }
}

export default CartItem;
