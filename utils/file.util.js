var fs = require('fs').promises;
exports.getFileContent = async function (file_name) {
    var bufferData = await fs.readFile(file_name)
    return JSON.parse(bufferData.toString())
}
exports.writeFileContent = async function (file_name, data) {
    await fs.writeFile(file_name, JSON.stringify(data))
    return "Created"
}