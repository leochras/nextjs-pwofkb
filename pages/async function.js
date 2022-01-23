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

await (async function () {
  const endOfMonthVar = endOfMonth(new Date());
  //const targetDate = subDays(new Date(), 2);
  const targetDate = new Date(0, 25);
  try {
    await untis.login();
    const x = await untis.validateSession();
    console.log('Valid session (User/PW): ' + x);
    //console.log('Session: ' + JSON.stringify(untis.sessionInformation));
    console.log(
      'Timetable: ' + JSON.stringify(await untis.getOwnTimetableFor(targetDate))
    );
    return endTime;
    //endTime = JSON.stringify(await untis.getOwnTimetableFor(targetDate));
    //console.log('Homework: ' + JSON.stringify(await untis.getHomeWorkAndLessons(new Date(), endOfMonthVar)));
    //console.log('Rooms: ' + JSON.stringify(await untis.getRooms()));
    //console.log('News: ' + JSON.stringify(await untis.getNewsWidget(targetDate)));
  } catch (e) {
    console.error(e);
  }
})();
