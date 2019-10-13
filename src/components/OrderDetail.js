import React from 'react';
import CartItemViewOnly from "./CartItemViewOnly";

const axios = require('axios');

class OrderDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            order_date: null,
            basket_id: null,
            order: null,
            basket: []
        };
    }

    componentDidMount() {
        this.getOrderDetail();
    }

    getOrderDetail = () => {
        var self = this;

        var path = window.location.pathname;
        var levels = path.split("/").filter(item => item);

        console.log(levels);

        var basket_id = levels[levels.length-1];
        var order_date = levels[levels.length-2];
        this.setState({basket_id: basket_id});

        axios.get("https://8dxyapw3pb.execute-api.ap-northeast-1.amazonaws.com/dev/orders/" + order_date + "/" + basket_id)
            .then(function (response) {
                console.log(response.data);
                self.setState( {
                    order: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    render() {

        var o = this.state.order;

        return (
                <div className="col-lg-12 col-md-12">
                    <div className="row d-flex flex-row justify-content-start" style={{border:"1px solid rgb(255, 201, 229)", backgroundColor:"#fff5fa", padding:".5em", borderRadius:"6px"}}>
                            <button className="btn btn-link" style={{color:"#eb3479"}} onClick={this.props.history.goBack}><i style={{fontSize:"20pt"}} className="fas fa-arrow-alt-circle-left"></i></button>
                        <div className="p-2 col" style={{textAlign:"left", fontSize:"9pt", color:"#bd2130", background:"#f5e3eedd", marginLeft: "5px"}}>
                            <div className="d-flex flex-row justify-content-between">
                                <span className="">Order Date:</span>
                                <span className="">{o ? o.order_date.substring(0,4) + "-" + o.order_date.substring(4,6) + "-" +
                                    o.order_date.substring(6,8) + " " + o.order_date.substring(8,10) + ":" +
                                    o.order_date.substring(10,12) : ""}</span>
                            </div>
                            <div className="d-flex flex-row justify-content-between">
                                <span className="">Order No.:</span>
                                <span className="">{o ? o.basket_id : ""}</span>
                            </div>
                            <div className="d-flex flex-row justify-content-between">
                                <span className="">Delivery Date:</span>
                                <span className="">{o ? o.estimated_delivery_date : ""}</span>
                            </div>
                            <div className="d-flex flex-row justify-content-between">
                                <span className="">Payment Type:</span>
                                <span className="">{o ? o.payment_type : ""}</span>
                            </div>
                        </div>
                        <div className="p-2 col" style={{textAlign:"left", fontSize:"9pt", color:"#bd2130", background:"#f5e3eedd", marginLeft: "5px"}}>
                            <div className="d-flex flex-row justify-content-between">
                                <span>Total Item:</span><span>{o ? o.total_item : 0}</span>
                            </div>
                            <div className="d-flex flex-row justify-content-between">
                                <span>Total Amount:</span><span>{o ? o.grand_total : 0}</span>
                            </div>
                            <div className="d-flex flex-row justify-content-between">
                                <span>Delivery Status:</span><span>NA</span>
                            </div>
                        </div>
                        <div className="p-2 col" style={{textAlign:"left", fontSize:"9pt", color:"#bd2130", background:"#f5e3eedd", marginLeft: "5px"}}>
                            <div className="d-flex flex-row justify-content-between">
                                <span>Customer:</span><span>{o ? o.customer_name : ""}</span>
                            </div>
                            <div className="d-flex flex-row justify-content-between">
                                <span>Phone:</span><span>{o ? o.customer_phone : ""}</span>
                            </div>
                            <div className="d-flex flex-row justify-content-between">
                                <span>Address:</span><span>{o ? o.customer_address : ""}</span>
                            </div>
                        </div>
                        <div className="p-2 col" style={{textAlign:"left", fontSize:"9pt", color:"#bd2130", background:"#f5e3eedd", marginLeft: "5px"}}>

                        </div>
                    </div>
                    <div className="row d-flex flex-row justify-content-start" style={{marginTop:"1em"}}>
                    {o ? o.basket.map((b,i) => (
                        <CartItemViewOnly key={'cartItemViewOnly'+i} Item={b}/>
                    )): ""}
                    </div>
                </div>
        );
    }
}


export default OrderDetail;
