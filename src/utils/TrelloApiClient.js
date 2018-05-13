import AbstractApiClient from './AbstractApiClient'

const TRELLO_DOMAIN = 'https://trello.com/1'
const TRELLO_API_KEY = process.env.TRELLO_API_KEY
const TRELLO_TOKEN = process.env.TRELLO_TOKEN

const PATH = {
  BOARDS: '/members/%{USERNAME}/boards',
  CARDS: '/cards'
}

export default class TrelloApiClient extends AbstractApiClient {
  constructor() {
    super(TRELLO_DOMAIN)
  }

  doGet(path, params) {
    const getParams = {
      ...params,
      key: TRELLO_API_KEY,
      token: TRELLO_TOKEN
    }
    return super.doGet(path, getParams)
  }

  doPost(path, body) {
    const postBody = {
      ...body,
      key: TRELLO_API_KEY,
      token: TRELLO_TOKEN
    }
    return super.doPost(path, postBody)
  }

  getBoards(username, fields) {
    const params = {}
    if (fields) {
      params.fields = fields
    }
    this.doGet(PATH.BOARDS.replace(/%{USERNAME}/i, username), params)
  }

  createCard(name, idList) {
    const params = {
      name: name,
      idList: idList
    }
    this.doPost(PATH.CARDS, params)
  }
}
