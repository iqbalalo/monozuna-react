import React from 'react';

class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {
        var oDate = this.props.order.order_date;
        return (
                <div className="col-lg-12 col-md-6 col-sm-1">
                    <div className="row" style={{fontSize: "10pt"}}>
                        <div className="p-2 col" style={{textAlign: "left"}}>
                            <a href="">{oDate.substring(0,4) + "-" + oDate.substring(4,6) + "-" +
                            oDate.substring(6,8) + " " + oDate.substring(8,10) + ":" +
                            oDate.substring(10,12)}</a>
                        </div>
                        <div className="p-2 col-lg-3 col-md-3" style={{textAlign: "left"}}>
                            <a href="">{this.props.order.basket_id}</a>
                        </div>
                        <div className="p-2 col" style={{textAlign: "left"}}>
                            <a href="">{this.props.order.customer_name}</a>
                        </div>
                        <div className="p-2 col" style={{textAlign: "left"}}>
                            <a href="">{this.props.order.customer_phone}</a>
                        </div>
                        <div className="p-2 col" style={{textAlign: "right"}}>
                            <a href="">{this.props.order.grand_total}</a>
                        </div>
                        <div className="p-2 col" style={{textAlign: "right"}}>
                            ...
                        </div>
                    </div>
                </div>
        );
    }
}


export default Order;
