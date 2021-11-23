import requests

resp = requests.post('http://192.168.1.10:4500/sign_in',json={"UserID":"user2"})
print(resp.text)