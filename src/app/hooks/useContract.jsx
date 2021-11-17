/* eslint-disable import/prefer-default-export */
import { useWeb3React } from '@web3-react/core'

import { getContract } from '../utils/blockchain/contract'

export const useContract = ({ contract }) => {
  const { library, account } = useWeb3React();

  try {
    const instance = getContract(
      contract.address,
      library,
      contract.abi,
      account,
    );
    console.log('instance');
    console.log(instance);

    return instance
  } catch (error) {
    console.error('Could not get contract', error)
  }

  return null
}
