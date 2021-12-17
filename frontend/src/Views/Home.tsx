import React, { useEffect } from 'react'

import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { TextDiv } from '../components/TextDiv'
import { getCookie } from '../lib/getCookie'

export function Home () {
  useEffect(() => {
    if (getCookie('has_refresh_token')) {
      window.location.href = '/dashboard'
    }
  })
  return <Container maxWidth="100%" disablePadding>
    <Container className='align-center' disablePadding maxWidth="500px">
      <img src='/dancingman.gif' style={{ width: 'inherit', height: 'auto' }} />
      <TextDiv maxWidth="250px">see what songs you added to your evergrowing spotify collection</TextDiv>
      <TextDiv textAlign="right">find out what your favorite genres are</TextDiv>
      <TextDiv textAlign="center">all on a monthly basis</TextDiv>
    </Container>
    <Button className='align-center' onClick={() => { window.location.href = '/api/v1/login' }}>login with spotify</Button>

  </Container>
}
