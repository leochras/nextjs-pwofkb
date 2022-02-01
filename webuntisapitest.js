const WebUntis = require('webuntis');

const untis = new WebUntis(
  'htbla_kaindorf',
  'traley17',
  't&BpMsJd6q#p',
  //'thingproxy.freeboard.io/fetch/https://mese.webuntis.com/',
  //'alloworigin.com/get?url=https://mese.webuntis.com/',
  //'cors-anywhere.herokuapp.com/https://mese.webuntis.com/',
  'mese.webuntis.com/',
  'Stackblitz',
  'false'
);

let endTime;
let day = new Date(2022, 0, 24);

async function getSchuleAus(day) {
  console.log('0');
  try {
    await untis
      .login()
      .then(() => {
        console.log('1');
        return untis.getOwnTimetableForRange(day, day);
      })
      .then((timetable) => {
        console.log('2');
        timetable.sort((a, b) => a.startTime - b.startTime);
        endTime = WebUntis.convertUntisTime(
          timetable[timetable.length - 1].endTime,
          new Date()
        );
        //endTime = timetable[timetable.length - 1].endTime;
        //let endTime = 'TEST';
        //return endTime;
        return endTime;
      })
      .then((endTime) => {
        try {
          console.log(endTime);
          console.log('LastCall in async (stringify): endTime: ' + JSON.stringify(endTime));  
          //console.log('LastCall in async (parse): endTime: ' + JSON.parse(endTime)); 
        } catch (error) {
          endTime = 'Error';
          console.log(error);

        }
      });
  } catch (error) {
    console.log("Error: " + error);
  }
  //return Promise.all();
  return endTime;
}

async function log() {
    //endTime = JSON.parse(await getSchuleAus(day));
    //endTime = JSON.stringify(await getSchuleAus(day));
    //console.log('LastCall endTime: ' + JSON.stringify(await getSchuleAus(day)));
      endTime = await getSchuleAus(day);
      console.log('LastCall endTime: ' + JSON.stringify(endTime));
  }
log();


//getSchuleAus(day);


