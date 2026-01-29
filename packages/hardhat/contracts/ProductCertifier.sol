// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ProductCertifier is ERC721 {
    uint256 private _tokenIds;

    struct Product {
        string name;
        string manufacturer;
        uint256 year;
        string model;
        string serial;
        bool hasNFT;
    }

    // Mapping de dueño -> lista de sus productos
    mapping(address => Product[]) public userProducts;
    
    event ProductRegistered(address indexed owner, string serial);
    event NFTMinted(address indexed owner, uint256 tokenId, string serial);

    constructor() ERC721("Certificado de Producto", "CPROD") {}

    function registerProduct(
        string memory _name,
        string memory _manufacturer,
        uint256 _year,
        string memory _model,
        string memory _serial
    ) public {
        userProducts[msg.sender].push(Product({
            name: _name,
            manufacturer: _manufacturer,
            year: _year,
            model: _model,
            serial: _serial,
            hasNFT: false
        }));
        emit ProductRegistered(msg.sender, _serial);
    }

    function mintCertification(uint256 productIndex, uint256 score) public {
        require(productIndex < userProducts[msg.sender].length, "Producto no existe");
        require(!userProducts[msg.sender][productIndex].hasNFT, "Ya tiene NFT");
        require(score >= 60, "Puntaje insuficiente para certificar");

        _tokenIds++;
        uint256 newItemId = _tokenIds;
        _mint(msg.sender, newItemId);
        
        userProducts[msg.sender][productIndex].hasNFT = true;
        
        emit NFTMinted(msg.sender, newItemId, userProducts[msg.sender][productIndex].serial);
    }

    function getUserProducts(address user) public view returns (Product[] memory) {
        return userProducts[user];
    }
}
