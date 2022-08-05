import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import React from "react";
import { Card } from '../../components/Card'
import styled from '@emotion/styled'
import { Typography } from "@mui/material";

export default function Home(): JSX.Element {
    const { siteConfig } = useDocusaurusContext();
    return (
      <Layout
        title={`Hello from ${siteConfig.title}`}
        description="Description will go into a meta tag in <head />"
      >
        <Wrapper>
          <Title>
            <Typography variant="h2">SSS Extension DEMO</Typography>
          </Title>
          <CardWrapper>
            <Card title="TEST NET Transfer" body="SymbolテストネットでのXYMの送金デモ" link="/demo/testnet"/>
            <Card title="MAIN NET Transfer" body="SymbolメインネットでのXYMの送金デモ" link="/demo/mainnet"/>
            <Card title="Authentication" body="Symbolテストネットでのアカウント認証デモ" link="/demo/auth"/>
          </CardWrapper>
        </Wrapper>
      </Layout>
    )
}

const Wrapper = styled("div")({
  margin: "80px 20vw",
  width: '60vw'
});

const CardWrapper = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  width: '100%'
})

const Title = styled('div')({
  marginBottom: '32px',
  marginLeft: '32px',
  color: '#464646'
})