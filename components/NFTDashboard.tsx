/*import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ethers } from "ethers";
import { useNotification } from "@/contexts/NotificationContext";
import { uploadToIPFS, uploadMetadataToIPFS } from "@/lib/services/ipfs";
import { NFT_MARKETPLACE_ADDRESS } from '@/lib/contracts/NFTMarketplace';
import { NFTMarketplaceContract } from "@/lib/contracts/NFTMarketplace";
import { getEthereumProvider } from '@/lib/utils/ethereum';
import { MetaMaskInpageProvider } from "@metamask/providers";

interface NFT {
  id: number;
  name: string;
  owner: string;
  image: string;
  price: string;
  tokenURI: string;
  contractAddress: string;
}

const mockNFTData: NFT[] = [
  {
    id: 1,
    name: "CryptoKitty #1",
    owner: "0x1234...abcd",
    image: "https://via.placeholder.com/150",
    price: "2.5 ETH",
    tokenURI: "ipfs://...",
    contractAddress: NFT_MARKETPLACE_ADDRESS
  },
  {
    id: 2,
    name: "CryptoPunk #2",
    owner: "0x5678...efgh",
    image: "https://via.placeholder.com/150",
    price: "8.0 ETH",
    tokenURI: "ipfs://...",
    contractAddress: NFT_MARKETPLACE_ADDRESS
  },
  {
    id: 3,
    name: "Bored Ape #3",
    owner: "0x9abc...ijkl",
    image: "https://via.placeholder.com/150",
    price: "15.0 ETH",
    tokenURI: "ipfs://...",
    contractAddress: NFT_MARKETPLACE_ADDRESS
  },
];

const NFTDashboard: React.FC = () => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [minting, setMinting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const notification = useNotification();
  const [marketplaceContract, setMarketplaceContract] = useState<NFTMarketplaceContract | null>(null);

  useEffect(() => {
    fetchNFTs();
  }, []);

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(
        getEthereumProvider(window.ethereum as MetaMaskInpageProvider)
      );
      setMarketplaceContract(new NFTMarketplaceContract(provider));
    }
  }, []);

  const fetchNFTs = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(
          getEthereumProvider(window.ethereum)
        );
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        
        // Here you would typically query your smart contract
        // This is just mock data for now
        setNfts(mockNFTData);
      }
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNFT = async (nft: NFT) => {
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed");
      }
      const provider = new ethers.providers.Web3Provider(
        getEthereumProvider(window.ethereum as MetaMaskInpageProvider)
      );
      const signer = provider.getSigner();
      
      // Create contract instance
      const contract = new ethers.Contract(
        nft.contractAddress,
        ['function buyNFT(uint256 tokenId) payable'],
        signer
      );

      // Convert price from ETH to Wei
      const price = ethers.utils.parseEther(nft.price.split(' ')[0]);
      
      // Execute purchase
      const tx = await contract.buyNFT(nft.id, { value: price });
      await tx.wait();
      
      // Refresh NFTs after purchase
      await fetchNFTs();
    } catch (error) {
      console.error("Error buying NFT:", error);
    }
  };

  const handleMintNFT = async () => {
    if (!selectedFile) {
      notification.showNotification('error', 'Error', 'Please select a file');
      return;
    }

    setMinting(true);
    try {
      // Upload image to IPFS
      const imageUrl = await uploadToIPFS(selectedFile);
      
      // Create and upload metadata
      const metadata = {
        name: "My NFT",
        description: "My awesome NFT description",
        image: imageUrl,
      };
      const metadataUrl = await uploadMetadataToIPFS(metadata);
      
      // Mint NFT
      await marketplaceContract?.mintNFT(metadataUrl);
      
      // Refresh NFTs
      await fetchNFTs();
    } catch (error) {
      console.error("Error minting NFT:", error);
      notification.showNotification(
        'error',
        'Minting Failed',
        'Failed to mint NFT. Please try again.'
      );
    } finally {
      setMinting(false);
    }
  };

  if (loading) return <div>Loading NFTs...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">NFT Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nfts.map((nft) => (
          <div key={nft.id} className="border rounded-lg p-4 shadow-lg">
            <Image 
              src={nft.image} 
              alt={nft.name} 
              width={150} 
              height={150}
              className="rounded-lg"
            />
            <h3 className="text-xl font-semibold mt-2">{nft.name}</h3>
            <p className="text-sm text-gray-600">Owner: {nft.owner}</p>
            <p className="text-lg font-bold mt-2">{nft.price}</p>
            <button
              onClick={() => handleBuyNFT(nft)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700"
            >
              Buy NFT
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NFTDashboard; */