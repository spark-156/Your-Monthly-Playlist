import React, { useState } from 'react'
import { getCookie } from '../lib/getCookie'

import styles from '../styles/Navbar.module.css'
import { Modal } from './Modal'
import { TextDiv } from './TextDiv'
import { TitleDiv } from './TitleDiv'

export function Navbar () {
  const [showModal, setShowModal] = useState<boolean>(false)

  return <div className={styles.navbar}>
    <TitleDiv fontSize='30px' className={styles.title}>Your Monthly Playlist</TitleDiv>
    {getCookie('has_refresh_token')
      ? <>
        <div onClick={() => setShowModal(true)}>modal</div>
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <TextDiv onClick={() => { window.location.href = '/api/v1/logout' }}>Logout</TextDiv>
        </Modal>
      </>
      : null}
  </div>
}
