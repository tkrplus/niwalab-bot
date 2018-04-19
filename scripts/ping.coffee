cron = require('cron').CronJob

PING_CHANNEL = 'CAACTUK1V'

module.exports = (robot) ->

  new cron('0,10,20,30,40,50 * * * *', () ->
    robot.send {room:PING_CHANNEL}, '@Koala ping'
  ).start()
