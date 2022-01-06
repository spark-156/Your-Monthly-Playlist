"""All environment variables"""
import os

client_id = os.environ['CLIENT_ID']
client_secret = os.environ['CLIENT_SECRET']
redirect_uri = os.environ['REDIRECT_URI']
access_scope = 'user-library-read user-read-private playlist-modify-public'

origins = [
  'http://localhost',
  'https://accounts.spotify.com',
  'https://spotify.lucabergman.nl'
]
