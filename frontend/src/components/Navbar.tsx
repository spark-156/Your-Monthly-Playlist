import React, { useState } from 'react'
import { getCookie } from '../lib/getCookie'

import styles from '../styles/Navbar.module.css'
import { Modal } from './Modal'
import { MenuOutlined } from '@ant-design/icons'
import { TitleDiv } from './TitleDiv'
import { Link } from './Link'

export function Navbar () {
  const [showModal, setShowModal] = useState<boolean>(false)

  return <div className={styles.navbar}>
    <TitleDiv fontSize='30px' className={styles.title}>Your Monthly Playlist</TitleDiv>
    <MenuOutlined style={{ fontSize: '25px' }} className={styles.icon} onClick={() => setShowModal(true)} />
    <Modal title='Menu' show={showModal} onClose={() => setShowModal(false)}>
      <Link textAlign='right' fontSize='24px' href='https://github.com/spark-156/Your-Monthly-Playlist' >Source code</Link>
      {getCookie('has_refresh_token') ? <Link textAlign='right' fontSize='24px' href={'/api/v1/logout'}>Logout</Link> : null }
    </Modal>
  </div>
}
