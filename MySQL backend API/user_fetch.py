import requests

resp = requests.post('http://127.0.0.1:4500/sign_in',json={"UserID":"user300"})
print(resp.status_code)