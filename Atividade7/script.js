class Escolha {
    constructor(name, win, lose) {
        this.name = name;
        this.win = win;
        this.lose = lose;
    }

    getName() {
        return this.name;
    }

    getWin() {
        return this.win
    }

    getLose() {
        return this.lose
    }

    checkWin(oponente) {
        if (oponente.getLose() == this.getName()) {
            return 1;
        }
        else if (oponente.getWin() == this.getName()) {
            return -1;
        }
        else {
            return 0;
        }
    }
}

function Jokenpo() {
    pedra = new Escolha("Pedra", "Tesoura", "Papel");
    papel = new Escolha("Papel", "Pedra", "Tesoura");
    tesoura = new Escolha("Tesoura", "Papel", "Pedra");

    var escolha = "";

    var t = Number(prompt("Vamos jogar Jokenpo!\n1 - Pedra\n2 - Papel\n3 - Tesoura"));

    switch (t) {
        case 1:
            escolha = pedra;
            break;

        case 2:
            escolha = papel;
            break;

        case 3:
            escolha = tesoura
            break;

        default:
            alert("Numero inválido!");
    }

    alert("Voce escolheu: " + escolha.getName())

    rand = Math.random();
    var ia = rand <= 0.33 ? pedra : (rand <= 0.66 ? papel : tesoura);
    alert("Computador escolheu: " + ia.getName());

    setTimeout(function () {
        switch (escolha.checkWin(ia)) {
            case 1:
                alert("GANHOU!!!!");
                break;
            case -1:
                alert("PERDEU!!!!");
                break;
            case 0:
                alert("EMPATOU!!!!");
                break;
        }
    }, 1000);
}