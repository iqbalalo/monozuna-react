import React from 'react';
import Order from "./Order";


const axios = require('axios');

class Orders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        };

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
            <div className="row" style={{padding:".5em"}}>
                {this.state.orders.map(o => (
                    <Order key={"order-" + o.order_date} order={o ? o : []}/>
                ))}
            </div>
        );
    }
}


export default Orders;
