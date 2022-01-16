import Head from 'next/head';
import styles from '../styles/Home.module.css';

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
let day = new Date(2022, 0, 19);

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
        let endTime = 'TEST';

        return endTime;
      })
      .then((endTime) => {
        try {
          console.log('Success');
          console.log(endTime);
        } catch (error) {
          endTime = 'Error';
          console.log(error);
        }
      });
  } catch (error) {
    console.log(error);
  }
}

function Page({ endTime }) {
  return <h1>Leo kommt um {endTime} nach Hause</h1>;
}

export async function getServerSideProps() {
  //let get = getSchuleAus(day);
  let endTime = JSON.stringify(await getSchuleAus(day));
  //let endTime = '17:30';
  return { props: { endTime } };
}
console.log('Test');
console.log('endTime:' + endTime);

export default Page;
