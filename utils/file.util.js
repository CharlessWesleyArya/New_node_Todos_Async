var fs = require('fs').promises;
exports.getFileContent = function (file_name) {
    return fs.readFile(file_name)
        .then(data => {
           return JSON.parse(data.toString())
        })
        .catch(err => {
            reject(err)
        })
}

exports.writeFileContent = function (file_name, data) {
    return fs.writeFile(file_name, JSON.stringify(data))
        .then('Created')
}