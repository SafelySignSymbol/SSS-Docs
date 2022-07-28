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
import { styled } from "@mui/system";
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
      if (net !== NetworkType.TEST_NET)
        alert("SSSのアクティブアカウントがMAIN NETです");
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
      Deadline.create(1637848847),
      Address.createFromRawAddress(addr),
      [
        new Mosaic(
          new MosaicId("3A8416DB2D53B6C8"),
          UInt64.fromUint(Number(amount) * Math.pow(10, 6))
        ),
      ],
      PlainMessage.create(msg),
      NetworkType.TEST_NET,
      UInt64.fromUint(2000000)
    );

    setTransaction(tx);

    requestSign().then((signedTx) => {
      new TransactionHttp("https://sym-test.opening-line.jp:3001")
        .announce(signedTx)
        .subscribe(
          (x) => {
            console.log("x", x);
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
          <Typography variant="h5">TEST NET DEMO</Typography>
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

const FormWrapper = styled("div")({
  margin: "40px",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});
const BtnWrapper = styled("div")({
  margin: "40px",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
  flexDirection: "column",
});
