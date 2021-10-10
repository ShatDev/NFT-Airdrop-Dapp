import React, { Component } from 'react'

class Navbar extends Component {

  render() {
    return (
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-1 shadow">
            <a
                className="navbar-brand col-sm-3 col-md-2 mr-0"
                href="https://tsunamiavax.com/"
                target="_blank"
                rel="noopener noreferrer"
            >
            <img class="App-logo" src="https://tsunamiavax.com/assets/images/logos/logo.svg" alt="app-logo"/>
            </a>
            <div id='user-info'>
                <a href="/" class="nav-button">Sale</a>
                <a href="/airdrop" class="nav-button">Airdrop</a>
                <a href="/mynfts" class="nav-button">My Owned NFTs</a>
                {(this.props.account === this.props.owner) ? <a href="/admin" class="nav-button">Admin Dashboard</a> : console.log(this.props.account, this.props.owner)}

                <small className='text-secondary'>
                    <small id='account'>{this.props.account}</small>
                </small>
                <small className='text-secondary'>
                    <small id='account-short'>{this.props.account.substring(0, 7)}...</small>
                </small> 
            </div>
        </nav>
    );
  }
}

export default Navbar;
