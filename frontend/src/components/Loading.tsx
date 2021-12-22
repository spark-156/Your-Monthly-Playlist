import React from 'react'

import { Container } from './Container'

import styles from '../styles/Loading.module.css'

export function Loading () {
  return <Container>
    <img className={styles.spinner} src="/loading-spinner.gif" alt="loading" height="50px" width="50px" />
  </Container>
}
