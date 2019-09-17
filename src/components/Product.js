import React, {Component} from "react";
import {Link} from "react-router-dom";

class Product extends Component {

    styleInStock = inStock => {
        if (inStock === true) {
            return {
                fontWeight: "100",
                color: "#666",
                margin: ".25em 2em .25em 0",
                fontSize: "10pt"
            };
        } else {
            return {
                fontWeight: "100",
                margin: ".25em 2em .25em 0",
                textDecoration: "line-through",
                color: "#666",
                fontSize: "10pt"
            };
        }
    };

    render() {
        return (
            <div
                className="col-lg-3 col-md-6 col-sm-1 ProductThumb"
                style={{
                    minHeight: "300px",
                    margin: "0 0 1em 0",
                    padding: ".6em"
                }}
            >
                <Link
                    to={"/products/" + this.props.product.category + "/" + this.props.product.id}>
                    <div>
                        <img
                            src={this.props.product.images[0]}
                            className=""
                            style={{width: "70%", objectFit: "cover"}}
                            alt="thumb"
                        />
                    </div>
                    <div className="text-left">
                        <p style={{marginTop: ".5em", marginBottom: ".1em"}}>
                            {this.props.product.name}
                        </p>
                        <p style={{marginTop: ".5em", marginBottom: ".1em", color: "#ff77bc"}}>
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
                        <p style={this.styleInStock(this.props.product.in_stock)}>
                            {this.props.product.in_stock ? "In Stock" : "In Stock"}
                        </p>
                    </div>
                </Link>
            </div>
        );
    }
}

export default Product;
