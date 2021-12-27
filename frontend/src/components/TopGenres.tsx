import React, { useEffect, useState } from 'react'
import { getArtists } from '../lib/getArtists'
import { Container } from './Container'
import { Loading } from './Loading'
import { TextDiv } from './TextDiv'
import { TitleDiv } from './TitleDiv'

interface TopGenresProps extends React.HTMLAttributes<HTMLDivElement> {
  artistsIds: string[],
}

export function TopGenres ({ artistsIds }: TopGenresProps) {
  const [loading, setLoading] = useState<boolean>(true)
  const [topGenres, setTopGenres] = useState<string[]>([])

  useEffect(() => {
    async function get () {
      const uniqueArtistIds = artistsIds.filter(function (item, pos) { return artistsIds.indexOf(item) === pos })

      const uniqueArtists = await getArtists([...uniqueArtistIds])

      const genresList: string[] = []

      uniqueArtistIds.forEach(id => {
        uniqueArtists.filter(artist => artist.id === id).forEach(artist => artist.genres.forEach(genre => genresList.push(genre)))
      })

      const genres: {[key: string]: number} = {}

      for (const genre of genresList) {
        genres[genre] = genres[genre] ? genres[genre] + 1 : 1
      }

      const items: [string, number][] = Object.keys(genres).map(key => [key, genres[key]])
      setTopGenres(items.sort((first, second) => second[1] - first[1]).slice(0, 5).map(item => item[0]))

      setLoading(false)
    }
    get()
  }, [])

  if (loading) return <Loading />

  return <Container disablePadding>
    <TitleDiv fontSize='18px'>Your top genres for this month are:</TitleDiv>
    <Container disablePaddingTopAndBottom>
      {topGenres.map((genre, index) => <TextDiv key={genre} >{index + 1}.  {genre[0].toUpperCase()}{genre.slice(1)}</TextDiv>)}
    </Container>
  </Container>
}
