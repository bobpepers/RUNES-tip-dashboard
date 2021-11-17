import React, { useContext } from 'react'

import { FarmFilterContext } from '../context/farm-filter'

const useFarmFilterContext = () => useContext(FarmFilterContext)

export default useFarmFilterContext
