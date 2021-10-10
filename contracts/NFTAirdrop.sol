// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NFTAirdrop is ERC721, Ownable, ERC721Enumerable, ERC721URIStorage {

  using Strings for uint256;

  Nft[] public nfts;
  mapping(uint => address) public nftOwners;
  uint public airdropEnd = 1634462024;
  uint public airdropStart = 1631014346;
  uint public nftsAirdrop;
  uint public nftsSale;
  uint public price = 1000000000000000000;
  string public baseURI = "https://tsunamiavax.com/nft/";

  uint public MAX_AIRDROP_TOKENS = 5;
  uint public MAX_SALE_TOKENS = 4995;

  struct Nft {
    uint8 purpose; // 0 for airdrop, 1 for sale
    uint claimed; // 0 not claimed, 1 claimed
    uint256 id;
    string title;
    address owner;
    uint status; // 0 for open 1 for taken
    string image;
  }


  constructor() ERC721("Tsunami", "TSM") {

  }

  function setAirdropStart(uint _newStart) public onlyOwner {
    airdropStart = _newStart;
  }

  function setAirdropEnd(uint _newEnd) public onlyOwner {
    airdropEnd = _newEnd;
  }


  function changeMaxAirdropTokens(uint _newMax) public onlyOwner {
    MAX_AIRDROP_TOKENS = _newMax;
  }

  function changeMaxSaleTokens(uint _newMax) public onlyOwner {
    MAX_SALE_TOKENS = _newMax;
  }

  function setPrice(uint _newPrice) public onlyOwner {
    price = _newPrice;
  }

  function mint(uint8 _purpose, string memory _title, string memory _image) public payable {
    if (_purpose == 0) {
      require((nftsAirdrop + 1) <= MAX_AIRDROP_TOKENS, "The maximum airdrop tokens have been minted");
    } else {
      require((nftsSale + 1) <= MAX_SALE_TOKENS, "The maximum sale tokens have been minted");
    }
    require(block.timestamp >= airdropStart, "Airdrop/Sale has not started.");
    require(block.timestamp < airdropEnd, "Airdrop/Sale has finished.");
    require(_purpose == 1 || _purpose == 0, "The purpose is not 1 or 0");
    (_purpose == 0) ? nftsAirdrop++ : nftsSale++;
    Nft memory newNft = Nft(_purpose, 0, nfts.length+1, _title, msg.sender, 0, _image);
    nfts.push(newNft);
    _safeMint(owner(), nfts.length);
    (_purpose == 0) ? _claimNft(nfts.length) : _buyNft(nfts.length);
  }

  function _claimNft(uint _tokenId) private {
    Nft memory nft = nfts[_tokenId-1];
    require(nft.status == 0, "The NFT is already claimed");
    uint8 purpose = nft.purpose;
    require(purpose == 0, "The nft is not part of the airdrop");

    // transfer ownership of art
    _transfer(owner(), msg.sender, _tokenId);
    nftOwners[_tokenId] = msg.sender;
    nfts[_tokenId-1].owner = msg.sender;
    nfts[_tokenId-1].status = 1; // NFT is sold.

  }

  function _buyNft(uint _tokenId) private {
    Nft memory nft = nfts[_tokenId-1];
    require(nft.status == 0, "The NFT is already bought.");    
    require(nft.purpose == 1, "The nft is not part of the sale.");
    //return extra payment
    address payable sender = payable(msg.sender);
    if(msg.value > price) sender.transfer(msg.value - price);
    //make a payment
    address payable own = payable(owner());
    own.transfer(price);

    nftOwners[_tokenId] = msg.sender;
    nfts[_tokenId-1].owner = msg.sender;
    nfts[_tokenId-1].status = 1; // NFT is sold

  }

  function claimNFTBought(uint _tokenId) public {
    require(msg.sender == nftOwners[_tokenId], "You have not bought this NFT.");
    require(block.timestamp >= airdropEnd, "The Airdrop/Sale has not finished yet.");
    require(nfts[_tokenId-1].claimed == 0, "The NFT is already bought.");

    //transfer ownership of art
    _transfer(owner(), msg.sender, _tokenId);
    nfts[_tokenId-1].claimed = 1; // nft is claimed
  }

  function allNfts() public view returns(Nft[] memory) {
    return nfts;
  }
  function _beforeTokenTransfer(address from, address to, uint256 tokenId)
      internal
      override(ERC721, ERC721Enumerable)
  {
      super._beforeTokenTransfer(from, to, tokenId);
  }

  function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
      super._burn(tokenId);
  }

  function setBaseURI(string memory baseURI_) public onlyOwner {
      baseURI = baseURI_;
  }

  function _baseURI() internal view override returns (string memory) {
      return baseURI;
  }

  function tokenURI(uint256 tokenId)
      public
      view
      override(ERC721, ERC721URIStorage)
      returns (string memory)
  {
    require(
      _exists(tokenId),
      "ERC721Metadata: URI query for nonexistent token"
    );

    string memory currentBaseURI = _baseURI();
    return bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), ".json"))
        : "";
  }

  function supportsInterface(bytes4 interfaceId)
      public
      view
      override(ERC721, ERC721Enumerable)
      returns (bool)
  {
      return super.supportsInterface(interfaceId);
  }

  receive () payable external {}

  fallback () external {}

}