import React from "react";
import Breadcrumbs from "./Breadcrumbs";
import * as _ from "lodash";
import Product from "./Product";


const axios = require('axios');

class ProductDetail extends React.Component {

    state = {
        product: {
            name:"Product Name",
            unit: "",
            unit_price: 0,
            images:[],
            tags:[],
            tags_image:[]
        }
    };

    componentWillMount() {
        let path = window.location.pathname;
        let levels = path.split("/").filter(item => item);
        let cat = levels[levels.length - 2];
        let id = levels[levels.length-1];
        this.setState({category: cat});
        this.setState({product_id: id});

        var self = this;

        axios.get('https://8dxyapw3pb.execute-api.ap-northeast-1.amazonaws.com/dev/products/' + cat + "/" + id)
            .then(function (response) {
                console.log(response.data);

                response.data["qty"] = 1;

                self.setState({
                    product: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    addToCart = () => {
        this.props.addToCart(this.state.product);
    };

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

    setProductQuantity = (event) => {
        var item = this.state.product;
        item["qty"] = Number(event.target.value);

        this.setState({
            product: item
        });
    };

    render() {
        return (
            <div>
                <Breadcrumbs levels={window.location.pathname}/>

                <div className="row" style={{margin: "2em 0"}}>
                    <div className="col-lg-4 col-md-4 col-sm-1" style={{textAlign: "center"}}>
                        {
                            this.state.product.images.map((i, ix) => (
                                <img key={"img-" + i.id + ix} src={i} className="" style={{maxHeight: "510px", maxWidth:"100%", marginBottom: "1em"}} alt="thumb"/>
                            ))
                        }
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-1" style={{textAlign: "left"}}>

                        <h4>{this.state.product.name}</h4>
                        <p style={{marginTop: "1em", marginBottom: "1em", color: "#ff77bc", fontSize: "14pt"}}>
                            {this.state.product.unit_price} Taka / {this.state.product.unit}
                        </p>
                        <p style={{
                            display: "block",
                            fontSize: "10pt",
                            marginTop: ".5em",
                            marginBottom: ".1em"
                        }}>{this.state.product.discount > 0 ? "Discount:  " + this.state.product.discount + " Taka" : ""}</p>
                        <p style={this.styleInStock(this.state.product.in_stock)}>
                            {this.state.product.in_stock ? "In Stock" : "In Stock"}
                        </p>
                        <p style={{marginTop: "2em"}}>
                            <span style={{marginRight: ".5em"}}>Qty.</span>
                            <select value={this.state.product.qty} onChange={this.setProductQuantity}>
                                {_.range(1, 101).map((i) => (
                                    <option key={"qtyOpt" + i} value={i}>{i}</option>
                                ))}
                            </select>
                        </p>
                        <p>
                            <button onClick={this.addToCart} className="btn btn-outline-danger"
                                    style={{marginTop: "2em"}}><i className="fas fa-shopping-bag"/> Add to Bag
                            </button>
                        </p>
                        <p style={{marginTop: "2em"}}>
                            {
                                this.state.product.tags_image.map((i, ix) => (
                                    <img key={this.state.product.tags[ix]} src={i} className="" style={{maxHeight:"75px", maxWidth: "100px"}} alt={this.state.product.tags[ix]}/>
                                ))
                            }
                        </p>
                        <p style={{textAlign: "justify", marginTop: "2em", fontSize: "10pt"}} dangerouslySetInnerHTML={{__html: this.state.product.description}}>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductDetail;
