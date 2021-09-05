import React, { Component } from "react";
import ProductBuyContract from "./contracts/ProductBuy.json";
import TestToken from "./contracts/TestToken.json";
import getWeb3 from "./getWeb3";

import "./App.css";


class Main extends Component {

  state = { products: null, web3: null, account: null, contract: null, token: null, tokenName: null, approved: false, product: null, statuses: null, decimals: null, balance: null };

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

      let products = await instance.methods.viewProducts().call();

      let tokenName = await token.methods.name().call();

      let tokenSymbol = await token.methods.symbol().call();

      let decimals = await token.methods.decimals().call();

      let balance = await token.methods.balanceOf(account[0]).call();

      let statuses = await instance.methods.getProductStatuses().call();
      console.log(statuses)

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, account: account[0], contract: instance, products, token,tokenName, tokenSymbol, product, statuses, decimals, balance });

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  handleApprove = async (price) => {
    let receipt = await this.state.token.methods.approve(this.state.product, price).send({from: this.state.account});
    console.log(receipt)
    this.setState({approved: true})
  }

  handleBuy = async (id) => {
    await this.state.contract.methods.buyProduct(id).send({from: this.state.account});
    await this.getProductStatuses();
  }

  getProductStatuses = async () => {
    let statuses = await this.state.contract.methods.getProductStatuses().call();
    this.setState({statuses});
  }
  
  render() {
    let content;
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contracts...</div>;
    } else if (this.state.products.length === 0) {
      content = <h3 id="no-products">No products have been listed yet.</h3>
    } else {
      content = this.state.products.map((product, key) => {
        let status = this.state.statuses[key]
        return ( 
          <div className="product">
            <h2>{product.productName}</h2>
            <p>Price: {product.productPrice/10**this.state.decimals} {this.state.tokenSymbol}</p>
            <p>Id: {product.productId}</p>
            <p>Seller: {product.productSeller}</p>
            <p>Status: {status === 1 ? "Sold" : "Unsold"}</p>
            {status === 0 ? !this.state.approved ? <button onClick={() => this.handleApprove(product.productPrice)}>Approve Contract</button> : <button onClick={() => this.handleBuy(product.productId)}>Buy</button> : <p></p>}
          </div>
        )    
      })
    }
    return (
      <div className="App">
        <h1>Product Marketplace</h1>
        <p>Your {this.state.tokenName} balance: {this.state.balance/10**this.state.decimals}</p>
        <div id="products">
          {content}
        </div>
      </div>
    );
  }
}

export default Main;
