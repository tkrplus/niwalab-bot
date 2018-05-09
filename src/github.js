import ScrapingClient from './utils/ScrapingClient'
import moment from 'moment'

const client = new ScrapingClient()

module.exports = ( robot => {
  robot.respond(/ぎっとはぶ/, async msg => {
    const uri = 'https://github.com/tkrplus'
    const $ = await client.doRequest(uri)
    const days = $('.day')
    let countOnYear = 0
    let countOnMonth = 0
    let countOnWeek = 0
    const startOfYear = moment().startOf('year')
    const startOfMonth = moment().startOf('month')
    const startOfWeek = moment().startOf('week')

    for(let i in days){
      const dayItem = days[i]
      if(!dayItem['attribs'] || !dayItem['attribs']['data-date']){
        continue
      }
      const day = moment(dayItem['attribs']['data-date'])
      const count = parseInt(dayItem['attribs']['data-count'])
      if(count && day.isSameOrAfter(startOfYear)){
        countOnYear++
      }
      if(count && day.isSameOrAfter(startOfMonth)){
        countOnMonth++
      }
      if(count && day.isSameOrAfter(startOfWeek)){
        countOnWeek++
      }
    }
    const today = moment()
    const msgText = `
      GitHub活動実績
      今週は${today.diff(startOfWeek,'d')}日経過した中で\`${countOnWeek}\`回。
      今月では${today.diff(startOfMonth,'d')}日経過した中で\`${countOnMonth}\`回。
      今年では${today.diff(startOfYear,'d')}日経過した中で\`${countOnYear}\`回。
      ${uri}
    `

    msg.send(msgText)
  })
})
