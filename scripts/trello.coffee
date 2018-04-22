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
