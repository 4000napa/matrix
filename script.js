function randomIntNumber(min, max) {  // Uma função para gerar números aleatórios só pra facilitar o uso
    return Math.floor(Math.random()*(max-min)+min)
}

function createSymbol() { // gera um caractér aleatório do alfabeto certo, e aletorio
    return String.fromCharCode(0x30A0+randomIntNumber(0,95))  
}

function createSymbolHolder(Xpos,Ypos) { // cria um item de lista e guarda um caracter nele, item de lista é usado para organizar verticalmente o espaço
    var symbolholder = document.createElement("li") 
    var updatetime = randomIntNumber(550,1400) // gera um intervalo de tempo aleatorio

    function changeSymbol() { // função feita para mudar o simbolo dentro da item da lista
        symbolholder.innerText = createSymbol()    
    }

    symbolholder.id = Xpos.toString() + " " + Ypos.toString() // identificador unico de cada item da lista
    setInterval(changeSymbol, updatetime) // chama constantemente a função
    return symbolholder
}

function createColumn(Xpos) { // cria uma lista sem ordem usada como uma coluna na matrix
    var column = document.createElement("ul")
    for (var i=0;i<18;i++){
        column.append(createSymbolHolder(Xpos,i)) // enche (a lista com itens = a coluna com caracteres)
    }
    return column
}

function makeMatrix(){
    for (var i=0;i<48;i++){
        matrix.append(createColumn(i)) // MUITO CONFUSO IR ATRAS
    }
}

function blackLetters(Xpos, Ypos){ //só muda a cor da letra pra preto
    var letter = document.getElementById(Xpos.toString() + " " + Ypos.toString()) 
    letter.style.color = "black"
}

function greenLetters(Xpos, Ypos){ //só muda a cor da letra pra verde mais escuro
    var letter = document.getElementById(Xpos.toString() + " " + Ypos.toString())
    letter.style.color = "#2fd659"
    letter.textShadow = "none"
}

function firstgreenLetter(Xpos, Ypos){ //só muda a cor da letra pra verde mais claro 
    var letter = document.getElementById(Xpos.toString() + " " + Ypos.toString())
    letter.style.color = "lightgreen"
    letter.textShadow = "5 5 white" 
}


function rainDown(Xpos ,size ,velocity){ //faz o codigo verde "descer" em uma coluna
    for (var i=0;i<18;i++){ // muda a cor das letras para dar o efeito de "descer"
        setTimeout(firstgreenLetter ,velocity*(i+1) , Xpos, i) // primeira letra mais clara
        setTimeout(greenLetters ,velocity*(i+2) , Xpos, i) // outras letras do codigo verde mais escuro
        setTimeout(blackLetters ,size*velocity+(velocity*(i+1)), Xpos, i) // deixa tudo preto para recomeçar
    }
    function detect() { // função para detectar o fim do codigo verde e fazer ele descer denovo do topo
        for (var j=0;j<18;j++){
            letter = document.getElementById(Xpos.toString() + " " + j.toString())
            if (letter.style.color=="lightgreen"){
                return 0
            }
            else if (letter.style.color=="#2fd659"){
                return 0
            }
            else if (j==17 && letter.style.color=="black") {
                clearInterval(clock)
                rainDown(Xpos, size, velocity)
            }
        }
    }
    var clock = setInterval(detect,100) // variavel para repetir a função de detecção ate q o fim seja detectado
}

function realyrainDown(){ // função que inicia a queda em todas as colunas em tempos diferentes(aleatorios)
    for (var i=0;i<48;i++){
        for (var j=0;j<18;j++){ // primeiro deixa a tela preta
            var symbol = document.getElementById(i.toString() + " " + j.toString())
            symbol.style.color = "black" 
        }
    }
    for (var i=0;i<48;i++){
        var startpoint = randomIntNumber(1,8)*1000 // gera o tempo em que sera iniciado cada queda de coluna
        var size = randomIntNumber(4,12) // gera o tamanho da parte verde cada coluna
        var velocity = randomIntNumber(2,8)*100 // gera a velocidade de queda da coluna
        setTimeout(rainDown, startpoint, i, size, velocity)
    }
}

makeMatrix()
setTimeout(realyrainDown, 4000)
