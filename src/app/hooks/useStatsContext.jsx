/* eslint-disable import/prefer-default-export */
import React, { useContext } from 'react'

import { StatsContext } from '../context/stats'

const useStatsContext = () => useContext(StatsContext);

export default useStatsContext;
