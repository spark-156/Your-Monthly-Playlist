/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { getArtists } from '../lib/getArtists'
import { ArtistExpansive, GetArtists } from '../types/artistsType'
import { Artist } from '../types/tracksType'
import { Container } from './Container'
import { Loading } from './Loading'
import { TitleDiv } from './TitleDiv'

interface TopGenresProps extends React.HTMLAttributes<HTMLDivElement> {
  artistsIds: string[],
}

export function TopGenres ({ artistsIds }: TopGenresProps) {
  const [artists, setArtists] = useState<ArtistExpansive[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  function addArtists (artists: ArtistExpansive[]) {
    setArtists(prevState => [...prevState, ...artists])
  }

  useEffect(() => {
    async function get () {
      const uniqueArtistIds = artistsIds.filter(function (item, pos) { return artistsIds.indexOf(item) === pos })

      const uniqueArtists = await getArtists([...uniqueArtistIds], addArtists)

      console.log({ uniqueArtistIds, uniqueArtists, artistsIds })

      const genresList: string[] = []

      uniqueArtistIds.forEach(id => {
        uniqueArtists.filter(artist => artist.id === id).forEach(artist => artist.genres.forEach(genre => genresList.push(genre)))
      })

      const genres: {[key: string]: number} = {}

      for (const genre of genresList) {
        genres[genre] = genres[genre] ? genres[genre] + 1 : 1
      }

      console.log(genres)

      setLoading(false)
    }
    get()
  }, [])

  if (loading) return <Loading />

  return <Container disablePadding>
    <TitleDiv fontSize='16px'>Your top genres for this month are:</TitleDiv>

  </Container>
}
