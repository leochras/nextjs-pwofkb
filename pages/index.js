import Head from 'next/head';
import styles from '../styles/Home.module.css';

import React, { Component } from 'react';
import { render } from 'react-dom';

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
        let endTime = WebUntis.convertUntisTime(
          timetable[timetable.length - 1].endTime,
          new Date()
        );
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

getSchuleAus(day);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: endTime,
    };
  }

  render() {
    return (
      <div>
        <Hello name={this.state.name} />
        <p>Start editing to see some magic:)</p>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
        </a>
      </footer>
    </div>
  );
}
