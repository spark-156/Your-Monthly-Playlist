import React, { useState } from 'react'
import { Container } from './Container'
import { TitleDiv } from './TitleDiv'
import { DownOutlined, UpOutlined } from '@ant-design/icons'

import styles from '../styles/Dropdown.module.css'

interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string,
  bigTitle?: boolean,
  defaultOpen?: boolean
}

export function Dropdown ({ title, bigTitle = false, defaultOpen = false, children }: DropdownProps) {
  const [showChildren, setShowChildren] = useState<boolean>(defaultOpen)

  return <>
    <Container onClick={() => setShowChildren(prevState => !prevState)} disablePadding className={styles.dropdown} >
      <TitleDiv className={styles.date} fontSize={bigTitle ? '30px' : '22px'}>{title}</TitleDiv>
      {/* <Dots className={styles.dots} onClick={() => console.log('clicked')}/> */}
      {showChildren ? <UpOutlined style={{ fontSize: '25px' }} className={styles.arrowButton} /> : <DownOutlined style={{ fontSize: '25px' }} className={styles.arrowButton} />}
    </Container>
    {showChildren ? children : null }
    </>
}
