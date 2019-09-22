import React, {Component} from "react";

class Success extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderNumber: null
        }
    }

    componentDidMount() {
        let path = window.location.pathname;
        let levels = path.split("/").filter(item => item);
        let orderNo = levels[levels.length-1];
        this.setState({orderNumber: orderNo});
        this.props.getBasketInfo(orderNo);
    }

    render() {
        return (
                <div className="row">
                    <p className="alert alert-success" style={{display:"block", margin: "1em auto", padding:"2em", fontSize:"20pt"}}>
                        Your order has been placed successfully. <br/> Order Number is <b>{this.state.orderNumber}</b><br/><br/>Our customer representative will contact you soon.<br/><br/>
                        <a href="/" className="btn btn-success">Go to Product List</a>
                    </p>
                </div>
        );
    }
}

export default Success
