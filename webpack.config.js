const path = require("path")

module.exports = {
    mode: "development",
    entry: "./src/firebase.js",
    output:{
        path: path.resolve(__dirname, "public"),
        filename: "bundle.js"
    },
    watch: true
}