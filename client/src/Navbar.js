import React, { Component } from 'react'

class Navbar extends Component {

  render() {
    return (
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-1 shadow">
            <a
                className="navbar-brand col-sm-3 col-md-2 mr-0"
                href="/"
                target="_blank"
                rel="noopener noreferrer"
            >
            Product Marketplace
            </a>
            <div id='user-info'>
                <a href="/" class="nav-button">Marketplace</a>
                <a href="/list-products" class="nav-button">List A Product</a>
                <a href="/my-products" class="nav-button">My Products</a>
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
