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
    <img src={imageSrc} alt='album cover' loading='lazy' className={styles.image} />
    <TextDiv className={styles.title}>{songTitle}</TextDiv>
    <TextDiv className={styles.artist}>{artists.map(artist => artist.name).join(', ')}</TextDiv>
  </div>
}
