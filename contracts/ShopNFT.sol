// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract ShopNFT is ERC721Enumerable, Ownable{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    
    address public Owner = 0xc98E9c69119eb0B764B0d5DCbC1532De8bfC2D4f;
    
    string public baseURI = "ipfs://QmTnDGQ3PCTTmcMQy8LK8Q1VHzNMEScKuKeFPSWLJpgosL"; // 這一行是 NFT 該去哪裡找你的 MetaData
    bool public paused = false; // 可以拿來暫停或者開啟 Mint
    uint256 public cost = 0.000001 ether; // Mint 價格
    uint256 public maxSupply = 20; // 只有 個 NFT
    uint256 public maxMintAmount = 3; // 一次最多只能 Mint 一個
    
    constructor() ERC721("ShopNftT3", "SNT3") payable{    
	}

    function mint(uint256 _mintAmount) public payable {
        //uint256 supply = totalSupply();
        require(paused != true, "Sale must be active"); // 合約必須不是暫停
        require(_mintAmount > 0); // 每次必須挖超過 0 個
        require(_mintAmount <= maxMintAmount); // 挖的數量不可以大於每次最大挖掘數量
        //require(supply + _mintAmount <= maxSupply);
        // 挖的數量和當前發行量加起來，不可以超過最大總發行量
        require(cost * _mintAmount <= msg.value, "Ether value sent is not correct"); // Mint 的價格不可以少於我們訂定的價格

        for (uint256 i=0; i<_mintAmount; i++) { // tokenID 從 0 開始
            uint256 mintIndex = _tokenIdCounter.current() + 1;
            while(_exists(mintIndex)){
                i++;
            }
            if (mintIndex <= maxSupply) {
                _safeMint(msg.sender, mintIndex);  
                _tokenIdCounter.increment();
            } 
        }
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // 重新設定 baseURI
    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    // 取得這個持有者有多少 NFT
    function walletOfOwner(address _owner) public view returns (uint256[] memory) {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);
        for (uint256 i; i < ownerTokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokenIds;
    }

    // 查看使用者持有的 NFT MetaDate
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory currentBaseURI = baseURI;
        return bytes(currentBaseURI).length > 0 ? string(abi.encodePacked(currentBaseURI, "/", Strings.toString(tokenId), ".json")) : "";
    }

    // 查看總提供數量
    function totalSupply() public view override returns (uint256) {
        return maxSupply;
    }

    // 重新設定 Mint 價格
    function setCost(uint256 _newCost) public onlyOwner() {
        cost = _newCost;
    }
    
    // 重新設定總提供量
    function setMaxSupply(uint256 _newMaxSupply) public onlyOwner() {
        maxSupply = _newMaxSupply;
    }
    
    // 重新設定一次能 Mint 的數量
    function setmaxMintAmount(uint256 _newmaxMintAmount) public onlyOwner() {
        maxMintAmount = _newmaxMintAmount;
    }
    
    // 開關販賣開關
    function pause() public onlyOwner {
        paused = !paused;
    }

    function withdraw(address _to) payable public onlyOwner(){
        require(Owner == _to);
        payable(_to).transfer(address(this).balance);
    }
}