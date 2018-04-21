import axios from 'axios'
import Const from '../const'

const { TIME } = Const

class AbstractApiClient {
  constructor(domain) {
    this.domain = domain
  }

  addHeader(headerName, headerValue) {
    if (this.headers[headerName]) {
      throw new Error('#{this.headers[headerName]} is already set.')
    }
    this.headers[headerName] = headerValue
  }

  commonCheck(path) {
    if (!/^https?:\/\//.test(this.domain)) {
      throw new Error('Domain is not set.')
    }
    if (!path) {
      throw new Error('Path is not set.')
    }
  }

  async doGet(path, params) {
    this.commonCheck(path)
    const response = await axios({
      method: 'GET',
      url: this.domain + path,
      params: params,
      headers: this.headers,
      timeout: TIME.API_TIMEOUT
    })
    return response.body
  }

  async doPost(path, body) {
    this.commonCheck(path)
    const response = await axios({
      method: 'POST',
      url: this.domain + path,
      data: body,
      headers: this.headers,
      timeout: TIME.API_TIMEOUT
    })
    return response.body
  }
}

export default AbstractApiClient
