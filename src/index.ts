
import * as fs from 'fs'
import { commandProcessor } from './command-processor'

const args = process.argv.slice(2);
if (args && args.length>0) {
    fs.readFile(process.argv[2], 'utf-8', function(err, data) {
        if(err){
          console.log("Error reading file");   
        }
        var arr = data ? data.split('\n') : [];
        arr.forEach(input => console.log(commandProcessor(input)));
    })
}else{
    console.log("Invalid file input")
}