import ScrapingClient from './utils/ScrapingClient'
import moment from 'moment'

const client = new ScrapingClient()

module.exports = ( robot => {
  robot.respond(/ぎっとはぶ/, async msg => {
    const result = await checkGitHubActibity('tkrplus')

    const msgText =
      `GitHub活動実績\n` +
      `今週は${result.week.days}日経過した中で \`${result.week.count}\` 回。 ${result.week.ratio.toFixed(1)}%\n` +
      `今月では${result.month.days}日経過した中で \`${result.month.count}\` 回。 ${result.month.ratio.toFixed(1)}%\n` +
      `今年では${result.year.days}日経過した中で \`${result.year.count}\` 回。 ${result.year.ratio.toFixed(1)}%\n` +
      `${result.user.uri}`

    msg.send(msgText)
  })

  robot.respond(/GitHub (.*)/, async msg => {
    const username = msg.match[1]
    const result = await checkGitHubActibity(username)

    const msgText =
      `GitHub活動実績\n` +
      `今週は${result.week.days}日経過した中で \`${result.week.count}\` 回。 ${result.week.ratio.toFixed(1)}%\n` +
      `今月では${result.month.days}日経過した中で \`${result.month.count}\` 回。 ${result.month.ratio.toFixed(1)}%\n` +
      `今年では${result.year.days}日経過した中で \`${result.year.count}\` 回。 ${result.year.ratio.toFixed(1)}%\n` +
      `${result.user.uri}`

    msg.send(msgText)
  })

  const checkGitHubActibity = async (username) => {
    const uri = `https://github.com/${username}`
    const $ = await client.doRequest(uri)
    const days = $('.day')

    let countOnWeek = 0
    let countOnMonth = 0
    let countOnYear = 0
    const startOfWeek = moment().startOf('week')
    const startOfMonth = moment().startOf('month')
    const startOfYear = moment().startOf('year')

    for(let i in days){
      const dayItem = days[i]
      if(!dayItem['attribs'] || !dayItem['attribs']['data-date']){
        continue
      }
      const day = moment(dayItem['attribs']['data-date'])
      const count = parseInt(dayItem['attribs']['data-count'])
      if(count && day.isSameOrAfter(startOfWeek)){
        countOnWeek++
      }
      if(count && day.isSameOrAfter(startOfMonth)){
        countOnMonth++
      }
      if(count && day.isSameOrAfter(startOfYear)){
        countOnYear++
      }
    }

    const today = moment()

    return {
      user: {
        uri: uri
      },
      week: {
        count: countOnWeek,
        days: today.diff(startOfWeek,'d'),
        ratio: 100.0 * countOnWeek / today.diff(startOfWeek,'d')
      },
      month: {
        count: countOnMonth,
        days: today.diff(startOfMonth,'d'),
        ratio: 100.0 * countOnMonth / today.diff(startOfMonth,'d')
      },
      year: {
        count: countOnYear,
        days: today.diff(startOfYear,'d'),
        ratio: 100.0 * countOnYear / today.diff(startOfYear,'d')
      }
    }
  }
})
