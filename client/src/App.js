import React from "../node_modules/react";
import "./App.css";
import "./index.css";
import Main from "./Main";
import Airdrop from "./Airdrop";
import Navbar from "./Navbar";
import MyNFTs from "./MyNFTs";
import Admin from "./Admin";
import NFTAirdrop from "./contracts/NFTAirdrop.json";
import getWeb3 from "./getWeb3";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
/**
 * @App Build Decentralized Art Market using ERC-721
 * @Util initail App build main class
 * @Book Learn Ethereum
 * @author brian wu
 */
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

class App extends React.Component {

  state = { web3: null, account: "", networkId: null, airdropInstance: null, ipfs: null, nfts: [], airdropEnd: null, nftsA: null, nftsS: null, loading:true }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      let account = await web3.eth.getAccounts();
      account = account[0].toLowerCase();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetworkAirdrop = NFTAirdrop.networks[networkId];
      const airdropInstance = new web3.eth.Contract(
        NFTAirdrop.abi,
        deployedNetworkAirdrop && deployedNetworkAirdrop.address,
      );

      let nftsA = await airdropInstance.methods.nftsAirdrop().call();
      let nftsS = await airdropInstance.methods.nftsSale().call();
      const price = await airdropInstance.methods.price().call()

      let airdropEnd = await airdropInstance.methods.airdropEnd().call();
      let airdropStart = await airdropInstance.methods.airdropStart().call();

      const millisecondsEnd = airdropEnd * 1000

      const dateObjectEnd = new Date(millisecondsEnd)

      const millisecondsStart = airdropStart * 1000

      const dateObjectStart = new Date(millisecondsStart)

      airdropStart = dateObjectStart.toUTCString()

      airdropEnd = dateObjectEnd.toUTCString()

      let owner = await airdropInstance.methods.owner().call()
      owner = owner.toLowerCase()

      let nfts = await airdropInstance.methods.allNfts().call();

      let maxAirdrop = await airdropInstance.methods.MAX_AIRDROP_TOKENS().call();
      let maxSale = await airdropInstance.methods.MAX_SALE_TOKENS().call();

      this.setState({ web3, account, networkId, airdropInstance, ipfs, nfts, airdropEnd, airdropStart ,nftsA, nftsS, price, loading:false, maxAirdrop, maxSale, owner })

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        error,
      );
      console.error(error)

    }
  }

  render() {
    if (!this.state.loading) {
      return (
        <Router>
          <Switch>
            <div>
              <Navbar account={this.state.account} owner={this.state.owner}/>
              <Route exact path='/'>
                  <Main web3={this.state.web3} account={this.state.account} networkId={this.state.networkdId} airdropInstance={this.state.airdropInstance} ipfs={this.state.ipfs} nfts={this.state.nfts} airdropEnd={this.state.airdropEnd} airdropStart={this.state.airdropStart} nftsA={this.state.nftsA} nftsS={this.state.nftsS} price={this.state.price} maxSale={this.state.maxSale} maxAirdrop={this.state.maxAirdrop} owner={this.state.owner}/>
              </Route>
              <Route exact path='/airdrop'>
                  <Airdrop web3={this.state.web3} account={this.state.account} networkId={this.state.networkdId} airdropInstance={this.state.airdropInstance} ipfs={this.state.ipfs} nfts={this.state.nfts} airdropEnd={this.state.airdropEnd} airdropStart={this.state.airdropStart} nftsA={this.state.nftsA} nftsS={this.state.nftsS} price={this.state.price} maxSale={this.state.maxSale} maxAirdrop={this.state.maxAirdrop} owner={this.state.owner}/>
              </Route>
              <Route exact path='/mynfts'>
                  <MyNFTs web3={this.state.web3} account={this.state.account} networkId={this.state.networkdId} airdropInstance={this.state.airdropInstance} ipfs={this.state.ipfs} nfts={this.state.nfts} airdropEnd={this.state.airdropEnd} airdropStart={this.state.airdropStart} nftsA={this.state.nftsA} nftsS={this.state.nftsS} price={this.state.price} maxSale={this.state.maxSale} maxAirdrop={this.state.maxAirdrop} owner={this.state.owner}/>
              </Route>
              <Route exact path='/admin'>
                  <Admin web3={this.state.web3} account={this.state.account} networkId={this.state.networkdId} airdropInstance={this.state.airdropInstance} ipfs={this.state.ipfs} nfts={this.state.nfts} airdropEnd={this.state.airdropEnd} airdropStart={this.state.airdropStart} nftsA={this.state.nftsA} nftsS={this.state.nftsS} price={this.state.price} maxSale={this.state.maxSale} maxAirdrop={this.state.maxAirdrop} owner={this.state.owner}/>
              </Route>
            </div>
          </Switch>
        </Router>
      );      
    } else {
        return(<div class="loader"></div>);
    }

  }
}
export default App;