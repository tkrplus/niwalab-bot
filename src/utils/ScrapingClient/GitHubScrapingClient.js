import moment from 'moment'
import AbstractScrapingClient from './AbstractScrapingClient'

const GITHUB_DOMAIN = 'https://github.com'

class GitHubScrapingClient extends AbstractScrapingClient {
  constructor() {
    super(GITHUB_DOMAIN)
  }

  async getGitHubActibity(username) {
    const path = `/${username}`
    const $ = await this.doGet(path)
    const days = $('.day')

    let countOnWeek = 0
    let countOnMonth = 0
    let countOnYear = 0
    const startOfWeek = moment().startOf('week')
    const startOfMonth = moment().startOf('month')
    const startOfYear = moment().startOf('year')

    for (let i in days) {
      const dayItem = days[i]
      if (!dayItem['attribs'] || !dayItem['attribs']['data-date']) {
        continue
      }
      const day = moment(dayItem['attribs']['data-date'])
      const count = parseInt(dayItem['attribs']['data-count'])
      if (count && day.isSameOrAfter(startOfWeek)) {
        countOnWeek++
      }
      if (count && day.isSameOrAfter(startOfMonth)) {
        countOnMonth++
      }
      if (count && day.isSameOrAfter(startOfYear)) {
        countOnYear++
      }
    }

    const today = moment()

    return {
      user: {
        uri: this.domain + path
      },
      week: {
        count: countOnWeek,
        days: today.diff(startOfWeek, 'd'),
        ratio: 100.0 * countOnWeek / today.diff(startOfWeek, 'd')
      },
      month: {
        count: countOnMonth,
        days: today.diff(startOfMonth, 'd'),
        ratio: 100.0 * countOnMonth / today.diff(startOfMonth, 'd')
      },
      year: {
        count: countOnYear,
        days: today.diff(startOfYear, 'd'),
        ratio: 100.0 * countOnYear / today.diff(startOfYear, 'd')
      }
    }
  }


}

export default GitHubScrapingClient
