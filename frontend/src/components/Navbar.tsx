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
    {getCookie('has_refresh_token')
      ? <>
        <MenuOutlined style={{ fontSize: '25px' }} className={styles.icon} onClick={() => setShowModal(true)} />
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <Link textAlign='right' fontSize='24px' href='https://github.com/spark-156/Your-Monthly-Playlist' >Source code</Link>
          <Link textAlign='right' fontSize='24px' href={'/api/v1/logout'}>Logout</Link>
        </Modal>
      </>
      : null}
  </div>
}
