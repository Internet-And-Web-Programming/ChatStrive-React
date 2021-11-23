import requests
import random

messageconstructor = "hello hi how are you this is ayush good nah many very heartfelt time together with me love congratulations person text sender ## # - <br> "
messagec = messageconstructor.split(" ")

sl = [i for i in range(0,20)]
rl = [i for i in range(0,20)]

i=0
while True:
    messagemain = ""
    for j in range(0,random.randint(1,20)):
        messagemain+=" " + random.choice(messagec)
    resp = requests.post('http://192.168.1.10:4500/new_message',json={"senderID":"user"+str(random.choice(sl)),"recvID":"user"+str(random.choice(rl)),"message":messagemain})
    print(resp.text)
    i+=1
    if(i==3000):
        break

