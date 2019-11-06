import React, {Component} from "react";
import {Link} from "react-router-dom";

class Product extends Component {

    render() {
        return (
            <div className="d-flex flex-column p-2 col-lg-3 col-md-6 col-sm-1 ProductThumb">
                <Link
                    to={"/products/" + this.props.product.category + "/" + this.props.product.id}>
                    <div className="p-2">
                        <img
                            src={this.props.product.images[0]}
                            className=""
                            style={{maxHeight: "200px", padding: ".5em"}}
                            alt="thumb"
                        />
                    </div>
                    <div className="text-center" style={{padding:".1em"}}>
                        <p style={{marginTop: ".5em", marginBottom: ".1em"}}>
                            {this.props.product.name}
                        </p>
                        <p style={{marginTop: ".5em", marginBottom: ".1em", color: "rgb(234, 3, 3)"}}>
                            {this.props.product.unit_price} {this.props.product.currency}{" "}
                            / {this.props.product.unit}
                        </p>
                        <p
                            style={{
                                marginTop: ".5em",
                                marginBottom: ".1em",
                                fontSize: "10pt"
                            }}
                        >
                            {this.props.product.discount !== "0"
                                ? "Discount: " + this.props.product.discount
                                : ""}
                        </p>
                        <p style={{marginBottom: ".25em",
                            fontSize: "9pt",
                            textAlign:"center"}}>
                            {this.props.product.in_stock ? "In Stock" : "Call for order"}
                        </p>
                    </div>
                </Link>
            </div>
        );
    }
}

export default Product;
