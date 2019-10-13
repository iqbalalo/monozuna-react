import React from 'react';
import {Link} from "react-router-dom";


class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {
        var o = this.props.order;
        return (

                <div className="col-lg-12 col-md-12 col-sm-1" style={{border:"1px solid rgb(255, 201, 229)", backgroundColor:"#fff5fa",　borderRadius:"6px", marginBottom:".5em"}}>
                    <Link to={"/orders/"+ o.order_date + "/" + o.basket_id} style={{textDecoration:"none", color: "black"}}>

                    <div className="row" style={{fontSize: "11pt"}}>
                        <div className="p-2 col" style={{textAlign: "left"}}>
                            <span style={{display:"block", fontSize:"8pt", color:"#bd2130"}}>Order Date</span>
                            <span style={{color:"#bd2130"}}>{o.order_date.substring(0,4) + "-" + o.order_date.substring(4,6) + "-" +
                                o.order_date.substring(6,8) + " " + o.order_date.substring(8,10) + ":" +
                            o.order_date.substring(10,12)}</span>
                        </div>
                        <div className="p-2 col-lg-2 col-md-2" style={{textAlign: "left"}}>
                            <span style={{display:"block", fontSize:"8pt", color:"#bd2130"}}>Order No.</span><span style={{color:"#bd2130"}}>{o.basket_id}</span>
                        </div>
                        <div className="p-2 col" style={{textAlign: "left"}}>
                            <span style={{display:"block", fontSize:"8pt", color:"#bd2130"}}>Customer Name</span><span style={{color:"#bd2130"}}>{o.customer_name}</span>
                        </div>
                        <div className="p-2 col" style={{textAlign: "left"}}>
                            <span style={{display:"block", fontSize:"8pt", color:"#bd2130"}}>Delivery Date</span>
                            <span style={{color:"#bd2130"}}>{o.estimated_delivery_date}</span>
                        </div>
                        <div className="p-2 col" style={{textAlign: "left"}}>
                            <span style={{display:"block", fontSize:"8pt", color:"#bd2130"}}>Payment Type</span><span style={{color:"#bd2130"}}>{o.payment_type}</span>
                        </div>
                        <div className="p-2 col" style={{textAlign: "right"}}>
                            <span style={{display:"block", fontSize:"8pt", color:"#bd2130"}}>Total Amount</span><span style={{color:"#bd2130"}}>{o.grand_total}</span>
                        </div>

                    </div>
            </Link>
                </div>
        );
    }
}


export default Order;
