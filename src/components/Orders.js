import React from 'react';
import Order from "./Order";

const axios = require('axios');

class Orders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
        this.getOrderList();
    }

    componentDidMount() {

    }

    getOrderList = () => {
        var self = this;

        axios.get("https://8dxyapw3pb.execute-api.ap-northeast-1.amazonaws.com/dev/orders")
            .then(function (response) {
                console.log(response.data);
                self.setState( {
                    orders: response.data["Items"]
                })

            })
            .catch(function (error) {
                console.log(error);
            });
    };

    render() {
        return (
            <div className="row">
                <div className="col-lg-12 col-md-12">
                <div className="d-flex flex-wrap flex-row justify-content-between" style={{fontSize: "10pt"}}>
                    <div className="p-2 col" style={{textAlign: "left", fontWeight:"bold", background:"rgb(201, 211, 255)"}}>
                        Order Date
                    </div>
                    <div className="p-2 col-lg-3 col-md-3" style={{textAlign: "left", fontWeight:"bold", background:"rgb(201, 211, 255)"}}>
                        Order Number
                    </div>
                    <div className="p-2 col" style={{textAlign: "left", fontWeight:"bold", background:"rgb(201, 211, 255)"}}>
                        Customer Name
                    </div>
                    <div className="p-2 col" style={{textAlign: "left", fontWeight:"bold", background:"rgb(201, 211, 255)"}}>
                        Customer Phone
                    </div>
                    <div className="p-2 col" style={{textAlign: "right", fontWeight:"bold", background:"rgb(201, 211, 255)"}}>
                        Total Amount
                    </div>
                    <div className="p-2 col" style={{textAlign: "right", fontWeight:"bold", background:"rgb(201, 211, 255)"}}>
                        Action
                    </div>
                </div>
                <div className="d-flex flex-wrap flex-row justify-content-between" style={{fontSize: "10pt"}}>
                {this.state.orders.map(o => (
                    <Order key={"order-" + o.order_date} order={o ? o : []}/>
                ))}
                </div>

            </div>
            </div>
        );
    }
}


export default Orders;
