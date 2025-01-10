import { ethers } from "ethers";
import { useNotification } from "@/contexts/NotificationContext";

export const NFT_MARKETPLACE_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

export const NFT_MARKETPLACE_ABI = [
  // Basic ERC721 functions
  "function balanceOf(address owner) view returns (uint256)",
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function tokenURI(uint256 tokenId) view returns (string)",
  
  // Marketplace functions
  "function listNFT(uint256 tokenId, uint256 price) external",
  "function buyNFT(uint256 tokenId) external payable",
  "function cancelListing(uint256 tokenId) external",
  
  // Events
  "event NFTListed(uint256 indexed tokenId, address indexed seller, uint256 price)",
  "event NFTSold(uint256 indexed tokenId, address indexed seller, address indexed buyer, uint256 price)",
  "event ListingCanceled(uint256 indexed tokenId, address indexed seller)"
];

export class NFTMarketplaceContract {
  private contract: ethers.Contract;
  private notification: ReturnType<typeof useNotification>;

  constructor(provider: ethers.providers.Web3Provider) {
    this.contract = new ethers.Contract(
      NFT_MARKETPLACE_ADDRESS,
      NFT_MARKETPLACE_ABI,
      provider.getSigner()
    );
    this.notification = {} as ReturnType<typeof useNotification>;
  }

  setNotification(notification: ReturnType<typeof useNotification>) {
    this.notification = notification;
  }

  async mintNFT(metadata: string) {
    try {
      const tx = await this.contract.mint(metadata);
      this.notification.showNotification(
        'info',
        'Transaction Pending',
        'Minting your NFT...'
      );
      
      const receipt = await tx.wait();
      
      this.notification.showNotification(
        'success',
        'NFT Minted',
        'Your NFT has been successfully minted!'
      );
      
      return receipt;
    } catch (error: any) {
      this.notification.showNotification(
        'error',
        'Minting Failed',
        error?.message || 'Failed to mint NFT'
      );
      throw error;
    }
  }

  async listNFT(tokenId: number, price: string) {
    try {
      const priceInWei = ethers.utils.parseEther(price);
      const tx = await this.contract.listNFT(tokenId, priceInWei);
      
      this.notification.showNotification(
        'info',
        'Transaction Pending',
        'Listing your NFT...'
      );
      
      const receipt = await tx.wait();
      
      this.notification.showNotification(
        'success',
        'NFT Listed',
        'Your NFT has been listed for sale!'
      );
      
      return receipt;
    } catch (error: any) {
      this.notification.showNotification(
        'error',
        'Listing Failed',
        error?.message || 'Failed to list NFT'
      );
      throw error;
    }
  }

  async buyNFT(tokenId: number, price: string) {
    const priceInWei = ethers.utils.parseEther(price);
    const tx = await this.contract.buyNFT(tokenId, { value: priceInWei });
    return tx.wait();
  }

  async cancelListing(tokenId: number) {
    const tx = await this.contract.cancelListing(tokenId);
    return tx.wait();
  }
} 