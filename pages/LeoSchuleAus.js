const WebUntis = require('webuntis');

const untis = new WebUntis(
  'htbla_kaindorf',
  'traley17',
  't&BpMsJd6q#p',
  //'thingproxy.freeboard.io/fetch/https://mese.webuntis.com/',
  //'alloworigin.com/get?url=https://mese.webuntis.com/',
  //'cors-anywhere.herokuapp.com/https://mese.webuntis.com/',
  'mese.webuntis.com/',
  'Stackblitz'
);

let endTime = "ungültig";
let day = new Date(2022, 1, 25);

async function getSchuleAus(day) {
  console.log('0');
  try {
    await untis
      .login()
      .then(() => {
        console.log('1');
        console.log(untis.getOwnTimetableForRange(day, day));
        return untis.getOwnTimetableForRange(day, day);
      })
      .then((timetable) => {
        console.log('2');
        console.log(timetable);
        timetable.sort((a, b) => a.startTime - b.startTime);
        endTime = WebUntis.convertUntisTime(
          timetable[timetable.length - 1].endTime,
          new Date()
        );
        //endTime = timetable[timetable.length - 1].endTime;
        //let endTime = 'TEST';
        //return endTime;
        console.log(2.5);
        console.log(JSON.stringify(timetable));
      })
      .then((endTime) => {
        console.log(3);
        try {
          console.log(
            'LastCall in async (stringify): endTime: ' + JSON.stringify(endTime)
          );
          //console.log('LastCall in async (parse): endTime: ' + JSON.parse(endTime));
          return endTime;
        } catch (error) {
          endTime = 'Error';
          console.log(error);
        }
      });
  } catch (error) {
    console.log('Error in API request: ' + error);
  }
  //return endTime;
}

function LeoSchuleAus({ endTime }) {
  return <h1>Leo kommt um {endTime} nach Hause</h1>;
}

export async function getServerSideProps() {
    //let endTime = JSON.stringify((await getSchuleAus(day)));
    endTime = "TEST";
    endTime = JSON.stringify(getSchuleAus(day));
    //console.log('LastCall endTime: ' + JSON.stringify(await endTime));
  //endTime = JSON.stringify(await getSchuleAus(day));
  //endTime = 'Test';
  return { props: { endTime } };
}

//console.log('endTime:' + endTime);

export default LeoSchuleAus;
