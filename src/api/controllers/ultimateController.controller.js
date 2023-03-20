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
  const { rating } = req.body; //4
  const { testType } = req.body;
  const pointsUser = parseInt(score.split('/')[0]); //la puntuación del usuario
  const userTime =
    parseInt(score.split('/')[2].split(':')[0]) * 60 +
    parseInt(score.split(':')[1]); //el tiempo usado en segundos
  try {
    const user = await User.findById(userId); //encontramos el usuario
    const test =
      testType == 'FeaturedTest'
        ? await FeaturedTest.findById(testId)
        : await GenericTest.findById(testId); //encontramos el test en funcion del modelo
    const testTime =
      parseInt(test.time.split(':')[0]) * 60 +
      parseInt(test.time.split(':')[1]);
    const minutesDif = Math.floor(parseInt(testTime - userTime) / 60);
    const secondsDif = parseInt(testTime - userTime) - minutesDif * 60;
    const averageUser = parseFloat(`${pointsUser}.${minutesDif}${secondsDif}`);
    let userRecord = -1; //declaramos el record en -1 para luego comprobar si ha jugado previamente
    let userRating = -1; //declaramos el user rating
    let record = null;
    let recordIdToUpdate = null;
    for (const recordId of user.records) {
      record = await Record.findById(recordId); //recorremos todos los records del usuario
      if (record!=null){
      if (record.test == testId) {
        recordIdToUpdate = recordId; //almacenamos la id del record para modificarlo
        //en el caso de que exista uno con la id de este test
        const userRecordPoints = parseInt(record.score.split('/')[0]); //formateamos la puntuacion
        const userRecordTime =
          parseInt(record.score.split('/')[2].split(':')[0]) * 60 +
          parseInt(record.score.split(':')[1]); //formateamos el tiempo
        const minutesDifRecord = Math.floor(parseInt(testTime - userRecordTime) / 60);
        const secondsDifRecord =
          parseInt(testTime - userRecordTime) - minutesDifRecord * 60;
        userRecord = parseFloat(
          `${userRecordPoints}.${minutesDifRecord}${secondsDifRecord}`
        );
        userRating = record.rating; //conseguimos la puntuacion del test -> -1 no está puntuado
      }}
    }
    //const userRecordaverageUser = parseFloat(`${userRecord[0]}.${test.time.split(':')[0]+test.time.split(':')[1]}`)
    const first = await Leaderboard.findById(test.first[0]); //encontramos el leaderboard del test
    const second = await Leaderboard.findById(test.second[0]);
    const third = await Leaderboard.findById(test.third[0]);
    //********************TEST.TIMES_PLAYED
    const times_played = test.times_played + 1; //sumamos uno al numero de veces jugadas del test
    //********************USER.TESTS_PLAYED
    const tests_played = user.tests_played + 1; //sumamos uno al numero de test completados del usuario
    //******************TEST.RATING
    const oldRating = test.rating; //conseguimos la puntuacion del test
    //******************TEST.AVERAGE
    const average = test.average; //conseguimos el array de puntuaciones
    let newTestRating = [];
    let betterThanGlobal = 0;
    let betterThanLast = 0;
    if (userRecord != -1) {
      //en el caso de que ya se haya jugado
      //MEJOR QUE EL X% DE LAST
      average.push(averageUser); //introducimos temporalmente la última puntuación
      average.sort((a, b) => a - b); //ordenamos de menor a mayor
      betterThanLast =
        (average.slice(0, average.indexOf(averageUser)).length /
          (average.length - 1)) *
        100; //calculamos el tanto por ciento de puntuaciones menores
      average.splice(average.indexOf(averageUser), 1); //sacamos la puntuación que habiamos introducido
      //******************TEST.AVERAGE
      let isNewRecord = false; //seteamos newrecord a false
      if (averageUser > userRecord) {
        average.splice(average.indexOf(userRecord), 1);
        average.push(averageUser); //si la puntuación es mayor a su record la reemplazamos en el array de puntuaciones
        isNewRecord = true; //en el caso de que sea nuevo record seteamos a true
      }

      //******************RECORD.SCORE
      const newScore = isNewRecord ? score : record.score; //en caso de nuevo record seteamos el score
      //******************RECORD.RATING
      const newRecordRating = rating == -1 ? userRating : rating; //seteamos el rating
      //MEJOR QUE EL X% DE GLOBAL
      betterThanGlobal =
        isNewRecord == false
          ? (average.slice(0, average.indexOf(userRecord)).length /
              (average.length - 1)) *
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
        recordIdToUpdate,
        { score: newScore, last_score: score, rating: newRecordRating },
        { new: true }
      ); //actualizamos el record
    } else {
      //en el caso de que no se haya jugado
      //MEJOR QUE EL X%
      average.push(averageUser); //introducimos la puntuación
      average.sort((a, b) => a - b); //ordenamos de menor a mayor
      betterThanLast =
        (average.slice(0, average.indexOf(averageUser)).length /
          (average.length - 1)) *
        100; //calculamos el tanto por ciento de puntuaciones menores
      betterThanGlobal = betterThanLast; //en este caso ambas son iguales
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
    let newFirst = null;
    let newSecond = null;
    let newThird = null;
    const scoreUser = parseInt(score.split('/')[0]);
    if (first != null) {
      const scoreFirst = parseInt(first.score.split('/')[0]);
      const scoreSecond =
        second != null ? parseInt(second.score.split('/')[0]) : 0;
      const scoreThird =
        third != null ? parseInt(third.score.split('/')[0]) : 0;
      const firstTime =
        parseInt(first.score.split('/')[2].split(':')[0]) * 60 +
        parseInt(first.score.split(':')[1]); //el tiempo usado en segundos
      const secondTime =
        second != null
          ? parseInt(second.score.split('/')[2].split(':')[0]) * 60 +
            parseInt(second.score.split(':')[1])
          : 1000000; //el tiempo usado en segundos
      const thirdTime =
        third != null
          ? parseInt(third.score.split('/')[2].split(':')[0]) * 60 +
            parseInt(third.score.split(':')[1])
          : 1000000; //el tiempo usado en segundos
      let result = 'loser';
      newFirst = first._id;
      if (second != null) {
        newSecond = second._id;
      }
      if (third != null) {
        newThird = third._id;
      }
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
        if (newThird != '') {
          await Leaderboard.findByIdAndDelete(newThird);
        }
        const newLeaderboard = await new Leaderboard({
          user: userId,
          backup_name: user.username,
          score: score,
        });
        await newLeaderboard.save();
        if (result == 'first') {
          newFirst = newLeaderboard._id;
          newSecond = first;
          newThird = second;
        }
        if (result == 'second') {
          newSecond = newLeaderboard._id;
          newThird = second;
        }
        if (result == 'third') {
          newThird = newLeaderboard._id;
        }
      }
    } else {
      const newLeaderboard = await new Leaderboard({
        user: userId,
        backup_name: user.username,
        score: score,
      });
      await newLeaderboard.save();
      newFirst = newLeaderboard._id;
    }

    let newBodyTest = {
      times_played: times_played,
      rating: newTestRating,
      average: average,
      first: [newFirst],
    };
    if (newSecond != null) {
      newBodyTest = { ...newBodyTest, second: [newSecond] };
    }
    if (newThird != null) {
      newBodyTest = { ...newBodyTest, third: [newThird] };
    }
    testType == 'FeaturedTest'
      ? await FeaturedTest.findByIdAndUpdate(testId, newBodyTest, { new: true })
      : await GenericTest.findByIdAndUpdate(testId, newBodyTest, { new: true });
    const level = user.level;
    let next_level = user.next_level;
    level[1] = level[1] + parseInt(score.split('/')[0]);
    while (level[1] >= next_level) {
      level[0]++;
      next_level = level[0] * (70 * level[0]) + 100; //actualizamos el nivel del usuario en funcion a las preguntas
    }
    const achievements = []; //declaramos la lista de logros vacia
    const levelAchievements = await Achievement.find({ type: 'level' });
    for (const achievement of levelAchievements) {
      if (achievement.verification <= level[0]) {
        achievements.push(achievement._id);
      }
    } //encontramos los logros por nivel inferiores o iguales al nivel del usuario y los metemos en la lista
    const created =
      user.created_featuredTests.length + user.created_genericTests.length;
    const createdTestsAchievements = await Achievement.find({
      type: 'created',
    });
    for (const achievement of createdTestsAchievements) {
      if (achievement.verification <= created) {
        achievements.push(achievement._id);
      }
    } //encontramos los logros por nivel inferiores o iguales al numero de tests creados por el usuario y los metemos en la lista
    const playedTestsAchievements = await Achievement.find({ type: 'played' });
    for (const achievement of playedTestsAchievements) {
      if (achievement.verification <= user.tests_played) {
        achievements.push(achievement._id);
      }
    } //encontramos los logros por nivel inferiores o iguales al numero de tests completados por el usuario y los metemos en la lista
    const totalAchievements = await Achievement.find({ type: 'achievement' });
    for (const achievement of totalAchievements) {
      if (achievement.verification <= achievements.length)
        achievements.push(achievement._id);
    }
    ////encontramos los logros por logro que le corresponden para el total incluyendo a ellos mismos los metemos en la lista

    await User.findByIdAndUpdate(
      userId,
      {
        level: level,
        next_level: next_level,
        tests_played: tests_played,
        achievements: achievements,
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ global: betterThanGlobal, last: betterThanLast });
  } catch (error) {
    next(error);
  }
};

module.exports = { ultimateController };
