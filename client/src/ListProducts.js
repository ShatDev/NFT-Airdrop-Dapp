import React, { Component } from 'react'
import ProductBuyContract from "./contracts/ProductBuy.json";
import TestToken from "./contracts/TestToken.json";
import getWeb3 from "./getWeb3";
import "./App.css";

const BigNumber = require('bignumber.js');

class ListProducts extends Component {

    state = {products: null, web3: null, account: "", contract: null, token: null, tokenName: null, approved: false, product: null, statuses: null, taxTolerance: null, priceWithTax: "0", decimals: null }

    componentDidMount = async () => {
        try {
          // Get network provider and web3 instance.
            const web3 = await getWeb3();

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

            let taxTolerance = await instance.methods.taxTolerance().call();

            let decimals = await token.methods.decimals().call();


          // Set web3, accounts, and contract to the state, and then proceed with an
          // example of interacting with the contract's methods.
          this.setState({web3, account: account[0], contract: instance, products, token, tokenName, tokenSymbol, product, taxTolerance, decimals });
    
        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
          );
          console.error(error);
        }
    };    

    handleSubmit = async (event) => {
        event.preventDefault();

        let name = document.getElementsByName("field1")[0].value;
        let link = document.getElementsByName("field2")[0].value;
        let price = document.getElementsByName("field3")[0].value;

        let bnPrice = new BigNumber(price).times(10**this.state.decimals);
        console.log(bnPrice)

        await this.state.contract.methods.listProduct(name, link, bnPrice.toString()).send({from: this.state.account});
    }

    handlePrice = async (event) => {
        if (this.state.taxTolerance !== "0") {
            let priceWithTax = document.getElementsByName("field3")[0].value * (100 - this.state.taxTolerance) / 100;
            this.setState({priceWithTax})
        } else {
            this.setState({priceWithTax: document.getElementsByName("field3")[0].value})
        }

    }


  render() {
    return (
        <div className="App">
            <h1>List a Product</h1>
            <div class="form-style-6">
                <h1>Product Details</h1>
                <form>
                    <input type="text" name="field1" placeholder="Product Name" />
                    <input type="text" name="field2" placeholder="Product Link" />
                    <input onChange={this.handlePrice} type="text" name="field3" placeholder={"Product Price in " + this.state.tokenName}></input>
                    <p>You will receive {this.state.priceWithTax} {this.state.tokenSymbol} ({this.state.taxTolerance + "% tax on " + this.state.tokenName + " transfer"})</p>
                    <input type="submit" value="List" onClick={this.handleSubmit} />

                </form>
            </div>
        </div>
    );
  }
}

export default ListProducts;
