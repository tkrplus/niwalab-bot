import GitHubScrapingClient from './utils/ScrapingClient/GitHubScrapingClient'

const client = new GitHubScrapingClient()

module.exports = (robot) => {
  robot.respond(/ぎっとはぶ/, msg => {
    sendGitHubActibityResult('tkrplus', msg)
  })

  robot.respond(/GitHub (.*)/, msg => {
    const username = msg.match[1]
    sendGitHubActibityResult(username, msg)
  })

  const sendGitHubActibityResult = async(username, msg) => {
    const result = await client.getGitHubActibity(username)
    const msgText =
      `GitHub活動実績\n` +
      `今週は${result.week.days}日経過した中で \`${result.week.count}\` 回。 ${result.week.ratio.toFixed(1)}%\n` +
      `今月では${result.month.days}日経過した中で \`${result.month.count}\` 回。 ${result.month.ratio.toFixed(1)}%\n` +
      `今年では${result.year.days}日経過した中で \`${result.year.count}\` 回。 ${result.year.ratio.toFixed(1)}%\n` +
      `${result.user.uri}`
    msg.send(msgText)
  }
}
