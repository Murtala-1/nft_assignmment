import { Network, Alchemy } from "alchemy-sdk";

const settings = {
  apiKey: "MXCfBurLAvagnaETwHcSGhpCrSQ1bjEf",
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

// get all NFTs owned by the provided address or ENS domain
export const _getNfts = async (owned) => {
  return alchemy.nft.getNftsForOwner(owned);
};
