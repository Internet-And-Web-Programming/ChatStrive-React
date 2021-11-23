import requests
import json

resp = requests.post('http://192.168.1.10:4500/fetch_message',json={'senderID':'user4','recvID':'user3'})
r = json.loads(resp.text)
print(r)