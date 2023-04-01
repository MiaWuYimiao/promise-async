$(function() {
    let newDeckUrl = "https://deckofcardsapi.com/api/deck/new/";
    let baseUrl = "https://deckofcardsapi.com/api/deck/";


    /************* callback ****************/
    // 1.
    axios.get(newDeckUrl)
        .then(res => {
            return axios.get(`${baseUrl}${res.data.deck_id}/shuffle/`)
        })
        .then(res => {
            return axios.get(`${baseUrl}${res.data.deck_id}/draw/?count=1`)
        })
        .then(res => {
            let {suit, value} = res.data.cards[0];
            console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`)
        })
        .catch(err => console.log("Rejected!!", err))

    // 2.
    axios.get(newDeckUrl)
        .then(res => {
            return axios.get(`${baseUrl}${res.data.deck_id}/shuffle/`)
        })
        .then(res => {
            return axios.get(`${baseUrl}${res.data.deck_id}/draw/?count=1`)
        })
        .then(res => {
            let {suit, value} = res.data.cards[0];
            console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`)
            return axios.get(`${baseUrl}${res.data.deck_id}/draw/?count=1`)
        })
        .then(res => {
            let {suit, value} = res.data.cards[0];
            console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`)
        })
        .catch(err => console.log("Rejected!!", err))

    // 3.
    let deck_id = null;
    $button = $("#draw");
    $cardArea = $('#cardArea')

    $.getJSON(newDeckUrl)
        .then(res => {
            return $.getJSON(`${baseUrl}${res.deck_id}/shuffle/`)
        })
        .then(res => {
            deck_id = res.deck_id;
            $button.show();
        })
        .catch(err => console.log("Rejected!!", err))


    $button.on("click", function() {
        $.getJSON(`${baseUrl}${deck_id}/draw/?count=1`)
            .then(res => {
                let randomX = Math.random() * 40 - 20;
                let randomY = Math.random() * 40 - 20;
                let angle = Math.random() * 90 - 45;
                let {image} = res.cards[0];
                $cardArea.append(
                    $('<img>', {
                        src : image,
                        css : {
                            transform : `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
                        }
                    })
                );
                if (res.remainind === 0) {
                    $button.remove();
                }
            })
            .catch(err => console.log("Rejected!!", err))
    })

});