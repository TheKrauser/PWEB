class Retangulo
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    calculaArea()
    {
        return this.x * this.y;
    }
}

function criaObjeto()
{
    let base = prompt("Digite a base do retângulo");
    let altura = prompt("Digite a altura do retângulo");
    var retangulo = new Retangulo(base, altura);
    alert(`Os valores do retangulo são:\nX = ${retangulo.x}\nY = ${retangulo.y}`);

    alert(`A area do triangulo é: ${retangulo.calculaArea()}`);
}

function criaConta()
{
    alert("Criando conta corrente!")
    let nomeCorrentista = prompt("Digite o seu nome")
    let nomeBanco = prompt("Digite o nome do banco")
    var corrente = new ContaCorrente(nomeCorrentista, nomeBanco);
    corrente.setNumConta(nConta);
    nConta++;
    corrente.setSaldo(100);
    corrente.setSaldoEspecial(200);

    alert("Criando conta poupança!");
    nomeCorrentista = prompt("Digite o seu nome");
    nomeBanco = prompt("Digite o nome do banco");
    let juros = prompt("Informe os juros");
    let dataVencimento = prompt("Informe a data de vencimento");
    var poupanca = new ContaPoupanca(nomeCorrentista, nomeBanco, juros, dataVencimento);
    poupanca.setNumConta(nConta);
    nConta++;
    poupanca.setSaldo(1000);

    alert(`CONTA CORRENTE\n\n\n\nNome Correntista: ${corrente.getNomeCorrentista()}\nNome Banco: ${corrente.getNomeBanco()}\nNumero da Conta: ${corrente.getNumConta()}\nSaldo: ${corrente.getSaldo()}\nSaldo Especial: ${corrente.getSaldoEspecial()}`);

    alert(`CONTA POUPANÇA\n\n\n\nNome Correntista: ${poupanca.getNomeCorrentista()}\nNome Banco: ${poupanca.getNomeBanco()}\nNumero da Conta: ${poupanca.getNumConta()}\nSaldo: ${poupanca.getSaldo()}\nJuros: ${poupanca.getJuros()}\nData Vencimento: ${poupanca.getDataVencimento()}`);
}

let nConta = 1;

class Conta
{
    constructor(nomeCorrentista, nomeBanco)
    {
        this.nomeCorrentista = nomeCorrentista;
        this.nomeBanco = nomeBanco;
    }

    getNomeCorrentista()
    {
        return this.nomeCorrentista;
    }

    getNomeBanco()
    {
        return this.nomeBanco;
    }

    getNumConta()
    {
        return this.numConta;
    }

    getSaldo()
    {
        return this.saldo;
    }

    setNumConta(numConta)
    {
        this.numConta = numConta;
    }

    setSaldo(saldo)
    {
        this.saldo = saldo;
    }
}

class ContaCorrente extends Conta
{
    constructor(nomeCorrentista, nomeBanco)
    {
        super(nomeCorrentista, nomeBanco);
    }

    setSaldoEspecial(saldoEspecial)
    {
        this.saldoEspecial = saldoEspecial;
    }

    getSaldoEspecial()
    {
        return this.saldoEspecial;
    }
}

class ContaPoupanca extends Conta
{
    constructor(nomeCorrentista, nomeBanco, juros, dataVencimento)
    {
        super(nomeCorrentista, nomeBanco);
        this.juros = juros;
        this.dataVencimento = dataVencimento;
    }

    getJuros()
    {
        return this.juros;
    }

    getDataVencimento()
    {
        return this.dataVencimento;
    }
}