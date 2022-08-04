import Link from "@docusaurus/Link"
import styled from "@emotion/styled"
import { Typography } from "@mui/material"
import React from "react"

export const Card : React.FC<{
  title: string,
  body: string,
  link: string
}> = ({title, body, link}) => {
  return (
    <Root to={link}>
      <Title>
        <Typography variant="h6">{title}</Typography>
      </Title>
      <Body>
        <Typography variant="subtitle2">{body}</Typography>
      </Body>
    </Root>
  )
}


const Root = styled(Link)({
  textDecoration: 'none',
  color: '#464646',
  boxShadow: '0 1.5px 3px 0 rgb(0 0 0 / 15%)',
  borderRadius: '0.8rem',
  width: 'calc(30vw - 32px)',
  border: '1px solid var(--ifm-color-emphasis-200)',
  minHeight: '100px',
  margin: '16px',
  cursor: 'pointer',
  ':hover' : {
    borderColor: 'var(--ifm-color-primary)',
    boxShadow: '0 3px 6px 0 rgb(0 0 0 / 20%)',
    color: '#464646',
    textDecoration: 'none',
  }
})

const Title = styled('div')({
  marginTop: '32px',
  marginLeft: '32px',
  fontWeight: 'bold'
})

const Body = styled('div')({
  marginTop: '16px',
  marginLeft: '32px',
  marginBottom: '32px',
})
