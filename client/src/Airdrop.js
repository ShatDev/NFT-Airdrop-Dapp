import React, { Component } from 'react'
import "./App.css";

class ListProducts extends Component {

  state = { reset: "" }

  componentDidMount = async () => {
  };

  claimNft = async () => {
    document.querySelector('#mair').innerHTML = 'Claiming...';
    try {
      await this.props.airdropInstance.methods.mint(0, `TsunamiNFT #${this.props.nfts.length+1}`, `https://tsunamiavax.com/nft/${this.props.nfts.length+1}.png`).send({from: this.props.account});
      document.querySelector('#mair').innerHTML = 'Successfully Claimed';
      window.location.replace("/mynfts")
    } catch (error) {
      alert("Transaction Rejected")
      document.querySelector('#mair').innerHTML = 'Claim Airdrop';
    }
  } 

  render() {
      return (
        <div className="App">
          <h1>Airdrop</h1>
          <p class="nft-info">Mint tokens from our airdrop! Claiming is free! But there are a limited amount of NFTs for airdrop</p>
          <p class="nft-info">NFTs can only be claimed from {this.props.airdropStart} to {this.props.airdropEnd}</p>
          <p class="nft-info">Number of NFTs left to claim: {this.props.maxAirdrop - this.props.nftsA}</p>
          <button id="mair" class="mint" onClick={() => this.claimNft()}>Claim Airdrop</button>
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

export default ListProducts;
