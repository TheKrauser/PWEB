function RetornaMaior(n1, n2, n3) {
    let maior = n1;

    if (n2 > maior)
        maior = n2;

    if (n3 > maior)
        maior = n3;

    alert(maior);
}

function RetornaOrdemCrescente(n1, n2, n3) {
    let nums = [n1, n2, n3]

    let saida = ""
    nums.sort();
    for(let i=0; i<nums.length; i++)
    {
        saida += nums[i] + " ";
    }

    alert(`${saida}`)
}

function Palindromo(frase) {
    let t = frase.toUpperCase();
    let reverse = t.split("").reverse().join("");

    alert(t);
    alert(reverse);

    if (t == reverse)
        alert(`É Palindromo!`);
    else
        alert(`Não é Palindromo!`);
}

function FormaTriangulo(v1, v2, v3) {
    
}