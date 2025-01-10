import { ExternalProvider } from '@ethersproject/providers';
import { MetaMaskInpageProvider } from '@metamask/providers';

export function getEthereumProvider(ethereum: MetaMaskInpageProvider): ExternalProvider {
  return ethereum as unknown as ExternalProvider;
} 