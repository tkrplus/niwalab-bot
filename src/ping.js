
module.exports = ( robot => {
  robot.router.get('/ping', (req, res) => {
    res.status(200).send('ok')
  })
})
