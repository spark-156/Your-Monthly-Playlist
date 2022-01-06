import React, { useState } from 'react'
import { Container } from './Container'
import { TitleDiv } from './TitleDiv'
import { DownOutlined, UpOutlined, EllipsisOutlined } from '@ant-design/icons'

import styles from '../styles/Dropdown.module.css'
import { Item } from '../types/getPlaylistIDTracks'

interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string,
  bigTitle?: boolean,
  defaultOpen?: boolean,
  monthPlaylists?: {
    [playlist: string]: Item[]
  }
}

export function Dropdown ({ monthPlaylists, title, bigTitle = false, defaultOpen = false, children }: DropdownProps) {
  const [showChildren, setShowChildren] = useState<boolean>(defaultOpen)

  return <>
    <Container onClick={() => setShowChildren(prevState => !prevState)} disablePadding className={styles.dropdown} >
      <TitleDiv className={styles.date} fontSize={bigTitle ? '30px' : '22px'}>{title}</TitleDiv>
      {monthPlaylists ? <EllipsisOutlined style={{ fontSize: '25px' }} className={styles.dots} onClick={(e) => { e.stopPropagation(); console.log(monthPlaylists) }} /> : null}
      {showChildren ? <UpOutlined style={{ fontSize: '25px' }} className={styles.arrowButton} /> : <DownOutlined style={{ fontSize: '25px' }} className={styles.arrowButton} />}
    </Container>
    {showChildren ? children : null }
    </>
}
