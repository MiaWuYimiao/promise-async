$(function() {
    let newDeckUrl = "https://deckofcardsapi.com/api/deck/new/";
    let baseUrl = "https://deckofcardsapi.com/api/deck/";


    /************* callback ****************/
    // 1.
    async function getACard() {
        let deck = await axios.get(newDeckUrl);
        await axios.get(`${baseUrl}${deck.data.deck_id}/shuffle/`)
        let card = await axios.get(`${baseUrl}${deck.data.deck_id}/draw/?count=1`)
        let {suit, value} = card.data.cards[0];
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`)
    }

    // 2.
    async function getTwoCard() {
        let deck = await axios.get(newDeckUrl);
        await axios.get(`${baseUrl}${deck.data.deck_id}/shuffle/`)
        let card1 = await axios.get(`${baseUrl}${deck.data.deck_id}/draw/?count=1`);
        let card2 = await axios.get(`${baseUrl}${deck.data.deck_id}/draw/?count=1`);
        [card1, card2].forEach(card => {
            let {suit, value} = card.data.cards[0];
            console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
        })
    }

    // 3.
    let deck_id = null;
    $button = $("#draw");
    $cardArea = $('#cardArea')
    async function setup() {
        let deck = await axios.get(newDeckUrl);
        await axios.get(`${baseUrl}${deck.data.deck_id}/shuffle/`);
        deck_id = deck.data.deck_id;
        $button.show();
    }

    $button.on("click", async function() {
        let card = await axios.get(`${baseUrl}${deck_id}/draw/?count=1`);
        let randomX = Math.random() * 40 - 20;
        let randomY = Math.random() * 40 - 20;
        let angle = Math.random() * 90 - 45;
        let {image} = card.data.cards[0];
        $cardArea.append(
            $('<img>', {
                src : image,
                css : {
                    transform : `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
                }
            })
        );
        if (card.data.remainind === 0) {
            $button.remove();
        }
    })
    setup();
});