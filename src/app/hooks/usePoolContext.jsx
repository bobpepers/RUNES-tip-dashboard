import React, { useContext } from 'react'

import { PoolContext } from '../context/pool'

export const usePoolContext = () => useContext(PoolContext)
