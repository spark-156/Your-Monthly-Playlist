import React, { useState } from 'react'
import { Container } from './Container'
import { TitleDiv } from './TitleDiv'

import styles from '../styles/Dropdown.module.css'
import { Arrow, ArrowDirectionEnum } from './Arrow'

interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string,
  defaultOpen?: boolean
}

export function Dropdown ({ title, defaultOpen = false, children }: DropdownProps) {
  const [showChildren, setShowChildren] = useState<boolean>(defaultOpen)

  return <>
    <Container onClick={() => setShowChildren(prevState => !prevState)} disablePadding className={styles.dropdown} >
      <TitleDiv className={styles.date} fontSize='24px'>{title}</TitleDiv>
      {/* <Dots className={styles.dots} onClick={() => console.log('clicked')}/> */}
      <Arrow className={styles.arrowButton} direction={showChildren ? ArrowDirectionEnum.Up : ArrowDirectionEnum.Down} />
    </Container>
    {showChildren ? children : null }
    </>
}
