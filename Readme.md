##### Getting started from scratch
npm init - will create a package json file
# initial dependencies
    npm install
    npm i --save-dev typescript @types/node ts-node
# adding bin and src directories
mkdir bin src
touch src/index.ts bin/parking_lot bin/setup
# DRY RUN
bash bin/parking_lot
# add command processor
touch commandProcessor.ts
# add ParkingLot
touch ParkingLot.ts

###### test cases
mkdir tests
npm i --save-dev jest ts-jest @types/jest


###### Ready to go
bin/setup
bin/parking-lot file_inputs.txt