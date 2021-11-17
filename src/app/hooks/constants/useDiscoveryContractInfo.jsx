import { useWeb3React } from '@web3-react/core'
import React from 'react';
import { getDiscoveryContractInfo } from '../../config/stats'

export const useDiscoveryContractInfo = () => {
  const { chainId } = useWeb3React()
  const contract = getDiscoveryContractInfo(chainId)

  return contract
}
