import React, { useEffect } from 'react'

import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { Link } from '../components/Link'
import { TextDiv } from '../components/TextDiv'
import { getCookie } from '../lib/getCookie'

import styles from '../styles/Home.module.css'

export function Home () {
  useEffect(() => {
    if (getCookie('has_refresh_token')) {
      window.location.href = '/dashboard'
    }
  }, [])

  return <Container disablePadding>
    <Container disablePadding>
      <img src='/dancingman.gif' style={{ width: 'inherit', height: 'auto' }} />
      <TextDiv>Jealous of your friends that keep track of their songs on a monthly basis via playlists but don&apos;t want to put in the effort? No worries now you can let this app take care of it.</TextDiv>
      <TextDiv>You can view your monthly progress back until the second you started your spotify account! Easily create playlists for each and every month. See how your music taste has progressed through the years by looking at your top 5 genres per month and more!</TextDiv>
      <TextDiv>This is an open source project created by Luca Bergman view the source code here: <Link href='https://github.com/spark-156/Your-Monthly-Playlist'>Github</Link></TextDiv>
    </Container>
    <Button className={styles.button} onClick={() => { window.location.href = '/api/v1/login' }}>login with spotify</Button>
  </Container>
}
