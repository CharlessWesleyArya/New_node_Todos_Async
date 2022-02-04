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

exports.writeFileContent = function (file_name, data, cb) {
    fs.writeFile(file_name, JSON.stringify(data), function (err) {
        if (err) return cb(err, null)
        return cb(null, 'Created');
    })
}