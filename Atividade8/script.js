function Negocio() {
    let mediaIdades = 0;
    let maiorIdade = 0, menorIdade = 0;
    let qtdOtimo = 0, qtdBom = 0, qtdRegular = 0, qtdPessimo = 0;
    let sexoM = 0, sexoF = 0;

    let repet = 45;

    for (let i = 0; i < repet; i++) {
        let idade = prompt("Qual sua idade? (1 a 150)");
        mediaIdades += parseInt(idade);

        if (i==0)
            menorIdade = idade;

        if (idade > maiorIdade)
            maiorIdade = idade;
        if (idade < menorIdade)
            menorIdade = idade;

        let sexo = prompt("Qual o seu sexo? (M ou F)");
        if (sexo == 'M')
            sexoM += 1;
        if (sexo == 'F')
            sexoF += 1;

        let op = prompt("Qual sua opinião?\n4 - Ótimo\n3 - Bom\n2 - Regular\n1 - Péssimo")
        switch (op) {
            case '1':
                qtdPessimo += 1;
                break;
            case '2':
                qtdRegular += 1;
                break;
            case '3':
                qtdBom += 1;
                break;
            case '4':
                qtdOtimo += 1;
                break;
        }
    }

    alert(`Media das idades: ${mediaIdades/repet}`);
    alert(`Maior das idades: ${maiorIdade}`);
    alert(`Menor das idades: ${menorIdade}`);
    alert(`Quantidade de Péssimos: ${qtdPessimo}`);
    alert(`Porcentagem Ótimo/Bom: ${((qtdBom+qtdOtimo)/repet)*100}%`);
    alert(`Quantidade de Homens: ${sexoM}`);
    alert(`Quantidade de Mulheres: ${sexoF}`);
}