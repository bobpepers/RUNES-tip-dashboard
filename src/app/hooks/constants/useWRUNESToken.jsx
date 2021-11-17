import { useWeb3React } from '@web3-react/core'
import { getWRUNESToken } from '../../config/stats'

export const useWRUNESToken = () => {
  const { chainId } = useWeb3React()
  const token = getWRUNESToken(chainId)

  return {
    token,
  }
}
