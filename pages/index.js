import Head from 'next/head';
import styles from '../styles/Home.module.css';

const WebUntis = require('webuntis');
const { subDays, endOfMonth } = require('date-fns');

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

let endTime = 'no value';
let day = new Date(2022, 0, 17);

async function getSchuleAus(day) {
  console.log('getSchuleAus');
  try {
    await untis
      .login()
      .then(() => {
        console.log('1');
        return untis.getOwnTimetableForRange(day, day);
      })
      .then((timetable) => {
        timetable.sort((a, b) => a.startTime - b.startTime);
        endTime = WebUntis.convertUntisTime(
          timetable[timetable.length - 1].endTime,
          new Date()
        );
        //endTime = timetable[timetable.length - 1].endTime;
        //let endTime = 'TEST';
        return endTime;
      })
      .then((endTime) => {
        try {
          console.log('Success');
          console.log(endTime);
          return endTime;
        } catch (error) {
          endTime = 'Error';
          console.log(error);
        }
      });
  } catch (error) {
    console.log(error);
    return endTime;
  }
  return endTime;
}

function Page({ endTime }) {
  return <h1>Leo kommt um {endTime} nach Hause</h1>;
}

export async function getServerSideProps() {
  await (async function () {
    const endOfMonthVar = endOfMonth(new Date());
    const targetDate = subDays(new Date(), 2);
    try {
      await untis.login();
      const x = await untis.validateSession();
      console.log('Valid session (User/PW): ' + x);
      //console.log('Session: ' + JSON.stringify(untis.sessionInformation));
      console.log(
        'Timetable: ' +
          JSON.stringify(await untis.getOwnTimetableFor(targetDate))
      );
      //endTime = JSON.stringify(await untis.getOwnTimetableFor(targetDate));
      //console.log('Homework: ' + JSON.stringify(await untis.getHomeWorkAndLessons(new Date(), endOfMonthVar)));
      //console.log('Rooms: ' + JSON.stringify(await untis.getRooms()));
      //console.log('News: ' + JSON.stringify(await untis.getNewsWidget(targetDate)));
    } catch (e) {
      console.error(e);
    }
  })();

  //endTime = JSON.stringify(await getSchuleAus(day));
  //endTime = 'Test';
  return { props: { endTime } };
}

console.log('Test');
console.log('endTime:' + endTime);

export default Page;
