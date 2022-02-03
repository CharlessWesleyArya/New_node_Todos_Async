var fs = require('fs')
exports.getFileContent = function (file_name, cb) {
    fs.readFile(file_name, function (err, data) {
        if (err) return cb(err, null);
        return cb(null, JSON.parse(data.toString()))
    })
}

exports.writeFileContent = function (file_name, data, cb) {
    fs.writeFile(file_name, JSON.stringify(data), function (err) {
        if (err) return cb(err, null)
        return cb(null,'Created');
    })
}