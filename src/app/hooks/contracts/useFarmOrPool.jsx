/* eslint-disable import/prefer-default-export */
import { useFarm } from './useFarm'
// import { usePool } from './usePool'

export const useFarmOrPool = ({ contract } = {}) => {
  const farmInstance = useFarm({ contract })
  // const poolInstance = usePool({ contract })

  const withdrawRewards = ({ type, token }) => {
    if (type === 'Pool') {
      console.log('pool');
      // return poolInstance.withdrawRewards({ token })
    }

    if (type === 'Farm') {
      console.log('farm');
      return farmInstance.withdrawRewards({ token })
    }
    console.log('Incorrect object type')
  }

  const deposit = async ({ type, token, amount }) => {
    if (type === 'Pool') {
      console.log('pool');
      // return poolInstance.deposit({ token, amount })
    }

    if (type === 'Farm') {
      console.log('farm');
      console.log(token);
      console.log(amount);
      console.log('execute deposit here');

      return farmInstance.deposit({ token, amount })
    }
    console.log('Incorrect object type');
  }

  const withdraw = async ({ type, token, amount }) => {
    if (type === 'Pool') {
      console.log('pool');
      // return poolInstance.withdraw({ token, amount });
    }

    if (type === 'Farm') {
      console.log('farm');
      return farmInstance.withdraw({ token, amount });
    }
    console.log('Incorrect object type')
  }

  return {
    withdrawRewards,
    deposit,
    withdraw,
  }
}
