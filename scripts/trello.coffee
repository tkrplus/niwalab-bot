# Description:
#   Example scripts for you to examine and try out.
#
# Notes:
#   They are commented out by default, because most of them are pretty silly and
#   wouldn't be useful and amusing enough for day to day huboting.
#   Uncomment the ones you want to try and experiment with.
#
#   These are from the scripting documentation: https://github.com/github/hubot/blob/master/docs/scripting.md

_ = require 'lodash'
moment = require 'moment'

TRELLO_API_KEY = process.env.TRELLO_API_KEY
TRELLO_TOKEN = process.env.TRELLO_TOKEN
TRELLO_USERNAME = process.env.TRELLO_USERNAME
TRELLO_BOARD_NIWALAB = process.env.TRELLO_BOARD_NIWALAB
TRELLO_BOARD_NIWALAB_TODO = '5a069fb1ca9f92a9ba216a32'
TRELLO_BOARD_NIWALAB_TODO = '5a069fb1ca9f92a9ba216a32'
TRELLO_BOARD_LISTING_STOCK = '586b786befdad858766b9748'
TRELLO_BOARD_READING_STOCK = '586b78732dd27afe6239ea96'

module.exports = (robot) ->

  robot.respond /trello boards/i, (msg) ->
    url = "https://trello.com/1/members/#{TRELLO_USERNAME}/boards?key=#{TRELLO_API_KEY}&token=#{TRELLO_TOKEN}&fields=name"
    request = robot.http(url).get()
    request (err, res, body) ->
      json = JSON.parse body
      console.info json

  robot.respond /trello lists (.*)/i, (msg) ->
    boardId = msg.match[1]
    url = "https://trello.com/1/boards/#{boardId}/lists?key=#{TRELLO_API_KEY}&token=#{TRELLO_TOKEN}&fields=name,idList"
    request = robot.http(url).get()
    request (err, res, body) ->
      json = JSON.parse body
      console.info json

  robot.respond /trello cards (.*)/i, (msg) ->
    listId = msg.match[1]
    url = "https://trello.com/1/lists/#{listId}/cards?key=#{TRELLO_API_KEY}&token=#{TRELLO_TOKEN}&fields=name,idList"
    request = robot.http(url).get()
    request (err, res, body) ->
      json = JSON.parse body
      console.info json

  robot.hear /@とれろ らんだむ/i, (msg) ->
    url = "https://trello.com/1/lists/#{TRELLO_BOARD_NIWALAB_TODO}/cards?key=#{TRELLO_API_KEY}&token=#{TRELLO_TOKEN}"
    request = robot.http(url).get()
    request (err, res, body) ->
      json = JSON.parse body
      item = _.sample(json)
      lastUpdate = moment().diff(moment(item.dateLastActivity), 'days')
      msg.send "> <#{item.url}|#{item.name}> #{lastUpdate}日前"

  robot.respond /addBookStock (.*)/i, (msg) ->
    bookName = msg.match[1]
    url = "https://trello.com/1/cards?key=#{TRELLO_API_KEY}&token=#{TRELLO_TOKEN}&name=#{bookName}&idList=#{TRELLO_BOARD_READING_STOCK}"
    request = robot.http(url).post()
    request (err, res, body) ->
      json = JSON.parse body
      msg.send "ストックに<#{json.url}|#{json.name}>を登録しました。"

  robot.respond /addBookList (.*)/i, (msg) ->
    bookName = msg.match[1]
    url = "https://trello.com/1/cards?key=#{TRELLO_API_KEY}&token=#{TRELLO_TOKEN}&name=#{bookName}&idList=#{TRELLO_BOARD_READING_STOCK}"
    request = robot.http(url).post()
    request (err, res, body) ->
      json = JSON.parse body
      msg.send "購入リストに<#{json.url}|#{json.name}>を登録しました。"

  # robot.respond /open the (.*) doors/i, (res) ->
  #   doorType = res.match[1]
  #   if doorType is "pod bay"
  #     res.reply "I'm afraid I can't let you do that."
  #   else
  #     res.reply "Opening #{doorType} doors"
  #
  # robot.hear /I like pie/i, (res) ->
  #   res.emote "makes a freshly baked pie"
  #
  # lulz = ['lol', 'rofl', 'lmao']
  #
  # robot.respond /lulz/i, (res) ->
  #   res.send res.random lulz
  #
  # robot.topic (res) ->
  #   res.send "#{res.message.text}? That's a Paddlin'"
  #
  #
  # enterReplies = ['Hi', 'Target Acquired', 'Firing', 'Hello friend.', 'Gotcha', 'I see you']
  # leaveReplies = ['Are you still there?', 'Target lost', 'Searching']
  #
  # robot.enter (res) ->
  #   res.send res.random enterReplies
  # robot.leave (res) ->
  #   res.send res.random leaveReplies
  #
  # answer = process.env.HUBOT_ANSWER_TO_THE_ULTIMATE_QUESTION_OF_LIFE_THE_UNIVERSE_AND_EVERYTHING
  #
  # robot.respond /what is the answer to the ultimate question of life/, (res) ->
  #   unless answer?
  #     res.send "Missing HUBOT_ANSWER_TO_THE_ULTIMATE_QUESTION_OF_LIFE_THE_UNIVERSE_AND_EVERYTHING in environment: please set and try again"
  #     return
  #   res.send "#{answer}, but what is the question?"
  #
  # robot.respond /you are a little slow/, (res) ->
  #   setTimeout () ->
  #     res.send "Who you calling 'slow'?"
  #   , 60 * 1000
  #
  # annoyIntervalId = null
  #
  # robot.respond /annoy me/, (res) ->
  #   if annoyIntervalId
  #     res.send "AAAAAAAAAAAEEEEEEEEEEEEEEEEEEEEEEEEIIIIIIIIHHHHHHHHHH"
  #     return
  #
  #   res.send "Hey, want to hear the most annoying sound in the world?"
  #   annoyIntervalId = setInterval () ->
  #     res.send "AAAAAAAAAAAEEEEEEEEEEEEEEEEEEEEEEEEIIIIIIIIHHHHHHHHHH"
  #   , 1000
  #
  # robot.respond /unannoy me/, (res) ->
  #   if annoyIntervalId
  #     res.send "GUYS, GUYS, GUYS!"
  #     clearInterval(annoyIntervalId)
  #     annoyIntervalId = null
  #   else
  #     res.send "Not annoying you right now, am I?"
  #
  #
  # robot.router.post '/hubot/chatsecrets/:room', (req, res) ->
  #   room   = req.params.room
  #   data   = JSON.parse req.body.payload
  #   secret = data.secret
  #
  #   robot.messageRoom room, "I have a secret: #{secret}"
  #
  #   res.send 'OK'
  #
  # robot.error (err, res) ->
  #   robot.logger.error "DOES NOT COMPUTE"
  #
  #   if res?
  #     res.reply "DOES NOT COMPUTE"
  #
  # robot.respond /have a soda/i, (res) ->
  #   # Get number of sodas had (coerced to a number).
  #   sodasHad = robot.brain.get('totalSodas') * 1 or 0
  #
  #   if sodasHad > 4
  #     res.reply "I'm too fizzy.."
  #
  #   else
  #     res.reply 'Sure!'
  #
  #     robot.brain.set 'totalSodas', sodasHad+1
  #
  # robot.respond /sleep it off/i, (res) ->
  #   robot.brain.set 'totalSodas', 0
  #   res.reply 'zzzzz'
