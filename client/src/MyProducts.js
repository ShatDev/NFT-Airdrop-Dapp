import React, { Component } from "react";
import ProductBuyContract from "./contracts/ProductBuy.json";
import TestToken from "./contracts/TestToken.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class MyProducts extends Component {
  state = { products: null, web3: null, account: null, contract: null, token: null, tokenName: null, approved: false, product: null, decimals: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const account = await window.ethereum.request({ method: 'eth_accounts' });
      console.log(account[0])

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetworkProduct = ProductBuyContract.networks[networkId];
      const instance = new web3.eth.Contract(
        ProductBuyContract.abi,
        deployedNetworkProduct && deployedNetworkProduct.address,
      );

      let tokenAddress = await instance.methods.token().call();

      const deployedNetworkToken = TestToken.networks[networkId];
      const token = new web3.eth.Contract(
        TestToken.abi,
        deployedNetworkToken && tokenAddress,
      );

      let product = deployedNetworkProduct.address;

      let products = await instance.methods.getBoughtProducts().call({from: this.state.account});
      console.log(products)

      let tokenName = await token.methods.name().call();

      let tokenSymbol = await token.methods.symbol().call();

      let decimals = await token.methods.decimals().call();

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, account: account[0], contract: instance, products, token,tokenName, tokenSymbol, product, decimals});

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };
  
  render() {
    let content;
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contracts...</div>;
    } else if (this.state.products.length === 0) {
      content = <h3 id="no-products">You haven't bought any products.</h3>
    } else {
      content = this.state.products.map((product, key) => {
        return ( 
            <div className="product">
              <h2>{product.productName}</h2>
              <p>Id: {product.productId}</p>
              <p>Product Link: {product.productLink}</p>
              <p>Price: {product.productPrice/10**this.state.decimals} {this.state.tokenSymbol}</p>
            </div>
        )    

      })
    }
    return (
      <div className="App">
        <h1>My Products</h1>
        <div id="products">
          {content}
        </div>
      </div>
    );
  }
}

export default MyProducts;
