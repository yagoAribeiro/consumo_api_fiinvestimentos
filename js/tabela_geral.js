"use strict"

import {Calculos} from "./calculos.js"


let fii_user = [];
let fii_table = [];

async function carregarDadosUser(url){
    await fetch(url)
            .then(resp => resp.json())
            .then(json => fii_user = json);
            //Carregou os dados do JSON e armazenou no vetor fii_user
            console.log(fii_user)
    carregarDadosFundos();
}

async function carregarDadosFundos(){
    
    for (let fii of fii_user){
        let json = await fetch(`https://api-simple-flask.herokuapp.com/api/${fii.nome}`)
                        .then(resp => resp.json());
                        //Carregou os dados do site de acordo com os valores armazenados no vetor fii_user que se originou de outro JSON
        fii_table.push(json);  
        //JSON que iremos trabalhar, armazenado no vetor fii_table
    }
    exibirTabela();
}



//json intero é fii_user
//json externo(do site) é fii_table

carregarDadosUser("json/fii.json");

function exibirTabela(){ 
    //Para cada fundo do vetor fii_user
    fii_user.forEach((element)=>{
        //Pegue o objeto de informação correspondente à esse fundo
        let fii_informacao = fii_table.find((objeto) => objeto.fundo.indexOf(element.nome.toUpperCase())!=-1)
        //Pegue os dois objetos e retorne o vetor dos cálculos referentes à esse fundo

        /*Atenção pessoal da tabela! Essa variável aqui em baixo contém um objeto com o resultado de todos
        os cálculos respectivos ao fundo no laço de repetição!
        O objeto possuí atributos com nomes para cada cálculo que foi pedido
        Acessem cada informação correspondente para colocar na tabela: Exemplo: fii_calculos.valorProvento(é o valor do provento!)
        Para verem os nomes vcs podem dar uma olhada lá no arquivo calculos.js*/

        let fii_calculos = new Calculos(element, fii_informacao)

        

        /**prints só para testes */
        console.log(element)
        console.log(fii_informacao)
        console.log(fii_calculos)
        /**Exemplo de como pegar um cálculo do objeto que criei: */
        console.log(fii_calculos.precoMedio)

        /**--------------- */
        console.log("fim-elemento")
        
    })
    
 
    /*
    Fora do for, adicione na tabela a linha final de total conforme exemplo no PDF.
    */    
}