function criaObjetos()
{
    class Funcionario
    {
        constructor(matricula, nome, funcao)
        {
            this.matricula = matricula;
            this.nome = nome;
            this.funcao = funcao;
        }

        getMatricula()
        {
            return this.matricula;
        }

        getNome()
        {
            return this.nome;
        }

        getFuncao()
        {
            return this.funcao;
        }
    }

    var funcionario1 = new Funcionario("111111", "Markus", "Cuidador");
    alert(`Funcionario 1:\nNúmero de Matricula: ${funcionario1.getMatricula()}\nNome: ${funcionario1.getNome()}\nFunção: ${funcionario1.getFuncao()}`);

    var funcionario2 = {}
    funcionario2["matricula"] = "222222";
    funcionario2["nome"] = "Connor";
    funcionario2["funcao"] = "Detetive";
    alert(`Funcionario 2:\nNúmero de Matricula: ${funcionario2.matricula}\nNome: ${funcionario2.nome}\nFunção: ${funcionario2.funcao}`);

    var funcionario3 =
    {
        matricula: "333333",
        nome: "Kara",
        funcao: "Doméstica"
    };
    alert(`Funcionario 3:\nNúmero de Matricula: ${funcionario3.matricula}\nNome: ${funcionario3.nome}\nFunção: ${funcionario3.funcao}`);
}