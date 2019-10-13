import React, { Component } from "react";


class CategoryMenu extends Component {
  state = {
    categories: [
      {
        "id": "all",
        "name": "All"
      }
    ]
  };

  componentWillMount() {
    var self = this;
    const axios = require('axios');

    axios.get('https://8dxyapw3pb.execute-api.ap-northeast-1.amazonaws.com/dev/product_category')
        .then(function (response) {
          var categories = self.state.categories.concat(response.data[0]);

          self.setState({
            categories: categories
          });
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
        });
  }

  render() {
    return this.state.categories.map(c => (
        <a key={"menuitem-" + c.id} href={"/products/" + (c.id === "all" ? "" : c.id)} style={{textAlign:"left", display:"block", padding:".3em", color:"#bd2130", marginTop: "5px" }}>{c.name}</a>
        // <Link target="_self" key={"menuitem-" + c.id} to={"/products/" + (c.id === "all" ? "" : c.id)} style={{textAlign:"left", display:"block", padding:".3em", color:"#ff77bc", marginTop: "5px" }}>{c.value}</Link>
    ))
  }
}

export default CategoryMenu;
