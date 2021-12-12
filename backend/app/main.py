from typing import Optional

from fastapi import FastAPI, Response, Cookie
from fastapi.responses import RedirectResponse

from random import choice
from string import ascii_uppercase
from urllib.parse import urlencode, quote_plus
import requests
import base64

from . import config

app = FastAPI(root_path="/api/v1")


@app.get("/login", response_class=RedirectResponse)
def login(response: Response):
    state = ''.join(choice(ascii_uppercase) for i in range(16))
    response.set_cookie(key='state_cookie', value=state)
    return 'https://accounts.spotify.com/authorize?' + urlencode({
        'response_type': 'code',
        'client_id': config.client_id,
        'scope': config.scope,
        'redirect_uri': config.redirect_uri,
        'state': state,
    }, quote_via=quote_plus)

@app.get("/callback", response_class=RedirectResponse)
def auth_callback(response: Response, state: str, state_cookie: Optional[str] = Cookie(None), code: Optional[str] = None, error: Optional[str] = None):
    if state != state_cookie:
        # request has been tampered with
        return "States do not match up, your request may have been tempered with."
    else:
        response.delete_cookie('state_cookie')
    
    if error:
        return error
    
    if code:
        message = config.client_id + ':' + config.client_secret
        r = requests.post('https://accounts.spotify.com/api/token', data={
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': config.redirect_uri
        }, headers={
            'Authorization': 'Basic ' + base64.b64encode(message.encode('ascii')).decode('ascii'),
            'Content-Type': 'application/x-www-form-urlencoded'
        })
        data = r.json()
        if 'access_token' in data and 'refresh_token' in data:
            response.set_cookie(key='access_token', value=data['access_token'], max_age=data['expires_in'], httponly=True, secure=True)
            response.set_cookie(key='refresh_token', value=data['refresh_token'], max_age=2147483647, httponly=True, secure=True)
            return '/'
        else:
            return '/error'
