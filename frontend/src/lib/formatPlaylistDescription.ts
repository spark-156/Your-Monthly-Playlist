export function formatPlaylistDescription (topGenres: string[]): string {
  return `Your Monthly Playlist - Your top five genres for this month are: ${topGenres.slice(0, -1).join(', ')} & ${topGenres[topGenres.length - 1]}`
}
