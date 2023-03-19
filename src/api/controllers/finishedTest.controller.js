const FeaturedTest = require('../models/featuredTest.model');
const GenericTest = require('../models/genericTest.model');
const Leaderboard = require('../models/leaderboard.model');
const User = require('../models/user.model');
const Record = require('../models/record.model');
const Achievement = require('../models/achievement.model');

const ultimateController = async (req, res, next) => {
  const { testId } = req.body;
  const { userId } = req.body;
  const { score } = req.body; //220/250/05:10
  const { rating } = parseInt(req.body); //4
  const { testType } = req.body;
  const percentage =
    (parseInt(score.split('/')[0]) / parseInt(score.split('/')[1])) * 100; //la puntuación del usuario en tanto por ciento
  const userTime =
    parseInt(score.split('/')[2].split(':')[0]) * 60 +
    parseInt(score.split(':')[1]); //el tiempo usado en segundos
  try {
    const user = await User.findById(userId); //encontramos el usuario
    const test =
      testType == 'FeaturedTest'
        ? await FeaturedTest.findById(testId)
        : await GenericTest.findById(testId); //encontramos el test en funcion del modelo
    const userRecord = [-1, -1]; //declaramos el record en -1 para luego comprobar si ha jugado previamente
    let userRating = -1; //declaramos el user rating
    let record = null;
    let recordIdToUpdate = null;
    for (const recordId of user.records) {
      record = await Record.findById(recordId); //recorremos todos los records del usuario
      if (record.test == testId) {
        recordIdToUpdate = recordId; //almacenamos la id del record para modificarlo
        //en el caso de que exista uno con la id de este test
        userRecord[0] =
          (parseInt(record.score.split('/')[0]) / //formateamos la puntuacion
            parseInt(record.score.split('/')[1])) *
          100;
        userRecord[1] =
          parseInt(record.score.split('/')[2].split(':')[0]) * 60 +
          parseInt(record.score.split(':')[1]); //formateamos el tiempo
        userRating = record.rating; //conseguimos la puntuacion del test -> -1 no está puntuado
      }
    }
    const first = await Leaderboard.findById(test.first); //encontramos el leaderboard del test
    const second = await Leaderboard.findById(test.second);
    const third = await Leaderboard.findById(test.third);
    //********************TEST.TIMES_PLAYED
    const times_played = test.times_played + 1; //sumamos uno al numero de veces jugadas del test
    //********************USER.TESTS_PLAYED
    const tests_played = user.tests_played + 1; //sumamos uno al numero de test completados del usuario
    //******************TEST.RATING
    const oldRating = test.rating; //conseguimos la puntuacion del test
    //******************TEST.AVERAGE
    const average = test.average; //conseguimos el array de puntuaciones
    let newTestRating = [];
    if (userRecord[0] != -1) {
      //en el caso de que ya se haya jugado
      //MEJOR QUE EL X% DE LAST
      average.push(percentage); //introducimos temporalmente la última puntuación
      average.sort((a, b) => a - b); //ordenamos de menor a mayor
      const betterThanLast =
        (average.slice(0, average.indexOf(percentage)).length /
          average.length) *
        100; //calculamos el tanto por ciento de puntuaciones menores
      average.splice(average.indexOf(percentage), 1); //sacamos la puntuación que habiamos introducido
      //******************TEST.AVERAGE
      let isNewRecord = false; //seteamos newrecord a false
      if (percentage > userRecord[0]) {
        average.replace(userRecord[0], percentage); //si la puntuación es mayor a su record la reemplazamos en el array de puntuaciones
        isNewRecord = true; //en el caso de que sea nuevo record seteamos a true
      }
      //******************RECORD.SCORE
      const newScore = isNewRecord ? score : record.score; //en caso de nuevo record seteamos el score
      //******************RECORD.RATING
      const newRecordRating = rating == -1 ? userRating : rating; //seteamos el rating
      //MEJOR QUE EL X% DE GLOBAL
      const betterThanGlobal =
        isNewRecord == false
          ? (average.slice(0, average.indexOf(userRecord[0])).length /
              average.length) *
            100
          : betterThanLast; //una vez redefinido el array de puntuaciones calculamos el % de puntuaciones peores
      //********************TEST.RATING
      newTestRating =
        rating != -1 && userRating != -1 //si el usuario ha puntuado esta vez y ya habia puntuacion
          ? [oldRating[0] - userRating + rating, oldRating[1]] //al antiguo le restamos la antigua y le sumamos la nueva y mantenemos el numero de votaciones
          : rating == -1 //si el usuario no ha votado
          ? oldRating //se mantiene como estaba
          : [oldRating[0] + rating, oldRating[1] + 1]; //si ha votado y no habia votado le sumamos la votacion y un voto
      await Record.findByIdAndUpdate(
        recordId,
        { score: newScore, last_score: score, rating: newRecordRating },
        { new: true }
      ); //actualizamos el record
    } else {
      //en el caso de que no se haya jugado
      //MEJOR QUE EL X%
      average.push(percentage); //introducimos la puntuación
      average.sort((a, b) => a - b); //ordenamos de menor a mayor
      const betterThanLast =
        (average.slice(0, average.indexOf(percentage)).length /
          average.length) *
        100; //calculamos el tanto por ciento de puntuaciones menores
      const betterThanGlobal = betterThanLast; //en este caso ambas son iguales
      //********************TEST.RATING
      newTestRating =
        rating != -1 ? [oldRating[0] + rating, oldRating[1] + 1] : oldRating; //seteamos la nueva puntuacion
      const newRecordToSave = await new Record({
        test: testId,
        score: score,
        last_score: score,
        rating: rating,
        model_type: testType,
      }); //guardamos el nuevo record
      await newRecordToSave.save();
      await User.findByIdAndUpdate(
        userId,
        { $push: { records: newRecordToSave._id } },
        { new: true }
      ); //pusheamos el nuevo record al user
    }
    //comparamos los leaderboard
    const scoreUser = parseInt(score.split('/')[0]);
    const scoreFirst = parseInt(first.score.split('/')[0]);
    const scoreSecond = parseInt(second.score.split('/')[0]);
    const scoreThird = parseInt(third.score.split('/')[0]);
    const firstTime =
      parseInt(first.score.split('/')[2].split(':')[0]) * 60 +
      parseInt(first.score.split(':')[1]); //el tiempo usado en segundos
    const secondTime =
      parseInt(second.score.split('/')[2].split(':')[0]) * 60 +
      parseInt(second.score.split(':')[1]); //el tiempo usado en segundos
    const thirdTime =
      parseInt(third.score.split('/')[2].split(':')[0]) * 60 +
      parseInt(third.score.split(':')[1]); //el tiempo usado en segundos
    let result = 'loser';
    let newFirst = first._id;
    let newSecond = second._id;
    let newThird = third._id;
    if (scoreUser > scoreThird) {
      result = 'third';
    }
    if (scoreUser == scoreThird && userTime < thirdTime) {
      result = 'third';
    }
    if (scoreUser > scoreSecond) {
      result = 'second';
    }
    if (scoreUser == scoreSecond && userTime < secondTime) {
      result = 'second';
    }
    if (scoreUser > scoreFirst) {
      result = 'first';
    }
    if (scoreUser == scoreFirst && userTime < firstTime) {
      result = 'first';
    }
    if (result != 'loser') {
      await Leaderboard.findByIdAndDelete(newThird);
      const newLeaderboard = await new Leaderboard({
        user: userId,
        backup_name: user.username,
        score: score,
      });
      await newLeaderboard.save();
      if (result == 'first') {
        newFirst = newLeaderboard._id;
        newSecond = newFirst;
        newThird = newSecond;
      }
      if (result == 'second') {
        newSecond = newLeaderboard._id;
        newThird = newSecond;
      }
      if (result == 'third') {
        newThird = newLeaderboard._id;
      }
    }
    const newBodyTest = {
      times_played: times_played,
      rating: newTestRating,
      average: average,
      first: newFirst,
      second: newSecond,
      third: newThird,
    };
    testType == 'FeaturedTest'
      ? await FeaturedTest.findByIdAndUpdate(
          testId,
          { newBodyTest },
          { new: true }
        )
      : await GenericTest.findByIdAndUpdate(
          testId,
          { newBodyTest },
          { new: true }
        );
  } catch (error) {
    next(error);
  }
};
