import { useContext } from 'react'

import { GlobalContext } from '../context/global'

const useGlobalContext = () => useContext(GlobalContext);

export default useGlobalContext;
