function Receber() {
    var nome = prompt("Digite o seu nome");
    var media1 = parseFloat(prompt("Digite a Media 1"));
    var media2 = parseFloat(prompt("Digite a Media 2"));
    var media3 = parseFloat(prompt("Digite a Media 3"));
    var media4 = parseFloat(prompt("Digite a Media 4"));

    var aritmetica = (media1 + media2 + media3 + media4) / 4;
    alert(`A media aritmetica é: ${aritmetica}`);
}