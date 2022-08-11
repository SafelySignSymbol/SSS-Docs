import React, { useState, useEffect, ReactNode } from "react";
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
  Button, Divider, Modal, Paper, Typography,
} from "@mui/material";
import { Account, add, EncryptedMessage, NetworkType, PublicAccount } from "symbol-sdk";

const verifier = Account.generateNewAccount(NetworkType.TEST_NET)

type Contents = {
  title: string
  body: string[]
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const [step, setStep] = useState(1);
  const [authToken, setAuthToken] = useState('')
  const [token, setToken] = useState('')
  // const [open, setOpen] = useState(false)

  const [modalContents, setModalContents] = useState<Contents | null>(null)


  useEffect(() => {
    setTimeout(() => {
      if (!isAllowedSSS()) requestSSS();
      const net = getActiveNetworkType();
      if (net !== NetworkType.TEST_NET)
        alert("SSSのアクティブアカウントがMAIN NETです");
    }, 500);
  }, []);

  
  const verify = () => {
    const user = getActivePublicKey()
    const nt = getActiveNetworkType()
  
    const userPublicKey = PublicAccount.createFromPublicKey(user, nt)
    const msg = new EncryptedMessage(authToken, userPublicKey)
    const t = verifier.decryptMessage(msg, userPublicKey).payload
    
    setToken(t)
    setStep(3)
  }

  const next = () => {
    setStep(prev => prev+1)
  }

  const requestToken = async () => {
    const at = await getActiveAccountToken(verifier.publicAccount)
    setAuthToken(at)

    const contents: Contents = {
      title: '認証トークン',
      body: [at]
    }

    setModalContents(contents)

  }

  const settingVerifier = () => {
    const contents: Contents = {
      title: '検証者アカウント',
      body: [`アドレス : ${verifier.address.pretty()}`, `公開鍵 : ${verifier.publicKey}`]
    }
    setModalContents(contents)
  }

  const verifyToken = () => {
    const user = getActivePublicKey()
    const nt = getActiveNetworkType()
  
    const userPublicKey = PublicAccount.createFromPublicKey(user, nt)
    const msg = new EncryptedMessage(authToken, userPublicKey)
    const t = verifier.decryptMessage(msg, userPublicKey).payload
    console.log(t)
    const json = JSON.parse(t)

    
    setToken(t)

    const contents: Contents = {
      title: 'トークン',
      body: [
        `署名者アドレス : ${json.signerAddress}`, 
        `検証者アドレス : ${json.verifierAddress}`,
        `発行日時 : ${new Date(json.iat)}`,
        `ネットワーク : ${json.netWork === 152 ? 'TEST NET' : 'MAIN NET'}`
      ]
    }
    setModalContents(contents)    
  }

  const modalClose = () => {
    setModalContents(null)
    next()
  }



  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <Wrapper>
        <Base color="#E8F9FD">
          <Typography variant="h5">Client</Typography>
          {2 <= step && (
            <RequestToken handler={requestToken}/>
          )}
        </Base>

        <Base color="#FFFFDE">
          <Typography variant="h5">Server</Typography>
          {
            1 <= step && (
              <SettingVerifier handler={settingVerifier}/>
            )
          }
          {
            3 <= step && (
              <VerifyToken handler={verifyToken}/>
            )
          }
        </Base>
      </Wrapper>
      <Modal open={!!modalContents} onClose={modalClose}>
        {!!modalContents ? (
        <ModalWrapper>
          <Typography variant="h5">{modalContents.title}</Typography>
          <Divider />
          {
            modalContents.body.map((txt, i) => {
              return (
                <Typography variant="h6" key={i} sx={{maxWidth: '100%'}}>{txt}</Typography>
              )
            })
          }
        </ModalWrapper>
        ) : (
          <></>
        )}
      </Modal>
    </Layout>
  );
}

const SettingVerifier = (p: {handler: () => void}) => {
  return (
    <Space>
      <StepArea>
        <Typography variant="h6">Step 1</Typography>
        <Typography variant="subtitle2">トークンの検証者を設定</Typography>
        <Typography variant="subtitle2">Verifier PublicKey : {verifier.publicKey}</Typography>
        <Typography variant="subtitle2">Verifier Address : {verifier.address.pretty()}</Typography>
        <Right>
          <Button onClick={p.handler} variant="outlined">Next</Button>
        </Right>
      </StepArea>
    </Space>
  )
}

const RequestToken = (p: {handler: () => void}) => {
  return (
    <Space>
      <StepArea>
        <Typography variant="h6">Step 2</Typography>
        <Typography variant="subtitle2">認証トークンへの署名をユーザーに要求</Typography>
        <Right>
          <Button onClick={p.handler} variant="outlined">Generate</Button>
        </Right>
      </StepArea>
    </Space>
  )
}

const VerifyToken = (p: {handler: () => void}) => {
  return (
    <Space>
      <StepArea>
        <Typography variant="h6">Step 3</Typography>
        <Typography variant="subtitle2">認証トークンを検証</Typography>
        <Typography variant="subtitle2"></Typography>
        <Right>
          <Button onClick={p.handler} variant="outlined">Verify</Button>
        </Right>
      </StepArea>
    </Space>
  )
}

const Wrapper = styled("div")({
  display: "flex",
  justifyContent: 'space-around',
  alignItems: 'center',
  margin: '40px 0px'
});

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


const Base = styled('div')((p: {color: string}) => ({
  width: '45vw',
  minHeight: '80vh',
  padding: '16px',
  borderRadius: '16px',
  background: p.color
}))

const StepArea = styled('div')({
  background: 'white',
  borderRadius: '4px',
  padding: '8px',
  animation: `${feedIn} 1s cubic-bezier(0.33, 1, 0.68, 1) 1 forwards`,
})

const Space = styled('div')({
  margin: '8px'
})

const ModalWrapper = styled(Paper)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '50vw',
  transform: 'translate(-50%, -50%)',
  padding: '16px',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})