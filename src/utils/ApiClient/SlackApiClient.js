import AbstractApiClient from './AbstractApiClient'

const SLACK_DOMAIN = 'https://slack.com/api/'
const SLACK_CONTENT_TYPE = 'application/json'
const SLACK_API_TOKEN = process.env.SLACK_API_TOKEN

const PATH = {
  CHAT: {
    POST_MESSAGE: 'chat.postMessage'
  }
}

export default class SlackApiClient extends AbstractApiClient {
  constructor() {
    super(SLACK_DOMAIN)
    super.addHeader('Content-type', SLACK_CONTENT_TYPE)
  }

  doGet(path, params) {
    const getParams = {
      ...params,
      token: SLACK_API_TOKEN
    }
    return super.doGet(path, getParams)
  }

  doPost(path, body) {
    const postBody = {
      ...body,
      token: SLACK_API_TOKEN
    }
    return super.doPost(path, postBody)
  }

  postMessage(channel, text) {
    const body = {
      channel: channel,
      text: text
    }
    this.doPost(PATH.CHAT.POST_MESSAGE, body)
  }

  postAttachments(channel, attachments) {
    const body = {
      channel: channel,
      attachments: attachments
    }
    this.doPost(PATH.CHAT.POST_MESSAGE, body)
  }
}
