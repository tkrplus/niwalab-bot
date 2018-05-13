import _ from 'lodash'
import moment from 'moment'
import TrelloApiClient from './utils/TrelloApiClient'

const TRELLO_API_KEY = process.env.TRELLO_API_KEY
const TRELLO_TOKEN = process.env.TRELLO_TOKEN
const TRELLO_USERNAME = process.env.TRELLO_USERNAME
const TRELLO_BOARD_NIWALAB_TODO = '5a069fb1ca9f92a9ba216a32'
const TRELLO_BOARD_READING_STOCK = '586b786befdad858766b9748'

const trelloApiClient = new TrelloApiClient()

module.exports = (robot) => {
  robot.respond(/trello boards/i, msg => {
    const res = trelloApiClient.getBoards(TRELLO_USERNAME, 'name,idList')
    msg.send(res)
  })

  robot.respond(/trello lists (.*)/i, msg => {
    const boardId = msg.match[1]
    const url = `https://trello.com/1/boards/${boardId}/lists?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}&fields=name,idList`
    const request = robot.http(url).get()
    request((err, res, body) => {
      if (err) {
        msg.send(`取得に失敗しました。 ${url}`)
        return
      }
      const json = JSON.parse(body)
      msg.send(json)
    })
  })

  robot.respond(/trello cards (.*)/i, msg => {
    const listId = msg.match[1]
    const url = `https://trello.com/1/lists/${listId}/cards?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}&fields=name,idList`
    const request = robot.http(url).get()
    request((err, res, body) => {
      if (err) {
        msg.send(`取得に失敗しました。 ${url}`)
        return
      }
      const json = JSON.parse(body)
      msg.send(json)
    })
  })

  robot.hear(/@とれろ らんだむ/i, msg => {
    const url = `https://trello.com/1/lists/${TRELLO_BOARD_NIWALAB_TODO}/cards?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`
    const request = robot.http(url).get()
    request((err, res, body) => {
      if (err) {
        msg.send(`取得に失敗しました。 ${url}`)
        return
      }
      const json = JSON.parse(body)
      const item = _.sample(json)
      const lastUpdate = moment().diff(moment(item.dateLastActivity), 'days')
      msg.send(`> <${item.url}|${item.name}> ${lastUpdate}日前`)
    })
  })

  robot.respond(/addBookStock (.*)/i, msg => {
    const bookName = msg.match[1]
    const url = `https://trello.com/1/cards?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}&name=${bookName}&idList=${TRELLO_BOARD_READING_STOCK}`
    const request = robot.http(url).post()
    request((err, res, body) => {
      if (err) {
        msg.send(`取得に失敗しました。 ${url}`)
        return
      }
      const json = JSON.parse(body)
      msg.send(`ストックに<${json.url}|${json.name}>を登録しました。`)
    })
  })

  robot.respond(/addBookList (.*)/i, msg => {
    const bookName = msg.match[1]
    const url = `https://trello.com/1/cards?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}&name=${bookName}&idList=${TRELLO_BOARD_READING_STOCK}`
    const request = robot.http(url).post()
    request((err, res, body) => {
      if (err) {
        msg.send(`取得に失敗しました。 ${url}`)
        return
      }
      const json = JSON.parse(body)
      msg.send(`購入リストに<${json.url}|${json.name}>を登録しました。`)
    })
  })
}
