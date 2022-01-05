import React from 'react'
// import { getCookie } from '../lib/getCookie'

import styles from '../styles/Navbar.module.css'
import { TitleDiv } from './TitleDiv'

export function Navbar () {
  return <div className={styles.navbar}>
    <TitleDiv fontSize='30px' className={styles.title}>Your Monthly Playlist</TitleDiv>
    {/* {getCookie('has_refresh_token') ? <TitleDiv fontSize='30px' className={styles.icon}>Icon</TitleDiv> : null} */}
  </div>
}
