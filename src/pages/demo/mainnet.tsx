import React, { useState, useEffect } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import {
  getActiveNetworkType,
  isAllowedSSS,
  requestSign,
  requestSSS,
  setTransaction,
} from "sss-module";
import styled from '@emotion/styled'
import { keyframes } from "@emotion/react";
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import {
  Address,
  Deadline,
  Mosaic,
  MosaicId,
  NetworkType,
  PlainMessage,
  TransactionHttp,
  TransferTransaction,
  UInt64,
} from "symbol-sdk";
import Link from "@docusaurus/Link";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const [step, setStep] = useState(1);

  const [addr, setAddr] = useState("");
  const [amount, setAmount] = useState("0");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setTimeout(() => {
      if (!isAllowedSSS()) requestSSS();
      const net = getActiveNetworkType();
      if (net !== NetworkType.MAIN_NET)
        alert("SSSのアクティブアカウントがTEST NETです");
    }, 500);
  }, []);

  const step1 = () => {
    try {
      const a = Address.createFromRawAddress(addr);
      console.log(a);
      setStep(2);
    } catch {
      setAddr("");
    }
  };

  const step2 = () => {
    setStep(3);
  };

  const step3 = () => {
    setStep(4);
  };

  const step4 = () => {
    const tx = TransferTransaction.create(
      Deadline.create(1615853185),
      Address.createFromRawAddress(addr),
      [
        new Mosaic(
          new MosaicId("6BED913FA20223F8"),
          UInt64.fromUint(Number(amount) * Math.pow(10, 6))
        ),
      ],
      PlainMessage.create(msg),
      NetworkType.MAIN_NET,
      UInt64.fromUint(100000)
    );

    setTransaction(tx);

    requestSign().then((signedTx) => {
      new TransactionHttp("https://sym-main.opening-line.jp:3001")
        .announce(signedTx)
        .subscribe(
          (x) => {
            console.log("x", x);
            if (addr === "NAW7L44MVKCVBM6IGEBXLF2K7JYKEP6R5XMCEZA") {
              alert("Thank you for your support !");
            }
          },
          (err) => {
            console.error(err);
          }
        );
    });
  };

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <Wrapper>
        <Container>
          <Typography variant="h5">MAIN NET DEMO</Typography>
          {1 <= step && (
            <FormWrapper>
              <Typography variant="subtitle1">
                XYMを送信する相手のアドレスを入力してください
              </Typography>
              <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="address-input" sx={{ marginLeft: "16px" }}>
                  Recipient Address
                </InputLabel>
                <Input
                  id="addr"
                  type="text"
                  error={addr === ""}
                  fullWidth
                  value={addr}
                  onChange={(e) => setAddr(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      step1();
                    }
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="add icon button"
                        onClick={step1}
                        onMouseDown={step1}
                      >
                        <CheckIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </FormWrapper>
          )}

          {2 <= step && (
            <FormWrapper>
              <Typography variant="subtitle1">
                XYMを送信する量を入力してください
              </Typography>
              <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="amount-input" sx={{ marginLeft: "16px" }}>
                  Amount
                </InputLabel>
                <Input
                  id="amount"
                  type="number"
                  fullWidth
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      step2();
                    }
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="add icon button"
                        onClick={step2}
                        onMouseDown={step2}
                      >
                        <CheckIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </FormWrapper>
          )}

          {3 <= step && (
            <FormWrapper>
              <Typography variant="subtitle1">
                送信するメッセージを入力してください
              </Typography>
              <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="message-input" sx={{ marginLeft: "16px" }}>
                  Message
                </InputLabel>
                <Input
                  id="msg"
                  type="text"
                  fullWidth
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      step3();
                    }
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="add icon button"
                        onClick={step3}
                        onMouseDown={step3}
                      >
                        <CheckIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </FormWrapper>
          )}

          {4 <= step && (
            <BtnWrapper>
              <Button variant="outlined" onClick={step4}>
                SSSで署名
              </Button>
            </BtnWrapper>
          )}
        </Container>
        <LinkWrapper>
          <Button
            variant="outlined"
            onClick={() => {
              setAddr("NAW7L44MVKCVBM6IGEBXLF2K7JYKEP6R5XMCEZA");
              setStep(2);
            }}
          >
            開発者を支援
          </Button>
        </LinkWrapper>
      </Wrapper>
    </Layout>
  );
}

const Wrapper = styled("div")({
  margin: "80px 10vw",
});

const Container = styled("div")({
  width: "80vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

const feedIn = keyframes({
  '0%': {
    opacity: 0
  },
  '100%': {
    opacity: 1
  }
})

const FormWrapper = styled("div")({
  margin: "40px",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  animation: `${feedIn} 1s cubic-bezier(0.33, 1, 0.68, 1) 1 forwards`,

});

const BtnWrapper = styled("div")({
  margin: "40px",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
  flexDirection: "column",
  animation: `${feedIn} 1s cubic-bezier(0.33, 1, 0.68, 1) 1 forwards`,
});


const LinkWrapper = styled("div")({
  position: "absolute",
  bottom: "300px",
  right: "50px",
});

const SLink = styled(Link)({
  fontSize: "18px",
});
