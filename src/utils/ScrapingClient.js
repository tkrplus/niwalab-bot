import request from 'request'
import cheerio from 'cheerio'

class ScrapingClient {
  doRequest(uri) {
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

export default ScrapingClient
