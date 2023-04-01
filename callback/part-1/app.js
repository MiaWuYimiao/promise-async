let baseURL = "http://numbersapi.com/"
let randomURL = "http://numbersapi.com/random?json"

/**************callbacks ****************/
// 2.
$.getJSON(randomURL, response => {
    $('#list').append(`<li>${response.text}</li>`)
    console.log(response);
    $.getJSON(randomURL, response => {
      $('#list').append(`<li>${response.text}</li>`)
      console.log(response);
      $.getJSON(randomURL, response => {
        $('#list').append(`<li>${response.text}</li>`)
        console.log(response);
      });
    });
});


// 3.
$.getJSON(`${baseURL}51?json`, response => {
  $('#favnumber').append(`<li>${response.text}</li>`)
  console.log(response);
  $.getJSON(`${baseURL}51?json`, response => {
    $('#favnumber').append(`<li>${response.text}</li>`)
    console.log(response);
    $.getJSON(`${baseURL}51?json`, response => {
      $('#favnumber').append(`<li>${response.text}</li>`)
      console.log(response);
    });
  });
});


