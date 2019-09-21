import React, {Component} from "react";
import Product from "./Product";
import Breadcrumbs from "./Breadcrumbs";

class Products extends Component {
    state = {
        category: null,
        products: [],
        productLoading: true
    };

    componentWillMount() {
        let path = window.location.pathname;
        let levels = path.split("/").filter(item => item);
        let cat = levels[levels.length-1];
        this.setState({category: cat});
    }

    componentDidMount() {
        this.getProductList();
    }

    getProductList = () => {
        var self = this;
        const axios = require('axios');

        console.log("category", self.state.category);

        axios.get('https://8dxyapw3pb.execute-api.ap-northeast-1.amazonaws.com/dev/products')
            .then(function (response) {
                console.log("product list", response.data);

                let filterProducts = response.data.filter(p => {
                    return p.category === self.state.category || self.state.category==="products" || self.state.category===undefined
                });

                console.log("filter products by", filterProducts);

                self.setState({
                    products: filterProducts,
                    productLoading: false
                });

            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
            });
    };


    render() {

        return (
            <div>
                <Breadcrumbs levels={window.location.pathname}/>
                <div className="row" style={{margin: "2em 0"}}>
                    {this.state.productLoading ? <div>Please wait! Loading...</div> : ""}

                    <React.Fragment>
                        {this.state.products.map(p => (
                            <Product key={"product-" + p.id} product={p}/>
                        ))}
                    </React.Fragment>
                </div>
                {/*<div className="" style={{textAlign:"center"}}>*/}
                {/*    <button onClick={this.loadMore} style={{margin: "1em 0", width:"20%"}}>Load More</button>*/}
                {/*</div>*/}
            </div>
        );
    }
}

export default Products;
