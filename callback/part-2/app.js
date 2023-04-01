$(function() {
    let newDeckUrl = "https://deckofcardsapi.com/api/deck/new/";
    let baseUrl = "https://deckofcardsapi.com/api/deck/";


    /************* callback ****************/
    // 1.
    $.getJSON(newDeckUrl, res => {
        let deck = res;
        console.log(deck.deck_id);
        $.getJSON(`${baseUrl}${deck.deck_id}/shuffle/`, res => {
            let shuffleDeck = res;
            console.log(shuffleDeck.deck_id);
            $.getJSON(`${baseUrl}${deck.deck_id}/draw/?count=1`, res => {
                let card = res;
                console.log(card.cards[0].value, "of", card.cards[0].suit)
            })
        })
    })

    // 2.
    $.getJSON(newDeckUrl, res => {
        $.getJSON(`${baseUrl}${res.deck_id}/shuffle/`, res => {
            let shuffleDeck = res;
            $.getJSON(`${baseUrl}${shuffleDeck.deck_id}/draw/?count=1`, card1 => {
                let {suit, value} = card1.cards[0];
                console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`)
                $.getJSON(`${baseUrl}${shuffleDeck.deck_id}/draw/?count=1`, card2 => {
                    let {suit, value} = card2.cards[0];
                    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`)
                })
            })
        })
    })

    // 3.
    let deck_id = null;
    $button = $("#draw");
    $cardArea = $('#cardArea')

    $.getJSON(newDeckUrl, res => {
        $.getJSON(`${baseUrl}${res.deck_id}/shuffle/`, res => {
            deck_id = res.deck_id;
            $button.show();
        })
    })

    $button.on("click", function() {
        $.getJSON(`${baseUrl}${deck_id}/draw/?count=1`, res => {
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
    })
});