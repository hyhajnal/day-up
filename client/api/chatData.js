import Mock from 'mockjs'
export const chatData = 
    Mock.mock({
      "msgs|10":[
        {
          "id|1-10":"m",
          "name|1-10":"n",
          "owner":"hajnal",
          "content":"guess",
          "type|0-2":0,
          "timestamp":'@now',
          "roomId|1-3":1
        }
      ]
    })

//console.log(chatData)
