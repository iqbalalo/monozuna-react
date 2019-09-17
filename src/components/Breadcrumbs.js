import React, {Component} from "react";
import {Link} from "react-router-dom";

class Breadcrumbs extends Component {

    state = {
        links: null
    };

    componentDidMount() {

        let levels = this.props.levels;
        levels = levels.split("/").filter(item => item);

        let links = [];

        for (var i = 0; i < levels.length; i++) {
            if (levels[i]) {
               links.push((links[links.length-1] ? links[links.length-1] : "") + "/" + levels[i]);
            }
        }

        for (i = 0; i < links.length; i++) {

            if(i === links.length-1) {
                links[i] = <span key={"blinkholder-" + i}><Link style={{color: "#666", fontSize:"10pt"}} key={"blink-" + i} to={links[i]}>{levels[i]==="products"? "All Products" : levels[i].charAt(0).toUpperCase()+levels[i].slice(1)}</Link></span>
            } else {
                links[i] = <span key={"blinkholder-" + i} style={{color: "#666", fontSize:"10pt"}}><Link style={{color: "#666", fontSize:"10pt"}} key={"blink-" + i} to={links[i]}>{levels[i]==="products"? "All Products" : levels[i].charAt(0).toUpperCase()+levels[i].slice(1)}</Link> / </span>
            }

        }

        if(links.length === 0) {
            links.push("All Products");
        }

        this.setState({
            links: links
        });
    }


    render() {
        return (
            <div style={{textAlign: "left", padding: "0 0 .5em"}}>
                {this.state.links}
            </div>
        )
    }
}

export default Breadcrumbs
