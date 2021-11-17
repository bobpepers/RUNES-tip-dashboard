/* Author: Dalibor Kundrat  https://github.com/damikun */
import React, { useCallback, useContext, useState } from 'react'

import ToastContainer from '../components/shared/ToastContainer';
import { uuidv4 } from '../utils/random';

/**
 * Global and Helpers
 */
export const ToastContext = React.createContext(undefined)

export const useToast = () => useContext(ToastContext)
const DEFAULT_INTERVAL = 2500

/**
 * Implementation
 */
export const ToastProvider = ({ children, variant }) => {
  console.log('ToastProvider');
  console.log(children);
  console.log(variant);

  const [data, setData] = useState([])
  const Push = useCallback(
    (message, type, lifetime, truncate, title) => {
      if (message) {
        const newItem = {
          id: uuidv4(),
          message,
          type,
          lifetime: lifetime || DEFAULT_INTERVAL,
          truncate,
          title,
        }
        setData((prevState) => [...prevState, newItem])

        return newItem.id
      }
    },
    [setData, data],
  )
  const PushCustom = useCallback(
    ({ message, lifetime, truncate }, icon) => {
      if (message) {
        const newItem = {
          id: uuidv4(),
          message,
          lifetime: lifetime || DEFAULT_INTERVAL,
          truncate,
          icon,
          type: undefined,
        }
        setData((prevState) => [...prevState, newItem])
      }
    },
    [setData, data],
  )
  const PushError = useCallback(
    ({
      message, title = 'Error', lifetime, truncate,
    }) => Push(message, 'Error', lifetime, truncate, title),
    [Push],
  )
  const PushWarning = useCallback(
    ({
      message, title = 'Warning', lifetime, truncate,
    }) => Push(message, 'Warning', lifetime, truncate, title),
    [Push],
  )
  const PushSuccess = useCallback(
    ({
      message, title = 'Success', lifetime, truncate,
    }) => Push(message, 'Success', lifetime, truncate, title),
    [Push],
  )
  const PushInfo = useCallback(
    ({
      message, title = 'Info', lifetime, truncate,
    }) => Push(message, 'Info', lifetime, truncate, title),
    [Push],
  )
  const ToastContexd = useCallback(() => ({
    data,
    pushError: PushError,
    pushWarning: PushWarning,
    pushSuccess: PushSuccess,
    pushInfo: PushInfo,
    push: Push,
    pushCustom: PushCustom,
    remove: async (id) => {
      setData((prevState) => prevState.filter((e) => e.id !== id))
    },
  }), [
    data,
    setData,
    PushError,
    PushWarning,
    PushSuccess,
    PushInfo,
    Push,
    PushCustom,
  ])

  return (
    <ToastContext.Provider value={ToastContexd()}>
      <ToastContainer variant={variant} />
      {children}
    </ToastContext.Provider>
  )
}
