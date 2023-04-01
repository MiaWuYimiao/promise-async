let baseURL = "http://numbersapi.com/"
let randomURL = "http://numbersapi.com/random?json"

/**************promises ****************/
// 1.
axios.get(randomURL)
.then(res => {
  console.log(res.data.text);
})

// 2.
const numbers = [1,2,3]
axios.get(`${baseURL}${numbers}?json`)
.then(res => {
  console.log(res)
})

// 3.
// version 1
let favNumber = 51
let list = []
axios.get(`${baseURL}${favNumber}?json`)
  .then(res => {
    console.log(res)
    list.push(res.data.text)
    return axios.get(`${baseURL}${favNumber}?json`)
  })
  .then(res => {
    console.log(res)
    list.push(res.data.text)
    for( item of list) {
      $('#favnumber').append(`<li>${item}</li>`)
    }
  })

// // version 2
// let newNumber = 52;
// let requests = [];
// for( let i = 0; i < 4; i++) {
//   requests.push(
//     axios.get(`${baseURL}${newNumber}?json`)
//   );
// }

// Promise.all(requests)
//   .then(resArr => (
//     resArr.forEach(res => {
//       console.log(res.data.text)
//       $('#favnumber').append(`<li>${res.data.text}</li>`);
//     })
//   ))
//   .catch(err => console.log(err));


// // version 3
// Promise.all(
//   Array.from({ length: 4 }, () => {
//     return $.getJSON(`${baseURL}51?json`);
//   })
// ).then(facts => {
//   facts.forEach(data => $('#favnumber').append(`<li>${data.text}</li>`));
// });
