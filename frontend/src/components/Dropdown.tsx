import React, { useState } from 'react'
import { Container } from './Container'
import { TitleDiv } from './TitleDiv'

import styles from '../styles/Dropdown.module.css'
import { Arrow, ArrowDirectionEnum } from './Arrow'

interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string,
}

export function Dropdown ({ title, children }: DropdownProps) {
  const [showChildren, setShowChildren] = useState<boolean>(false)
  // const artistsIds: string[] = []
  // items.forEach(item => item.track.artists.forEach(artist => artistsIds.push(artist.id)))

  // useEffect(() => {
  //   const now = DateTime.now()
  //   if (`${now.monthLong} ${now.year}` === date) {
  //     setShowItems(true)
  //   }
  // }, [])

  return <>
    <Container onClick={() => setShowChildren(prevState => !prevState)} disablePadding className={styles.dropdown} >
      <TitleDiv className={styles.date} fontSize='24px'>{title}</TitleDiv>
      {/* <Dots className={styles.dots} onClick={() => console.log('clicked')}/> */}
      <Arrow className={styles.arrowButton} direction={showChildren ? ArrowDirectionEnum.Up : ArrowDirectionEnum.Down} />
    </Container>
    {showChildren ? children : null }
    </>
}
