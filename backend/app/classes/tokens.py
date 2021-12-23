"""Class for tokens"""

import requests


class Tokens:
    """class for saving and accessing tokens"""
    access_token: str
    refresh_token: str
    scope: str
    token_type: str
    expires_in: int
    def __init__(self, access_token, refresh_token, scope, token_type, expires_in):
        self.access_token = access_token
        self.refresh_token = refresh_token
        self.scope = scope
        self.token_type = token_type
        self.expires_in = expires_in

        session = requests.Session()
        session.headers.update({
            'Authorization': 'Bearer ' + access_token,
            'Content-Type': 'application/json'
        })

        self.requests_instance = session

    def get_user(self):
        """get user account"""
        request_response = self.requests_instance.get(url='https://api.spotify.com/v1/me')
        return request_response.json()

    def save_tokens(self):
        """save tokens to db"""
        print("i have saved the tokens:" + self.access_token + self.refresh_token)
