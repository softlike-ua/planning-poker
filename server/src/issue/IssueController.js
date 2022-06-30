const Issue = require('./Issue')

class IssueController {
    async getAll(req,res) {
        const issues = await Issue.find()
        res.send(issues)
        // return Issue.find({});
    }
}

module.exports = new IssueController()
