import React, { useState } from 'react'
import { Item } from '../types/tracksType'
import { Button } from './Button'
import { Container } from './Container'
import { TitleDiv } from './TitleDiv'
import { Song } from './Song'

import styles from '../styles/Dropdown.module.css'

interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  date: string,
  items: Item[]
}

export function Dropdown ({ date, items }: DropdownProps) {
  const [showItems, setShowItems] = useState<boolean>(false)

  return <>
    <Container disablePadding className={styles.dropdown} >
      <TitleDiv className={styles.date} fontSize='24px'>{date}</TitleDiv>
      <Button className={styles.arrowButton} onClick={() => setShowItems(prevState => !prevState)}>Show items</Button>
    </Container>
    {showItems
      ? items.map(item => <Song
      className={styles.content}
      key={item.track.name}
      imageSrc={'https://www.seo-snel.nl/duckduckgo/duckduckgo.png'}
      songTitle={item.track.name}
      artists={item.track.artists} />)
      : null}
  </>
}
