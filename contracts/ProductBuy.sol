//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract ProductBuy is Ownable {
    
    using SafeMath for uint;
    
    ERC20 public token;
    uint public taxTolerance;
    
    constructor(address _tokenAddress, uint _taxTolerance) {
        token = ERC20(_tokenAddress);
        taxTolerance = _taxTolerance;
    }
    
    enum ProductStatus{ Unsold, Sold }
    
    struct Product {
        string productName;
        string productLink;
        uint productPrice;
        uint productId;
        address productSeller;
        address productOwner;
        ProductStatus status;
    }

    struct ProductInfo {
        string productName;
        uint productPrice;
        uint productId;
        address productSeller;        
    } 

    struct BoughtProduct {
        string productName;
        uint productPrice;
        uint productId;      
        string productLink;      
    } 
    
    mapping(uint => Product) productsMapping;
    mapping(address => BoughtProduct[]) myProducts;
    ProductInfo[] products;
    
    
    function changeToken(address _newToken) public {
        token = ERC20(_newToken);
    }
    
    function listProduct(string memory _productName, string memory _productLink, uint _productPrice) public {
        Product memory newProduct = Product(_productName, _productLink, _productPrice, products.length, msg.sender, msg.sender, ProductStatus.Unsold);
        ProductInfo memory productInfo = ProductInfo(_productName, _productPrice, products.length, msg.sender);
        productsMapping[products.length] = newProduct;
        products.push(productInfo);
    }
    
    function buyProduct(uint productId) public {
        require(productsMapping[productId].status == ProductStatus.Unsold, "This product is already bought");
        Product memory product = productsMapping[productId];
        // uint tax = product.productPrice.mul(taxTolerance).div(100);
        // uint productPriceTax = product.productPrice.sub(tax);
        token.transferFrom(msg.sender, product.productSeller, product.productPrice);
        productsMapping[productId].status = ProductStatus.Sold;
        productsMapping[productId].productOwner = msg.sender;

        BoughtProduct memory boughtProduct = BoughtProduct(product.productName, product.productPrice, product.productId, product.productLink);
        myProducts[msg.sender].push(boughtProduct);
    }

    function viewProducts() public view returns(ProductInfo[] memory) {
        return products;
    }

    function setTaxTolerance(uint _newTaxTolerance) public onlyOwner {
        taxTolerance = _newTaxTolerance;
    }

    function getBoughtProducts() public view returns (BoughtProduct[] memory){
        return myProducts[msg.sender];
    }

    function getProductStatuses() public view returns(ProductStatus[] memory) {
        ProductStatus[] memory statuses = new ProductStatus[](products.length);
        for(uint i = 0; i < products.length; i++) {
            statuses[i] = productsMapping[products[i].productId].status;
        }
        return statuses;
    }
    
}