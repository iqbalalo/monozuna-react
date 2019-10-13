import React  from "react";

class CartItemViewOnly extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            item: this.props.Item
        };
    }


    removeFromCart = () => {
        this.props.removeFromCart(this.state.item);
    };


    render() {
        return (
            <div className="col-lg-3 col-md-3 col-sm-1 p-2" style={{
                padding: ".5em",
                margin: ".5em",
                border: "1px solid rgb(238, 238, 238)",
                borderRadius: "6px"}}>

                <div className="p-2">
                    <img style={{maxHeight: "100px"}} src={this.state.item.images.length > 1 ? this.state.item.images[0]: this.state.item.images} alt="thumb"/>
                </div>
                <div className="p-2">
                    <a href={"/products/" + this.state.item.category + "/" + this.state.item.id}>{this.state.item.name}</a>
                    <p style={{margin: "1em 0 0 0"}}>
                        <span>Qty. </span>
                        <span>{this.state.item.qty}</span>
                        <span style={{ display: "block", fontSize:"10pt"}}>Unit Price: {this.state.item.unit_price} {this.state.item.currency}</span>
                    </p>
                </div>
                <div className="p-2">
                    <span style={{fontWeight: "500", color:"red"}}>Total: {this.state.item.unit_price * this.state.item.qty} {this.state.item.currency}</span>
                </div>
                <div className="p-2">
                    <button className="btn btn-sm btn-danger"
                       onClick={this.removeFromCart}
                    title="Delete" >Delete</button>
                </div>
            </div>
        );
    }
}

export default CartItemViewOnly;
