import React, { Component } from "react";

import "./App.css";


class Main extends Component {

  state = {};



  componentDidMount = async () => {

   
  };

  buyNft = async () => {
    document.querySelector('#sair').innerHTML = 'Minting...';
    try {
      await this.props.airdropInstance.methods.mint(1,`TsunamiNFT #${this.props.nfts.length+1}`, `https://tsunamiavax.com/nft/${this.props.nfts.length+1}.png`).send({from: this.props.account, value: this.props.price});
      document.querySelector('#sair').innerHTML = 'Succesfully Minted';
      window.location.replace("/mynfts")
    } catch (error) {
      alert("Transaction Rejected")
      document.querySelector('#sair').innerHTML = 'Mint';
    }
  }

  render() {
      return (
        <div className="App">
          <h1>Sale</h1>
          <p class="nft-info">Mint tokens from our sale! Every NFT has a price of {this.props.price/10**18} AVAX.</p>
          <p class="nft-info">NFTs can only be minted from {this.props.airdropStart} to {this.props.airdropEnd}</p>
          <p class="nft-info">Number of NFTs left to mint: {this.props.maxSale - this.props.nftsS}</p>
          <button id="sair" class="mint" onClick={() => this.buyNft()}>Mint</button>
          <div class="nfts">
                <div class="nft">
                  <div class="white-box">
                    <h2>Tsunami NFT</h2>
                    <img class="ipfs-image" src={`https://ipfs.infura.io/ipfs/QmYy72dpMeq56PjRAcjNdwqumaZBobCTeHGMrPVpaTmwdQ`} alt="IPFS Upload"/>
                  </div>
                </div>
                <div class="nft">
                    <div class="white-box">
                      <h2>Tsunami NFT</h2>
                      <img class="ipfs-image" src={`https://ipfs.infura.io/ipfs/Qmc2me9QwSgcYqfutfF36cv1iy3tFAt1YEkR422ySbgVh7`} alt="IPFS Upload"/>
                    </div>
                  </div>
                  <div class="nft">
                    <div class="white-box">
                      <h2>Tsunami NFT</h2>
                      <img class="ipfs-image" src={`https://ipfs.infura.io/ipfs/QmeJpX8sHsogZJiKgKmnUbw9zrTNdGszPbP2Y8M1rAr7Zh`} alt="IPFS Upload"/>
                    </div>
                  </div>
          </div>
        </div>
      );
  }
}

export default Main;
