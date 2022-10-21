import React, { useState, useEffect } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import {
  getActiveNetworkType,
  isAllowedSSS,
  requestSSS,
  getActiveAccountToken,
  getActivePublicKey
} from "sss-module";
import styled from '@emotion/styled'
import { keyframes } from "@emotion/react";
import {
  Button, Typography,
} from "@mui/material";
import { Account, add, EncryptedMessage, NetworkType, PublicAccount } from "symbol-sdk";

const verifier = Account.generateNewAccount(NetworkType.TEST_NET)

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const [step, setStep] = useState(1);
  const [authToken, setAuthToken] = useState('')
  const [token, setToken] = useState('')


  useEffect(() => {
    setTimeout(() => {
      if (!isAllowedSSS()) requestSSS();
      const net = getActiveNetworkType();
      if (net !== NetworkType.TEST_NET)
        alert("SSSのアクティブアカウントがMAIN NETです");
    }, 500);
  }, []);

  const submit = async () => {
    const at = await getActiveAccountToken(verifier.publicAccount)
    setAuthToken(at)
    setStep(2)
    
  }
  
  const verify = () => {
    const user = getActivePublicKey()
    const nt = getActiveNetworkType()
  
    const userPublicKey = PublicAccount.createFromPublicKey(user, nt)
    const msg = new EncryptedMessage(authToken, userPublicKey)
    const t = verifier.decryptMessage(msg, userPublicKey).payload
    
    setToken(t)
    setStep(3)
  }

  const getStep3 = () => {
    const t = JSON.parse(token)
    console.log(t)
    return (
      <AnimationWrapper>
        <Center>
          <Typography variant="h5">
            認証トークンの内容
          </Typography>
        </Center>

        <TextWrapper>
          <Typography variant="h6">
            Your Address
          </Typography>
          <Typography variant="h6" sx={{maxWidth: '80vw'}}>
            {t.signerAddress}
          </Typography>
        </TextWrapper>

        <TextWrapper>
          <Typography variant="h6">
            Verifier Address
          </Typography>
          <Typography variant="h6" sx={{maxWidth: '80vw'}}>
            {t.verifierAddress}
          </Typography>
        </TextWrapper>

        <TextWrapper>
          <Typography variant="h6">
            Issued At
          </Typography>
          <Typography variant="h6" sx={{maxWidth: '80vw'}}>
            {t.iat}
          </Typography>
        </TextWrapper>

        <TextWrapper>
          <Typography variant="h6">
            Network
          </Typography>
          <Typography variant="h6" sx={{maxWidth: '80vw'}}>
            {t.network === 152 ? 'TEST NET' : 'MAIN NET'}
          </Typography>
        </TextWrapper>
      </AnimationWrapper>
    )
  }


  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <Wrapper>
        {1 <= step && (
          <AnimationWrapper>
            <Center>
              <Typography variant="h5">
                認証トークンを生成する
              </Typography>
            </Center>
            <TextWrapper>
              <Typography variant="h6">
                Virifier address
              </Typography>
              <Typography variant="h6">
                {verifier.address.pretty()}
              </Typography>
            </TextWrapper>

            <TextWrapper>
              <Typography variant="h6">
                Virifier Public Key
              </Typography>
              <Typography variant="h6">
                {verifier.publicKey}
              </Typography>
            </TextWrapper>

            <TextWrapper>
              <Typography variant="h6">
                Virifier Private Key
              </Typography>
              <Typography variant="h6">
                {verifier.privateKey}
              </Typography>
            </TextWrapper>

            {1 === step && (
              <Right>
                <Button onClick={submit} variant="outlined">generate</Button>
              </Right>
            )}
          </AnimationWrapper>
          )}

          {2 <= step && (
            <AnimationWrapper>
              <Center>
                <Typography variant="h5">
                  認証トークンを検証する
                </Typography>
              </Center>

              <TextWrapper>
                <Typography variant="h6">
                  AuthToken
                </Typography>
                <Typography variant="h6" sx={{maxWidth: '80vw'}}>
                  {authToken}
                </Typography>
              </TextWrapper>

              {2 === step && (
                <Right>
                  <Button onClick={verify} variant="outlined">verify</Button>
                </Right>
              )}
            </AnimationWrapper>
          )}

          {3 <= step && (
            getStep3()
          )}
      </Wrapper>
    </Layout>
  );
}

const Wrapper = styled("div")({
  margin: "80px 10vw",
  width: "80vw",
  display: "flex",
  flexDirection: "column",
});

const TextWrapper = styled('div')({
  margin: '8px'
})

const Center = styled('div')({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
})
const Right = styled('div')({
  display: "flex",
  justifyContent: "end",
})

const feedIn = keyframes({
  '0%': {
    opacity: 0
  },
  '100%': {
    opacity: 1
  }
})

const AnimationWrapper = styled('div')({
  margin: '8px',
  animation: `${feedIn} 1s cubic-bezier(0.33, 1, 0.68, 1) 1 forwards`,
})