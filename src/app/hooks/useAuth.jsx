import React, { useCallback } from 'react';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { NoBscProviderError } from '@binance-chain/bsc-connector';
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector';

import { useDispatch } from 'react-redux';
import { ConnectorNames } from '../config/connectors';
import { getConnectorByName } from '../utils/blockchain/connectors';
import { setupNetwork } from '../utils/wallet';
import { ACTIVE_CHAIN_KEY, ACTIVE_CONNECTOR_KEY } from '../config/constants';
// import { useToast } from '../context/toast';
import { wallets } from '../config/wallets';
import { networks } from '../config/networks';
import {
  ENQUEUE_SNACKBAR,
  ACTIVATE_WALLET_SUCCESS,
  ACTIVATE_WALLET_FAIL,
  ACTIVATE_WALLET_BEGIN,
} from '../actions/types/index';

// const ERROR_TIMEOUT = 30000 // 30 seconds

const useAuth = () => {
  const { activate, deactivate, chainId } = useWeb3React();
  // const toast = useToast();
  const dispatch = useDispatch();

  const login = useCallback(
    (connectorName, networkId) => {
      dispatch({
        type: ACTIVATE_WALLET_BEGIN,
      });
      const connector = getConnectorByName(connectorName, networkId);

      if (connector) {
        window.localStorage.setItem(ACTIVE_CONNECTOR_KEY, connectorName);
        window.localStorage.setItem(ACTIVE_CHAIN_KEY, networkId);

        activate(connector, async (error) => {
          if (error instanceof UnsupportedChainIdError) {
            const hasSetup = await setupNetwork(networkId, connectorName);

            if (hasSetup) {
              activate(connector, () => {
                window.localStorage.removeItem(ACTIVE_CONNECTOR_KEY);
                window.localStorage.removeItem(ACTIVE_CHAIN_KEY);
              });
              dispatch({
                type: ACTIVATE_WALLET_SUCCESS,
              });
              return
            }

            window.localStorage.removeItem(ACTIVE_CONNECTOR_KEY);
            window.localStorage.removeItem(ACTIVE_CHAIN_KEY);

            const wallet = wallets.find(
              (x) => x.connectorName === connectorName,
            )
            const network = networks.find((x) => x.id === networkId)

            dispatch({
              type: ENQUEUE_SNACKBAR,
              notification: {
                message: `Wrong network: Please switch to ${network.name} in your ${wallet.name} wallet`,
                key: new Date().getTime() + Math.random(),
                options: {
                  variant: 'error',
                },
              },
            });
            dispatch({
              type: ACTIVATE_WALLET_FAIL,
            });
          } else {
            window.localStorage.removeItem(ACTIVE_CONNECTOR_KEY);
            window.localStorage.removeItem(ACTIVE_CHAIN_KEY);

            if (
              error instanceof NoEthereumProviderError
              || error instanceof NoBscProviderError
            ) {
              dispatch({
                type: ENQUEUE_SNACKBAR,
                notification: {
                  message: 'Provider Error: Could not connect. No provider found',
                  key: new Date().getTime() + Math.random(),
                  options: {
                    variant: 'error',
                  },
                },
              });
              return
            }

            if (
              error instanceof UserRejectedRequestErrorInjected
              || error instanceof UserRejectedRequestErrorWalletConnect
            ) {
              if (connector instanceof WalletConnectConnector) {
                const walletConnector = connector
                walletConnector.walletConnectProvider = null
              }
              dispatch({
                type: ENQUEUE_SNACKBAR,
                notification: {
                  message: 'Authorization Error: Please authorize to access your account',
                  key: new Date().getTime() + Math.random(),
                  options: {
                    variant: 'error',
                  },
                },
              });
              return
            }

            console.log(error.name, error.message);
          }
        })
      } else {
        console.error(
          'Unable to find connector: Could not identify from local storage',
        );
      }
    },
    [activate],
  )

  const logout = useCallback(() => {
    deactivate();
    window.localStorage.removeItem(ACTIVE_CONNECTOR_KEY);
    window.localStorage.removeItem(ACTIVE_CHAIN_KEY);

    // This localStorage key is set by @web3-react/walletconnect-connector
    if (window.localStorage.getItem('walletconnect')) {
      const connector = getConnectorByName(
        ConnectorNames.WalletConnect,
        chainId,
      )
      connector.close()
      connector.walletConnectProvider = null
    }
  }, [deactivate, chainId])

  return { logout, login }
}

export default useAuth
