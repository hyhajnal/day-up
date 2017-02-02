import Mock from 'mockjs'
export const chatData = 
    Mock.mock({
      "msgs|10":[
        {
          "id|+1":1,
          "name|1-10":"n",
          "owner":"hajnal",
          "content":"guess",
          "type|0-2":0,
          "timestamp":'@now',
          "roomId|1-3":1
        }
      ]
    })

export const roomData = 
  Mock.mock({
    "rooms|10":[
      {
        "id|+1":1,
        "name|1-10":"n",
        "usr":['hajnal','Mark'],
        "type":0
      }
    ]
  })

//room type 群聊0 单聊1
