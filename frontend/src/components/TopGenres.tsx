import React from 'react'
import { Container } from './Container'
import { Loading } from './Loading'
import { TextDiv } from './TextDiv'
import { TitleDiv } from './TitleDiv'

interface TopGenresProps extends React.HTMLAttributes<HTMLDivElement> {
  topGenres: string[],
  loading: boolean
}

export function TopGenres ({ topGenres, loading }: TopGenresProps) {
  if (loading) return <Loading />

  return <Container disablePadding halfGap>
    <TitleDiv fontSize='18px'>Your top genres for this month are:</TitleDiv>
    <Container disablePaddingTopAndBottom halfGap>
      {topGenres.map((genre, index) => <TextDiv key={genre} >{index + 1}.  {genre[0].toUpperCase()}{genre.slice(1)}</TextDiv>)}
    </Container>
  </Container>
}
