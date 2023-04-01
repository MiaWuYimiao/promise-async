let baseURL = "http://numbersapi.com/"
let randomURL = "http://numbersapi.com/random?json"

/**************async/await ****************/
// 1.
async function getFactofNumber() {
  const fact = await axios.get(randomURL)
  console.log(fact.data.text);
}

// 2.
const numbers = [1,2,3]
async function getFactofNumbers(numbers) {
  const facts = await axios.get(`${baseURL}${numbers}?json`);
  console.log(facts.data)
}


// 3.
// // version 1
// async function  getNumberFactParallel() {
//   let f1Promise = axios.get(`${baseURL}51?json`);
//   let f2Promise = axios.get(`${baseURL}51?json`);
//   let f3Promise = axios.get(`${baseURL}51?json`);

//   let f1 = await f1Promise;
//   let f2 = await f2Promise;
//   let f3 = await f3Promise;

//   $('#favnumber').append(`<li>${f1.data.text}</li>`)
//   $('#favnumber').append(`<li>${f2.data.text}</li>`)
//   $('#favnumber').append(`<li>${f3.data.text}</li>`)
// }

// version 2
async function  getNumberFactParallel() {
  let facts = await Promise.all([
    axios.get(`${baseURL}51?json`),
    axios.get(`${baseURL}51?json`),
    axios.get(`${baseURL}51?json`)
  ])

  $('#favnumber').append(`<li>${facts[0].data.text}</li>`)
  $('#favnumber').append(`<li>${facts[1].data.text}</li>`)
  $('#favnumber').append(`<li>${facts[2].data.text}</li>`)
}