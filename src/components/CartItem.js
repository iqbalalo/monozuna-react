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

                <div className="col-lg-2 col-md-2 col-sm-1">
                    <img style={{maxHeight: "100px"}} src={this.state.item.images.length > 1 ? this.state.item.images[0]: this.state.item.images} alt="thumb"/>
                </div>
                <div className="col-lg-7 col-md-7 col-sm-1" style={{textAlign: "left"}}>
                    <a href={"/products/" + this.state.item.category + "/" + this.state.item.id}>{this.state.item.name}</a>
                    <p style={{marginTop: "1em"}}>
                        <span>Qty. </span>
                        <select value={this.state.item.qty} onChange={this.updateCart}>
                            {_.range(1,101).map((i) => (
                                <option key={"qtyOpt" + i} value={i}>{i}</option>
                            ))}
                        </select>
                        <span style={{ display: "block", fontSize:"10pt", marginTop: ".5em"}}>Unit Price: {this.state.item.unit_price} {this.state.item.currency}</span>
                    </p>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-1" style={{textAlign: "right"}}>
                    <span style={{fontWeight: "500", color:"red"}}>{this.state.item.unit_price * this.state.item.qty} {this.state.item.currency}</span>
                </div>
                <div className="col-lg-1 col-md-1 col-sm-1" style={{textAlign: "right"}}>
                    <button className="btn btn-link" style={{color: "#999"}}
                       onClick={this.removeFromCart}
                    title="Delete" ><i className="fas fa-times"/></button>
                </div>
            </div>
        );
    }
}

export default CartItem;
