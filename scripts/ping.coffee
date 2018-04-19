cron = require('cron').CronJob

PING_CHANNEL = 'CAACTUK1V'
module.exports = (robot) ->

  robot.router.get '/ping', (req, res) ->
    res.status(200).send 'ok'
