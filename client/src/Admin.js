import React, { Component } from "react";

import "./App.css";


class Admin extends Component {

  state = {};

  componentDidMount = async () => {
  };

  setStartDate = async () => {
    let arg = document.getElementById("set-s").value;
    await this.props.airdropInstance.methods.setAirdropStart(arg).send({from: this.props.account});
  }
  setEndDate = async () => {
    let arg = document.getElementById("set-e").value;
    await this.props.airdropInstance.methods.setAirdropEnd(arg).send({from: this.props.account});
  }
  setNFTPrice = async () => {
    let arg = document.getElementById("set-p").value;
    // Decimal
    const decimals = this.props.web3.utils.toBN(18);
    // Amount of token
    const tokenAmount = this.props.web3.utils.toBN(arg); 
    // Amount as Hex - contract.methods.transfer(toAddress, tokenAmountHex).encodeABI();
    const tokenAmountHex = '0x' + tokenAmount.mul(this.props.web3.utils.toBN(10).pow(decimals)).toString('hex');

    await this.props.airdropInstance.methods.setPrice(tokenAmountHex).send({from: this.props.account});
  }

  setNFTSale = async () => {
    let arg = document.getElementById("set-ns").value;

    await this.props.airdropInstance.methods.changeMaxSaleTokens(arg).send({from: this.props.account});
  }
  setNFTAirdrop = async () => {
    let arg = document.getElementById("set-na").value;
    await this.props.airdropInstance.methods.changeMaxAirdropTokens(arg).send({from: this.props.account});
  }

  render() {
      return (
        <div className="App">
          <h1>Admin Dashboard</h1>
          <div>
            <input id="set-s" class="change" placeholder="Block Timestamp"></input>
            <button id="mair" class="change-button" onClick={() => this.setStartDate()}>Set Start Date</button>
            <br/>
            <input id="set-e" class="change" placeholder="Block Timestamp"></input>
            <button id="mair" class="change-button" onClick={() => this.setEndDate()}>Set End Date</button>
            <br/>
            <input id="set-p" class="change" placeholder="Price in AVAX (with decimals) "></input>
            <button id="mair" class="change-button" onClick={() => this.setNFTPrice()}>Set NFT Price</button>
            <br/>
            <input id="set-ns" class="change" placeholder="NFTs for Sale"></input>
            <button id="mair" class="change-button" onClick={() => this.setNFTSale()}>Set Number of NFTs for Sale </button>
            <br/>
            <input id="set-na" class="change" placeholder="NFTs for Airdrop"></input>
            <button id="mair" class="change-button" onClick={() => this.setNFTAirdrop()}>Set Number of NFTs for Airdrop </button>
          </div>
        </div>
      );
  }
}

export default Admin;
