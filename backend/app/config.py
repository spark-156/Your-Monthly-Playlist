"""All environment variables"""
import os

client_id = os.environ['CLIENT_ID']
client_secret = os.environ['CLIENT_SECRET']
redirect_uri = os.environ['REDIRECT_URI']
access_scope = 'user-library-read playlist-read-private user-read-private'

origins = [
  'http://localhost',
  'https://accounts.spotify.com',
  'https://spotify.lucabergman.nl'
]
