
class PingController {
  static getPing = (req, res) => {
    res.json({
      "success": true
    })
  }
}

module.exports = PingController;