import {enablePromise, openDatabase} from 'react-native-sqlite-storage';

export const testTable =
  'id text PRIMARY KEY, name text, description text, tags text, level text, numberOfTasks number';
export const questionTable =
  'question_id INTEGER PRIMARY KEY AUTOINCREMENT, id text, question text, answer_a text, answer_b text, answer_c text, answer_d text, correct_answer string, duration number';

enablePromise(true);

export const getDBConnection = () => {
  return openDatabase(
    {name: 'quiz.db'},
    () => console.log('sucess'),
    e => console.log('error', e),
  );
};

export const createTable = async (db, tableName, columns) => {
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(${columns});`;
  await db.executeSql(
    query,
    [],
    () => {
      console.log('success on creating tables', tableName);
    },
    error => {
      console.log('error', error);
    },
  );
};

export const getTestsDB = async db => {
  try {
    const tests = [];
    const sql = `SELECT * FROM tests`;
    const results = await db.executeSql(sql);
    results.forEach(test => {
      for (let i = 0; i < test.rows.length; i++) {
        tests.push(test.rows.item(i));
      }
    });
    return tests;
  } catch (error) {
    console.log('error occured while getting data', error);
  }
};

export const getDBQuestions = async (db, id) => {
  try {
    const questions = [];
    const sql = `SELECT * FROM questions WHERE id = "${id}"`;
    const result = await db.executeSql(sql);
    result.forEach(question => {
      for (let i = 0; i < question.rows.length; i++) {
        questions.push(question.rows.item(i));
      }
    });
    return questions;
  } catch (error) {
    throw new Error('Can not get questions from db' + error);
  }
};

export const saveTestsToDB = async (db, tests) => {
  const insertQuery =
    `INSERT INTO tests VALUES ` +
    tests
      .map(
        test =>
          `('${test.id}', '${test.name}', '${
            test.description
          }', '${test.tags.reduce((acc, cur) => acc + cur, '')}', '${
            test.level
          }', '${test.numberOfTasks}')`,
      )
      .join(',');

  return db.executeSql(
    insertQuery,
    [],
    data => console.log('adding data was sucessfull', data),
    error => console.log('the error occures', error),
  );
};

export const saveQuestions = async (db, questions) => {
  const insertQ =
    'INSERT INTO questions VALUES ' +
    questions.tasks.map(
      (question, index) =>
        `(NULL, "${questions.id}", "${question.question}", "${
          question.answers[0].content ?? undefined
        }", "${question.answers[1].content ?? undefined}","${
          question.answers[2].content ?? undefined
        }","${
          typeof question.answers[3] === 'undefined'
            ? null
            : question.answers[3].content
        }", "${getGoodAnswer(question.answers)}", "${question.duration}") `,
    );
  return db.executeSql(
    insertQ,
    [],
    () => {
      console.log('succes on adding data');
    },
    error => {
      console.log('error while addding data', error);
    },
  );
};

const getGoodAnswer = answers => {
  const data = answers.filter(data => data.isCorrect);
  return data[0].content;
};

export const deleteTable = async (db, table) => {
  const deleteTable = `DROP TABLE IF EXISTS ${table}`;
  db.executeSql(
    deleteTable,
    [],
    () => console.log('delete sucessfull'),
    error => console.log('there was a problem while deleting table', error),
  );
};
