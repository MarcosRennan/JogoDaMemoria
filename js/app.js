//declarações
let jogadas = 0;
let carta = $('.card');
let cartas = [...carta];
let cartasAbertas = [];
let pares = 0;
let deck = $('.deck');
let alerta = $('#alerta-vitoria');
let intervalo;
let mins = $('.mins');
let segs = $('.segs');
let segundos = 0;
let minutos = 0;

//embaralhar cartas
function embaralharCartas(){
    cartas = shuffle(cartas);
    for(var i=0; i<cartas.length; i++) {
        $(".deck").text = "";
        [].forEach.call(cartas, function(item) {
            $(".deck").append(item);
        });
    }
}
embaralharCartas();

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
//ouvinte de clique das cartas, e chamada das funções do jogo.
carta.click(function(evt){
    if (cartasAbertas.length < 2){
        $(evt.target).toggleClass('open show disabled');
        cartasAbertas.push($(evt.target));
    } 
    testarComb();
    aumentarJogadas();
    removerEstrela();
    removerEstrelaModal();
    tempo();   
    fimJogo();  
});
//função aumenta o numero de jogadas
function aumentarJogadas(){
    jogadas++;
    let vezjogadas = $('.moves');
    vezjogadas.text(jogadas);
}
//função para remover estrelas
function removerEstrela(){
    let estrelas = $('.estrela-tela');
    if(jogadas === 22 || jogadas === 28 || jogadas === 34 || jogadas === 40){
        $(estrelas[estrelas.length-1]).toggleClass('estrela-tela fa-star fa-star-o');
    }
}
function removerEstrelaModal(){
    let estrelas = $('.estrela-modal');
    if(jogadas === 22 || jogadas === 28 || jogadas === 34 || jogadas === 40){
        $(estrelas[estrelas.length-1]).toggleClass('estrela-modal fa-star fa-star-o');
    }
}
//restart de jogo
$('.fa-repeat').click(function(){
    location.reload();
});
//
function obterImagemCarta(carta){
    return carta[0].firstChild.nextSibling.classList[1];
}
//testar combinação das cartas
function testarComb(){
    if (cartasAbertas.length === 2){
        let carta1 = obterImagemCarta(cartasAbertas[0]);
        let carta2 = obterImagemCarta(cartasAbertas[1]);
        
        if (carta1 === carta2){
            combCorreta();  
              
        } else {
            combErrada();
        }
    }
    
}  
//se cartas forem iguais atribuir classe 'match disable'
function combCorreta(){
    for(let i=0; i<cartasAbertas.length; i++) {
        cartasAbertas[i].addClass('match disabled');
    }
    cartasAbertas = [];
    pares++; 
}
//desabilitar as cartas apos duas estarem abertas
function desabilitar(){
    for(let i=0; i<cartas.length; i++){
        $('.card').addClass('disabled'); 
    }
}
function habilitar(){
    for(let i=0; i<cartas.length; i++){
        $('.card').removeClass('disabled'); 
    }
}
//se cartas forem erradas retirar classes 'open show'
function combErrada(){
    for(let i=0; i<cartasAbertas.length; i++){
        cartasAbertas[i].addClass('erro');
    }
    desabilitar();
    setTimeout(function(){
        for(let i=0; i<cartasAbertas.length; i++){
            cartasAbertas[i].toggleClass('open show erro disabled');
        }
        cartasAbertas = [];
        habilitar();               
    }, 1000);
}
//tempo
function tempo() {
	if(jogadas == 1) {
		intervalo = setInterval(function() {
			segundos++;
			if(segundos == 60) {
				minutos++;
                segundos= 0;
                mins.text(minutos);
			}
			segs.text(segundos);
		}, 1000);
	}
}
//tela de dim de jogo
function fimJogo(){
    if (pares == 8){
        alerta.addClass('show');
        $('#reiniciar').click(function(){
            location.reload();
        });
        clearInterval(intervalo);
    } 
    
    let crono = `${minutos} mins ${segundos} segs`;
    $('#crono').text(crono);       
}
