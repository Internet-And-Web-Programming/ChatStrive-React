import requests
import json
# returns contacts in the form of a JSON object list in JSON string, used JSON.load to convert to JSON object list
resp = requests.post('http://192.168.1.10:4500/fetch_contacts',json={'User1':'user5'})
r = json.loads(resp.text)
print(r)