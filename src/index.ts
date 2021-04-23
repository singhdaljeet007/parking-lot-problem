import * as readline from 'readline'
import * as fs from 'fs'

const args = process.argv.slice(2)

if (args && args.length) {
    fs.readFile(process.argv[2], 'utf-8', function(err, data) {
        var arr = data ? data.split('\n') : []
        console.log("inputArray:",arr);
    })
}