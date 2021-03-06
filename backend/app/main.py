"""api for spotify auto monthly playlist"""
from typing import Optional
import base64
from random import choice
from string import ascii_uppercase
from urllib.parse import urlencode, quote_plus

from fastapi import FastAPI, Response, Cookie, status
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
import requests

from . import config

app = FastAPI(root_path="/api/v1")

app.add_middleware(
    CORSMiddleware,
    allow_origins=config.origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/login", response_class=RedirectResponse)
def login(response: Response):
    """redirect user to login screen from spotify and set state to persist in browser cookie"""
    state = ''.join(choice(ascii_uppercase) for i in range(16))
    response.set_cookie(key='state_cookie', value=state, httponly=True, secure=True)
    return 'https://accounts.spotify.com/authorize?' + urlencode({
        'response_type': 'code',
        'client_id': config.client_id,
        'scope': config.access_scope,
        'redirect_uri': config.redirect_uri,
        'state': state,
        'show_dialog': True,
    }, quote_via=quote_plus)

@app.get("/callback", response_class=RedirectResponse)
def auth_callback(
        response: Response,
        state: str,
        state_cookie: Optional[str] = Cookie(None),
        code: Optional[str] = None,
        error: Optional[str] = None
    ):
    """check state for tampering and get access and refresh tokens if all is okay"""
    if state != state_cookie:
        # request has been tampered with
        return "States do not match up, your request may have been tempered with."
    else:
        response.delete_cookie('state_cookie')

    if error:
        return error

    if code:
        message = config.client_id + ':' + config.client_secret
        request_response = requests.post('https://accounts.spotify.com/api/token', data={
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': config.redirect_uri
        }, headers={
            'Authorization': 'Basic ' + base64.b64encode(message.encode('ascii')).decode('ascii'),
            'Content-Type': 'application/x-www-form-urlencoded'
        })
        data = request_response.json()

        if 'access_token' in data and 'refresh_token' in data:
            response.set_cookie(
                key='access_token',
                value=data['access_token'],
                max_age=data['expires_in'],
                secure=True,
                samesite="Strict"
            )
            response.set_cookie(
                key='has_refresh_token',
                value=1,
                max_age=2147483647,
                secure=True,
                samesite="Strict"
            )
            response.set_cookie(
                key='refresh_token',
                value=data['refresh_token'],
                max_age=2147483647,
                httponly=True,
                secure=True,
                samesite="Strict"
            )
            return '/dashboard'
        else:
            return '/error'

@app.get('/refresh', response_class=RedirectResponse)
def auth_refresh(response: Response, refresh_token: Optional[str] = Cookie(None)):
    if refresh_token:
        message = config.client_id + ':' + config.client_secret
        request_response = requests.post('https://accounts.spotify.com/api/token', data={
            'grant_type': 'refresh_token',
            'refresh_token': refresh_token
        }, headers={
            'Authorization': 'Basic ' + base64.b64encode(message.encode('ascii')).decode('ascii'),
            'Content-Type': 'application/x-www-form-urlencoded'
        })
        data = request_response.json()
        response.set_cookie(
                key='access_token',
                value=data['access_token'],
                max_age=data['expires_in'],
                secure=True,
                samesite="Strict"
            )
        response.status_code = status.HTTP_200_OK
        return response
    else:
        return '/'

@app.get('/logout', response_class=RedirectResponse)
def logout(response: Response):
    response = RedirectResponse('/')
    response.delete_cookie(key='access_token')
    response.delete_cookie(key='refresh_token')
    response.delete_cookie(key='has_refresh_token')
    return response
