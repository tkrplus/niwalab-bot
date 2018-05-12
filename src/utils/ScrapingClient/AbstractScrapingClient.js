import request from 'request'
import cheerio from 'cheerio'

class AbstractScrapingClient {
  constructor(domain) {
    this.domain = domain
  }

  // TODO: パラメータも受け取れるようにする
  doGet(path) {
    const uri = this.domain + path
    return new Promise((resolve, reject) => {
      request(uri, (error, res, body) => {
        if (!error && res.statusCode == 200) {
          resolve(cheerio.load(body))
        } else {
          reject(error)
        }
      })
    })
  }

}

export default AbstractScrapingClient
