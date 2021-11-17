import * as React from 'react';
import {
  Grid,
} from '@mui/material';

export default function SimpleCollapse() {
  const [showFaq1, setShowFaq1] = React.useState(false);
  const onClick1 = () => setShowFaq1(!showFaq1);
  const [showFaq2, setShowFaq2] = React.useState(false);
  const onClick2 = () => setShowFaq2(!showFaq2);
  const [showFaq3, setShowFaq3] = React.useState(false);
  const onClick3 = () => setShowFaq3(!showFaq3);
  const [showFaq4, setShowFaq4] = React.useState(false);
  const onClick4 = () => setShowFaq4(!showFaq4);
  const [showFaq5, setShowFaq5] = React.useState(false);
  const onClick5 = () => setShowFaq5(!showFaq5);
  const [showFaq6, setShowFaq6] = React.useState(false);
  const onClick6 = () => setShowFaq6(!showFaq6);
  const [showFaq7, setShowFaq7] = React.useState(false);
  const onClick7 = () => setShowFaq7(!showFaq7);
  const [showFaq8, setShowFaq8] = React.useState(false);
  const onClick8 = () => setShowFaq8(!showFaq8);
  const [showFaq9, setShowFaq9] = React.useState(false);
  const onClick9 = () => setShowFaq9(!showFaq9);

  return (
    <Grid
      container
      // style={{ zIndex: 5000 }}
    >
      <Grid
        container
        xs={12}
        item
        justifyContent="center"
        className="zindexOne"
      >
        <Grid
          item
          onClick={onClick1}
          xs={12}
          sm={12}
          md={8}
          lg={6}
          xl={6}
          className="faqDrawerQuestion"

        >
          <p>Q: What is Wrapped RUNES?</p>
        </Grid>
      </Grid>
      <Grid
        container
        xs={12}
        item
        justifyContent="center"
        className="zindexOne"
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={8}
          lg={6}
          xl={6}
          className="faqDrawerAnswer"
        >
          { showFaq1
            ? (
              <p>
                Wrapped RUNES is a cryptocurrency token pegged to the value of the RUNES coin. It’s called wrapped because the original asset is put in a wrapper, a kind of a digital vault that allows the wrapped version to be created on another blockchain.'
              </p>
            )
            : null}
        </Grid>
      </Grid>

      <Grid
        container
        xs={12}
        item
        justifyContent="center"
        className="zindexOne"
      >
        <Grid
          item
          onClick={onClick2}
          xs={12}
          sm={12}
          md={8}
          lg={6}
          xl={6}
          className="faqDrawerQuestion"
        >
          <p>Q: how does the bridge work?</p>
        </Grid>
      </Grid>
      <Grid
        container
        xs={12}
        item
        justifyContent="center"
        className="zindexOne"
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={8}
          lg={6}
          xl={6}
          className="faqDrawerAnswer"
        >
          { showFaq2
            ? (
              <p>
                The bridge uses a digital vault which holds RUNES coins on Runebase blockchain and issue wRUNES tokens on the binance smart chain that is pegged at a 1:1 ratio to RUNES native coin.
              </p>
            )
            : null}
        </Grid>
      </Grid>

      <Grid
        container
        xs={12}
        item
        justifyContent="center"
        className="zindexOne"
      >
        <Grid
          item
          onClick={onClick3}
          xs={12}
          sm={12}
          md={8}
          lg={6}
          xl={6}
          className="faqDrawerQuestion"
        >
          <p>Q: Who is the owner of my RUNES after wrapping?</p>
        </Grid>
      </Grid>
      <Grid
        container
        xs={12}
        item
        justifyContent="center"
        className="zindexOne"
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={8}
          lg={6}
          xl={6}
          className="faqDrawerAnswer"
        >
          { showFaq3
            ? (
              <p>
                Bridge vault is the owner of your RUNES coins. And you are the owner of Wrapped RUNES coins because coins are sent to your BSC address.
              </p>
            )
            : null}
        </Grid>
      </Grid>

      <Grid
        container
        xs={12}
        item
        justifyContent="center"
        className="zindexOne"
      >
        <Grid
          item
          onClick={onClick4}
          xs={12}
          sm={12}
          md={8}
          lg={6}
          xl={6}
          className="faqDrawerQuestion"
        >
          <p>Q: Where can i see proof of assets?</p>
        </Grid>
      </Grid>
      <Grid
        container
        xs={12}
        item
        justifyContent="center"
        className="zindexOne"
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={8}
          lg={6}
          xl={6}
          className="faqDrawerAnswer"
        >
          { showFaq4
            ? (
              <p>
                You can see reserves on Runebase explorer & BSC contract .
              </p>
            )
            : null}
        </Grid>
      </Grid>

      <Grid
        container
        xs={12}
        item
        justifyContent="center"
        className="zindexOne"
      >
        <Grid
          item
          onClick={onClick5}
          xs={12}
          sm={12}
          md={8}
          lg={6}
          xl={6}
          className="faqDrawerQuestion"
        >
          <p>Q: What can i do with my wrapped RUNES?</p>
        </Grid>
      </Grid>
      <Grid
        container
        xs={12}
        item
        justifyContent="center"
        className="zindexOne"
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={8}
          lg={6}
          xl={6}
          className="faqDrawerAnswer"
        >
          { showFaq5
            ? (
              <p>
                You can trade wRUNES on any decentralized exchange on Binance Smart Chain (e.g. Pancake Swap) or hold it on any wallet which supports BEP-20 token standard (e.g. Trust Wallet).
              </p>
            )
            : null}
        </Grid>
      </Grid>

      <Grid
        container
        xs={12}
        item
        justifyContent="center"
        className="zindexOne"
      >
        <Grid
          item
          onClick={onClick6}
          xs={12}
          sm={12}
          md={8}
          lg={6}
          xl={6}
          className="faqDrawerQuestion"
        >
          <p>Q: Can i transfer coins directly from/to exchange?</p>
        </Grid>
      </Grid>
      <Grid
        container
        xs={12}
        item
        justifyContent="center"
        className="zindexOne"
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={8}
          lg={6}
          xl={6}
          className="faqDrawerAnswer"
        >
          { showFaq6
            ? (
              <p>
                Currently, you can only wrap coins through the bridge by using any Runebase wallet and Metamask.
              </p>
            )
            : null}
        </Grid>
      </Grid>

      <Grid
        container
        xs={12}
        item
        justifyContent="center"
        className="zindexOne"
      >
        <Grid
          item
          onClick={onClick7}
          xs={12}
          sm={12}
          md={8}
          lg={6}
          xl={6}
          className="faqDrawerQuestion"
        >
          <p>Q: How to create a BSC wallet?</p>
        </Grid>
      </Grid>
      <Grid
        container
        xs={12}
        item
        justifyContent="center"
        className="zindexOne"
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={8}
          lg={6}
          xl={6}
          className="faqDrawerAnswer"
        >
          { showFaq7
            ? (
              <>
                <p>
                  Step 1: Install Metamask and create a Metamask account.
                </p>
                <p>
                  Go to MetaMask.io and select from Android or iOS for mobile application or select Chrome for desktop. You can also go directly to the Chrome store or Google Play store.
                </p>
                <p>
                  Step 2: Connect Metamask to Binance Smart Chain
                  Since Metamask was originally made for the Ethereum network. We need to make a few more steps to connect it to the Binance Smart Chain network. You can use step by step guide provided on this link (use Mainnet parameters from the guide): https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain .

                </p>
              </>
            )
            : null}
        </Grid>
      </Grid>

      <Grid
        container
        xs={12}
        item
        justifyContent="center"
        className="zindexOne"
      >
        <Grid
          item
          onClick={onClick8}
          xs={12}
          sm={12}
          md={8}
          lg={6}
          xl={6}
          className="faqDrawerQuestion"
        >
          <p>Q: Which wallet supports RUNES BEP-20?</p>
        </Grid>
      </Grid>
      <Grid
        container
        xs={12}
        item
        justifyContent="center"
        className="zindexOne"
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={8}
          lg={6}
          xl={6}
          className="faqDrawerAnswer"
        >
          { showFaq8
            ? (
              <p>
                MetaMask, TrustWallet, SafePal and any other wallet that supports BEP-20 Tokens.
              </p>
            )
            : null}
        </Grid>
      </Grid>

      <Grid
        container
        xs={12}
        item
        justifyContent="center"
        className="zindexOne"
      >
        <Grid
          item
          onClick={onClick9}
          xs={12}
          sm={12}
          md={8}
          lg={6}
          xl={6}
          className="faqDrawerQuestion"
        >
          <p>Q: why don't i see my wrapped RUNES on BSC wallet?</p>
        </Grid>
      </Grid>
      <Grid
        container
        xs={12}
        item
        justifyContent="center"
        className="zindexOne"
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={8}
          lg={6}
          xl={6}
          className="faqDrawerAnswer"
        >
          { showFaq9
            ? (
              <p>
                Make sure the wallet supports BEP-20 tokens, if yes then you can add the token address manually: 0xBeb9Aa6BDfE0964e77F9E6814b5328Bdd5fD90D7
              </p>
            )
            : null}
        </Grid>
      </Grid>

    </Grid>
  );
}
