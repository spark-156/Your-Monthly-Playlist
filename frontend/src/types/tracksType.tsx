/* eslint-disable no-unused-vars */
export interface TrimmedItem extends Pick<Item, 'added_at'> {
  track: Pick<Track, 'href' | 'name' | 'previewURL' | 'id' | 'uri'>
}
export interface PlaylistItem {
  href: string;
  items: Item[];
  limit: number;
  next?: string | null;
  offset: number;
  previous?: string | null;
  total: number;
}

export interface Item {
  added_at: string;
  track: Track;
}

export interface Track {
  album: Album;
  artists: Artist[];
  availableMarkets: string[];
  discNumber: number;
  durationMS: number;
  explicit: boolean;
  externalIDS: ExternalIDS;
  externalUrls: ExternalUrls;
  href: string;
  id: string;
  isLocal: boolean;
  name: string;
  popularity: number;
  previewURL: string;
  trackNumber: number;
  type: TrackType;
  uri: string;
}

export interface Album {
  albumType: AlbumTypeEnum;
  artists: Artist[];
  availableMarkets: string[];
  externalUrls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  releaseDate: string;
  releaseDatePrecision: ReleaseDatePrecision;
  totalTracks: number;
  type: AlbumTypeEnum;
  uri: string;
}

export enum AlbumTypeEnum {
  Album = 'album',
  Compilation = 'compilation',
  Single = 'single',
}

export interface Artist {
  externalUrls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: ArtistType;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export enum ArtistType {
  Artist = 'artist',
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export enum ReleaseDatePrecision {
  Day = 'day',
  Year = 'year',
}

export interface ExternalIDS {
  isrc: string;
}

export enum TrackType {
  Track = 'track',
}
