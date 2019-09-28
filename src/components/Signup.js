import React, {Component} from "react";

class Signup extends Component {

    render() {
        return (
            <div className="col">
                <div className="row">
                    <h6>Sign Up</h6>
                </div>
                <div className="row" style={{marginTop: "1em"}}>
                    <input type="text" className="form-control" required placeholder="Name"/>
                </div>
                <div className="row" style={{marginTop: ".5em"}}>
                    <input type="text" className="form-control" placeholder="Phone"/>
                </div>
                <div className="row" style={{marginTop: ".5em"}}>
                    <input type="text" className="form-control" required placeholder="Email"/>
                </div>
                <div className="row" style={{marginTop: ".5em"}}>
                    <input type="password" className="form-control" required placeholder="Password"/>
                </div>
                <div className="row" style={{marginTop: "2em"}}>
                    <button className="btn btn-primary">Submit</button>
                </div>
            </div>
        );
    }
}

export default Signup
