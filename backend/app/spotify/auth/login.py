import base64
from flask import Blueprint, json, request, redirect
import requests
import os
from dotenv import load_dotenv, dotenv_values
from urllib.parse import quote

auth_bp = Blueprint("auth", __name__)

load_dotenv()

@auth_bp.route('/login/spotify')
def login():
    auth_query_parameters = {
        "response_type": "code",
        "redirect_uri": os.getenv("REDIRECT_URI"),
        "scope": os.getenv("SCOPE"),
        "client_id": os.getenv("CLIENT_ID"),
        "state": "abc123def456" ## generate this randomly, make it global and compare on return for XSS attack prevention
    }
    url_args = "&".join(["{}={}".format(key, quote(val)) for key, val in auth_query_parameters.items()])
    auth_url = "{}/?{}".format(os.getenv("SPOTIFY_AUTH_URL"), url_args)
    return redirect(auth_url)


@auth_bp.route('/test')
def lol():
    lol = os.getenv("API_VERSION")
    breakpoint()
    return "test"

@auth_bp.route('/callback')
def callback_f():
    code = request.args['code'] 
    state = request.args['state']

    header = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + base64.b64encode(f"{os.getenv("CLIENT_ID")}:{os.getenv("CLIENT_SECRET")}".encode()).decode()
        }

    if not state:
        return "Error. Invalid State. No XSS attacks for you."
    
    auth_url = 'https://accounts.spotify.com/api/token'
    auth_options = {
        "code": code,
        "redirect_uri": os.getenv("REDIRECT_URI"),
        "grant_type": 'authorization_code'
      }
    response = requests.post(auth_url, data=auth_options,headers = header) 
    if response.status_code != 200:
        return "error"
    data = json.loads(response.text) if response else ""
    access_token = data["access_token"]
    refresh_token = data["refresh_token"]
    scope = data["scope"]
    token_type = data["token_type"]
    get_user_info_spotify(access_token)



def get_user_info_spotify(access_token):
    user_info_url = 'https://api.spotify.com/v1/me'
    header = {
        "Authorization": f"Bearer {access_token}"
    }
    response = requests.get(user_info_url, headers=header)
    data = json.loads(response.text) if response else ""
    breakpoint()
    return '"hey gorgeous'


