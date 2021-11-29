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
    sender = str(random.choice(sl))
    recv = str(random.choice(rl))
    resp = requests.post('http://192.168.1.10:4500/new_message',json={"senderID":"user"+ sender,"recvID":"user"+ recv,"message":messagemain})
    print(resp.text)
    i+=1
    if(i==3000):
        break
    # the create session request
    resp_session = requests.post('http://192.168.1.10:4500/create_session',json={"User1":"user"+ sender,"User2":"user"+ recv})
    if(resp_session.status_code==502):
        continue
    

