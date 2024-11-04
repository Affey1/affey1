const slider = document.getElementById('slider');
const sliderImage = document.getElementById('sliderImage');
const body = document.body;
const redirectButton = document.getElementById('redirectButton');
const markers = document.querySelectorAll('.marker');

// Cores correspondentes a cada posição (estação do ano)
const colors = [
    '#87CEFA', // Inverno (azul claro)
    '#FFDEAD', // Outono (bege)
    '#98FB98', // Primavera (verde claro)
    '#FDFD96'  // Verão (amarelo)
];

// Imagens correspondentes a cada posição
const images = [
    'assets/images/inverno.png', 
    'assets/images/outono.png', 
    'assets/images/primavera.png', 
    'assets/images/verão.png'
];

const sliderWidth = 90; // Ajuste para o tamanho do seu slider
const spaceBetweenMarkers = 95; // Ajuste se necessário

let currentIndex = 0; // Índice da estação selecionada
let isDragging = false; // Flag para arrastar o slider

// Função para mover o slider para o marcador mais próximo
function moveSliderToClosestMarker(position) {
    const index = Math.round((position + (sliderWidth / 2)) / spaceBetweenMarkers); // Cálculo do índice com base na posição

    if (index >= 0 && index < colors.length) {
        // Altera a cor de fundo e a imagem
        body.style.backgroundColor = colors[index];
        sliderImage.src = images[index];
        
        // Atualiza o índice atual
        currentIndex = index;

        // Move o slider
        slider.style.left = `${index * spaceBetweenMarkers}px`; // Move o slider para a posição correta
    }
}

// Função para interpolar entre duas cores
function interpolateColor(color1, color2, factor) {
    const result = color1.slice(1).match(/.{1,2}/g).map((hex, i) => {
        const val1 = parseInt(hex, 16);
        const val2 = parseInt(color2.slice(1).match(/.{1,2}/g)[i], 16);
        const interpolated = Math.round(val1 + (val2 - val1) * factor);
        return interpolated.toString(16).padStart(2, '0'); // Garante que o valor hexadecimal tenha 2 dígitos
    });
    return `#${result.join('')}`; // Retorna a cor interpolada em formato hexadecimal
}

// Adiciona evento de clique para cada marcador
markers.forEach((marker, index) => {
    marker.addEventListener('click', () => {
        const markerPosition = index * spaceBetweenMarkers; // Calcula a posição do marcador
        moveSliderToClosestMarker(markerPosition); // Move o slider para a posição do marcador
    });
});

// Função para arrastar o slider
function dragSlider(e) {
    e.preventDefault(); // Previne o comportamento padrão
    const toggleRect = slider.parentNode.getBoundingClientRect(); // Tamanho do contêiner do slider
    const maxLeft = toggleRect.width - sliderWidth; // Limite máximo à direita

    let newLeft = e.clientX - toggleRect.left - (sliderWidth / 2); // Posição do mouse ajustada pelo centro do slider
    newLeft = Math.max(0, Math.min(newLeft, maxLeft)); // Limita a nova posição entre 0 e maxLeft

    // Atualiza a posição do slider
    slider.style.left = `${newLeft}px`; // Move o slider para a nova posição

    // Interpolar cores enquanto arrasta
    const index1 = Math.floor(newLeft / spaceBetweenMarkers);
    const index2 = Math.min(index1 + 1, colors.length - 1);
    const factor = (newLeft % spaceBetweenMarkers) / spaceBetweenMarkers;

    const interpolatedColor = interpolateColor(colors[index1], colors[index2], factor);
    body.style.backgroundColor = interpolatedColor; // Atualiza a cor de fundo
}

// Eventos para arrastar o slider
slider.addEventListener('mousedown', (e) => {
    isDragging = true; // Começa a arrastar

    const mouseMoveHandler = (e) => {
        if (isDragging) {
            dragSlider(e); // Segue o mouse
        }
    };

    const mouseUpHandler = () => {
        isDragging = false; // Para de arrastar
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);

        // Gruda no marcador mais próximo ao soltar o botão do mouse
        const toggleRect = slider.parentNode.getBoundingClientRect();
        const currentLeft = parseInt(slider.style.left); // Posição atual do slider
        moveSliderToClosestMarker(currentLeft); // Move o slider para o marcador mais próximo
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
});

// Evento de clique no botão de redirecionamento
redirectButton.addEventListener('click', function() {
    localStorage.setItem('selectedSeason', currentIndex); // Armazena a estação selecionada
    window.location.href = 'index1.html'; // Redireciona para a nova página
});

// Inicializa a posição do slider
moveSliderToClosestMarker(0); // Coloca o slider na posição inicial
