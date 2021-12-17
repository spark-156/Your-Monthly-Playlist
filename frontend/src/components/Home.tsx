import React from 'react'

import { Button } from './Button'
import { Container } from './Container'
import { TextDiv } from './TextDiv'
import { TitleDiv } from './TitleDiv'

export function Home () {
  return <Container maxWidth="100%">
    <Container alignSelfCenter maxWidth="500px">
      <TitleDiv textAlign="left" fontSize="50px">your</TitleDiv>
      <TitleDiv textAlign="center" fontSize="50px">spotify</TitleDiv>
      <TitleDiv textAlign="right" fontSize="50px">monthly</TitleDiv>
    </Container>
    <Container alignSelfCenter maxWidth="400px">
      <TextDiv maxWidth="250px">see what songs you added to your evergrowing spotify collection</TextDiv>
      <br />
      <br />
      <br />
      <TextDiv textAlign="right">find out what your favorite genres are</TextDiv>
      <br />
      <br />
      <br />
      <TextDiv textAlign="center">all on a monthly basis</TextDiv>
    </Container>
    <Button>login with spotify</Button>
  </Container>
}
