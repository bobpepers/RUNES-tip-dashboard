/* eslint-disable import/prefer-default-export */
import { useWeb3React } from '@web3-react/core';
// import React from 'react';
import { getFarmContractInfo } from '../../config/stats';

export const useFarmContractInfo = () => {
  const { chainId } = useWeb3React();
  const contract = getFarmContractInfo(chainId);

  return contract;
}
