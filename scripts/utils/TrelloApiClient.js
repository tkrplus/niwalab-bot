AbstractApiClient = require './AbstractApiClient'

const TRELLO_DOMAIN = 'https://trello.com/1'
const TRELLO_API_KEY = process.env.TRELLO_API_KEY
const TRELLO_TOKEN = process.env.TRELLO_TOKEN
const TRELLO_USERNAME = process.env.TRELLO_USERNAME
const TRELLO_BOARD_NIWALAB = process.env.TRELLO_BOARD_NIWALAB

const PATH = {
  CARDS: '/cards'
}

export default class TrelloApiClient extends AbstractApiClient {
  constructor() {
    super(TRELLO_DOMAIN)
  }

  doPost(path, body) {
    const postBody = {
      ...body,
      key: TRELLO_API_KEY,
      token: TRELLO_TOKEN
    }
    return super.doPost(path, postBody)
  }

  createCard(name, idList) {
    const params = {
      name: name,
      idList: idList
    }
    return this.doPost(PATH.CARDS, params)
  }
}
