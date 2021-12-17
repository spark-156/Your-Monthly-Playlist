import React from 'react'

import { Button } from './Button'
import { Container } from './Container'
import { TextDiv } from './TextDiv'
import { TitleDiv } from './TitleDiv'

export function Home () {
  return <Container maxWidth="100%">
    <Container alignSelfCenter disablePadding maxWidth="500px">
      <TitleDiv textAlign="left" fontSize="50px">your spotify monthly</TitleDiv>
    </Container>
    <Container alignSelfCenter disablePadding maxWidth="400px">
      <img src='/dancingman.gif' style={{ width: 'inherit', height: 'auto' }} />
      <TextDiv maxWidth="250px">see what songs you added to your evergrowing spotify collection</TextDiv>
      <TextDiv textAlign="right">find out what your favorite genres are</TextDiv>
      <TextDiv textAlign="center">all on a monthly basis</TextDiv>
      <Button className='align-center' onClick={() => { window.location.href = '/api/v1/login' }}>login with spotify</Button>
    </Container>
  </Container>
}
