/*import { ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { NFT_MARKETPLACE_ABI, NFT_MARKETPLACE_ADDRESS } from '@/lib/contracts/NFTMarketplace';
import { getEthereumProvider } from '@/lib/utils/ethereum';

interface RequestAccountsResponse {
  accounts: string[];
}

export async function connectWallet() {
  if (typeof window !== 'undefined' && window.ethereum) {
    try {
      const response = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      }) as string[];

      if (response && response.length > 0) {
        return response[0];
      }
      return null;
    } catch (error) {
      console.error("User denied account access");
      return null;
    }
  }
  return null;
}

export const getNFTDetails = async (tokenId: string) => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed");
  }

  const provider = new ethers.providers.Web3Provider(
    getEthereumProvider(window.ethereum as MetaMaskInpageProvider)
  );
  
  const contract = new ethers.Contract(
    NFT_MARKETPLACE_ADDRESS,
    NFT_MARKETPLACE_ABI,
    provider
  );
  
  try {
    const tokenURI = await contract.tokenURI(tokenId);
    const owner = await contract.ownerOf(tokenId);
    
    // Fetch metadata from IPFS or other storage
    const response = await fetch(tokenURI);
    const metadata = await response.json();
    
    return {
      id: tokenId,
      owner,
      ...metadata
    };
  } catch (error) {
    console.error("Error fetching NFT details:", error);
    throw error;
  }
};

export const listNFTForSale = async (tokenId: string, price: string) => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed");
  }

  const provider = new ethers.providers.Web3Provider(
    getEthereumProvider(window.ethereum as MetaMaskInpageProvider)
  );
  
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    NFT_MARKETPLACE_ADDRESS,
    NFT_MARKETPLACE_ABI,
    signer
  );

  try {
    const priceInWei = ethers.utils.parseEther(price);
    const tx = await contract.listNFT(tokenId, priceInWei);
    return await tx.wait();
  } catch (error) {
    console.error("Error listing NFT:", error);
    throw error;
  }
}; */
