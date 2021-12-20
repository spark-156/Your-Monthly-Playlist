import React from 'react'
import { TextDiv } from './TextDiv'

import styles from '../styles/Song.module.css'
import classNames from 'classnames'
import { Artist } from '../types/tracksType'

interface SongProps extends React.HTMLAttributes<HTMLDivElement> {
  imageSrc: string,
  songTitle: string,
  artists: Artist[],
}

export function Song ({ imageSrc, songTitle, artists, className, ...props }: SongProps) {
  return <div className={classNames(styles.container, className)} {...props}>
    <img src={imageSrc} alt='' className={styles.image} />
    <TextDiv className={styles.title}>{songTitle}</TextDiv>
    <div className={styles.artists}>
      {artists.map(artist => <TextDiv className={styles.artist} key={artist.name}>{artist.name}</TextDiv>)}
    </div>
  </div>
}
