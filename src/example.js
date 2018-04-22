
module.exports = ( robot => {
  robot.hear(/テスト/i, msg => {
    msg.send('Hello World from JS ES6!')
  })
})
