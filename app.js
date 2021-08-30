// RULES POPUP

$('.rules-button').click(() => {
    $('.rules-popup').css({'display': 'flex'});
    $('.shader').css({'display': 'block'});
});

$('.exit-popup').click(() => {
    $('.rules-popup').css({'display': 'none'});
    $('.shader').css({'display': 'none'});
});

// NEXT SECTION

const choices = ['paper-container', 'scissors-container', 'rock-container'];

let userPick = '';
let computerPick = choices[Math.floor(Math.random() * choices.length)];
let currentScore = 0;
const paperHTML = `<div class="paper-container icon-container">
<img src="images/icon-paper.svg" alt="paper" />
</div>`;
const scissorsHTML = `<div class="scissors-container icon-container">
<img src="images/icon-scissors.svg" alt="scissors" />
</div>`;
const rockHTML = `<div class="rock-container icon-container">
<img src="images/icon-rock.svg" alt="rock" />
</div>`;

$('.icon-container').click(e => {
    $('.triangle').css({'opacity': '0'});
    let firstClass = $(e.target).prop("classList")[0];
    userPick = firstClass;
    $('.icon-container:not(.' + firstClass + ')').css({'opacity': '0'});
    $('.' + firstClass).css({'transform': 'scale(1.5)'});
    setTimeout(() => {
        let currentWinner = findWinner(userPick, computerPick);
        $('.select-object').css({'display': 'none'});
        $('.result').css({'display': 'flex'});
        $('.user-pick').html(`<h2 class="user-pick-title">YOU PICKED</h2>
        ${userPick === 'paper-container' ? paperHTML : userPick === 'scissors-container' ? scissorsHTML : rockHTML}`);
        $('.computer-pick').html(`<h2 class="computer-pick-title">THE HOUSE PICKED</h2>
        ${computerPick === 'paper-container' ? paperHTML : computerPick === 'scissors-container' ? scissorsHTML : rockHTML}`);
        $('.icon-container').css({'position': 'static', 'transform': 'scale(1.75)', 'margin-top': '135px'});
        $('.verdict').text(currentWinner == 'user' ? 'YOU WIN' : currentWinner == 'computer' ? 'YOU LOSE' : 'YOU TIED');
        currentWinner == 'user' && currentScore++;
        $('.score').text(currentScore);

        if (currentWinner == 'computer') {
            $('.outer-ring').css({'left': '788px'});
        }

        else if (currentWinner == 'tie') {
            $('.outer-ring').css({'display': 'none'});
        }

        else {
            $('.outer-ring').css({'left': '35px'});
        }

        $('.inner-ring').css({'background-color': 'rgba(255, 255, 255, 0.025)'});
        setTimeout(() => {
            $('.middle-ring').css({'background-color': 'rgba(255, 255, 255, 0.025)'});
        }, 100);
        setTimeout(() => {
            $('.outer-ring').css({'background-color': 'rgba(255, 255, 255, 0.025)'});
        }, 200);
    }, 750);
});

$('.play-again-button').click(() => {
    $('.select-object').css({'display': 'flex'});
    $('.result').css({'display': 'none'});
    userPick = '';
    computerPick = choices[Math.floor(Math.random() * choices.length)];
    $('.icon-container').css({'opacity': '1', 'transform': 'scale(1)', 'position': 'absolute', 'margin-top': 'initial'});
    $('.triangle').css({'opacity': '1'});
    $('.inner-ring').css({'background-color': 'rgba(255, 255, 255, 0)'});
    $('.middle-ring').css({'background-color': 'rgba(255, 255, 255, 0)'});
    $('.outer-ring').css({'background-color': 'rgba(255, 255, 255, 0)', 'display': 'flex'});
});

function findWinner(user, computer) {
    let winner = '';
    
    if (user == 'paper-container') {
        if (computer == 'scissors-container') {
            winner = 'computer';
        }
        else if (computer == 'rock-container') {
            winner = 'user';
        }
        else {
            winner = 'tie';
        }
    }

    else if (user == 'scissors-container') {
        if (computer == 'paper-container') {
            winner = 'user';
        }
        else if (computer == 'rock-container') {
            winner = 'computer';
        }
        else {
            winner = 'tie';
        }
    }

    else if (user == 'rock-container') {
        if (computer == 'scissors-container') {
            winner = 'user';
        }
        else if (computer == 'paper-container') {
            winner = 'computer';
        }
        else {
            winner = 'tie';
        }
    }

    return winner;
}