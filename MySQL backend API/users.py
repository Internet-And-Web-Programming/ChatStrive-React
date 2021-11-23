import requests
i=0
while True:
    resp = requests.post('http://192.168.1.10:4500/sign_up',json={"ID":"user"+str(i),"name":"ayush"+str(i)})
    print(resp.text)
    i+=1
    if(i==25):
        break

