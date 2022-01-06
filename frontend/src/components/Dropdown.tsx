import React, { useState } from 'react'
import { Container } from './Container'
import { TitleDiv } from './TitleDiv'
import { DownOutlined, UpOutlined, EllipsisOutlined } from '@ant-design/icons'

import styles from '../styles/Dropdown.module.css'
import { Item } from '../types/getPlaylistIDTracks'
import { Modal } from './Modal'
import { TextDiv } from './TextDiv'
import { createPlaylist } from '../lib/createPlaylist'

interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string,
  modalTitle?: string,
  bigTitle?: boolean,
  defaultOpen?: boolean,
  monthPlaylists?: {
    [playlist: string]: Item[]
  }
}

export function Dropdown ({ modalTitle, monthPlaylists, title, bigTitle = false, defaultOpen = false, children }: DropdownProps) {
  const [showChildren, setShowChildren] = useState<boolean>(defaultOpen)
  const [showModal, setShowModal] = useState<boolean>(false)

  return <>
    <Container onClick={() => setShowChildren(prevState => !prevState)} disablePadding className={styles.dropdown} >
      <TitleDiv className={styles.date} fontSize={bigTitle ? '30px' : '22px'}>{title}</TitleDiv>
      {monthPlaylists ? <EllipsisOutlined style={{ fontSize: '25px' }} className={styles.dots} onClick={(e) => { e.stopPropagation(); setShowModal(true) }} /> : null}
      {showChildren ? <UpOutlined style={{ fontSize: '25px' }} className={styles.arrowButton} /> : <DownOutlined style={{ fontSize: '25px' }} className={styles.arrowButton} />}
    </Container>
    {showChildren ? children : null }
    <Modal title={modalTitle} show={showModal} onClose={() => setShowModal(false)}>
      {modalTitle && monthPlaylists ? <TextDiv fontSize='24px' clickable onClick={() => createPlaylist(modalTitle, monthPlaylists)}>Create playlist</TextDiv> : null}
    </Modal>
    </>
}
