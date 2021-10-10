import React, { Component } from "react";
import "./App.css";


class MyNFTs extends Component {

  state = { };

  componentDidMount = async () => {
  };

  claimNFTBought = async (tokenId) => {
    await this.props.airdropInstance.methods.claimNFTBought(tokenId).send({from: this.props.account});
    window.location.reload()
  }

  render() {
    return (
        <div className="App">
        <h1>My NFTs</h1>
        <p class="nft-info">The NFTs bought from the sale can be claimed at: {this.props.airdropEnd}.</p>
        <p class="nft-info">The NFTs bought from Airdrop are already claimed!</p>
        <div class="nfts">
          {this.props.nfts.map((nft, key) => {
              if (nft.owner.toLowerCase() === this.props.account.toLowerCase()) {
                if (nft.purpose === "1") {
                    return (
                        <div class="nft">
                          <div class="white-box">
                            <h2>{nft.title}</h2>
                            <p class="nft-info">Can claim at end of sale</p>
                            <p class="nft-info">Id: #{nft.id}</p>
                            <img class="ipfs-image" src={nft.image} alt="IPFS Upload"/>
                            <p class="nft-info" id="desc">Your own Tsuanmi NFT</p>
                            <p class="nft-info">{nft.claimed === "1" ? <button class="purchase" disabled>Claimed</button> : <button class="purchase" onClick={() => this.claimNFTBought(nft.id)}>Claim</button>}</p>
                          </div>
                        </div>
                      );
                } else if (nft.purpose === "0") {
                    return (
                        <div class="nft">
                          <div class="white-box">
                            <h2>{nft.title}</h2>
                            <p class="nft-info">Received from Airdrop</p>
                            <h3 class="nft-info">Id: #{nft.id}</h3>
                            <img class="ipfs-image" src={nft.image} alt="IPFS Upload"/>
                            <p class="nft-info" id="desc">Your own Tsuanmi NFT</p>
                            <button class="purchase-disabled" disabled>Claimed</button>
                          </div>
                        </div>
                      );                    
                }
              }
            return "";
          })}
        </div>
      </div>
    );
  }
}

export default MyNFTs;
