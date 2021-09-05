import React from "../node_modules/react";
import "./App.css";
import "./index.css";
import Main from "./Main";
import Navbar from "./Navbar";
import MyProducts from "./MyProducts";
import ListProducts from "./ListProducts";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
/**
 * @App Build Decentralized Art Market using ERC-721
 * @Util initail App build main class
 * @Book Learn Ethereum
 * @author brian wu
 */
class App extends React.Component {

  state = { account: "" }

  componentDidMount = async () => {
    try {
      // Use web3 to get the user's accounts.
      const account = await window.ethereum.request({ method: 'eth_accounts' });
      this.setState({account: account[0]})

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <div>
            <Navbar account={this.state.account}/>
            <Route exact path='/'>
                <Main />
            </Route>
            <Route exact path='/home'>
                <Main />
            </Route>
            <Route exact path='/list-products'>
                <ListProducts />
            </Route>
            <Route exact path='/my-products'>
                <MyProducts />
            </Route>
          </div>
        </Switch>
      </Router>
    );
  }
}
export default App;