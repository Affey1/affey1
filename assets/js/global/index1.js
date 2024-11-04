document.addEventListener('DOMContentLoaded', function() {
    // Recupera a cor de fundo armazenada
    const savedColor = localStorage.getItem('backgroundColor');
    if (savedColor) {
        document.body.style.backgroundColor = savedColor; // Aplica a cor de fundo
    }

    // Elementos do poema
    const poemDisplay = document.getElementById('poemDisplay');
    const poemTitleElement = document.getElementById('poemTitle'); // Elemento do título do poema

    // Títulos e poemas correspondentes a cada estação
    const poemTitles = [
        "Inverno Sereno",    // Inverno
        "Outono Místico",    // Outono
        "Primavera Radiante", // Primavera
        "Verão Ensolarado"   // Verão
    ];

    const poems = [
        "No inverno, a neve cai, silêncio profundo, a natureza dorme, sonha em um novo mundo.", // Inverno
        "As folhas secam e caem, o vento leva tudo, é tempo de reflexão, no outono mudo.", // Outono
        "As flores nascem, a vida renasce, primavera é o tempo, onde o amor se faz.", // Primavera
        "O sol brilha forte, a praia é chamada, no verão tudo é festa, a alegria é sagrada." // Verão
    ];

    // Recupera a estação selecionada
    const selectedSeason = localStorage.getItem('selectedSeason');
    if (selectedSeason !== null) {
        // Exibe o título e o poema correspondentes
        poemTitleElement.innerText = poemTitles[selectedSeason];
        poemDisplay.innerText = poems[selectedSeason];

        // Define as cores correspondentes
        const colors = [
            '#87CEFA', // Inverno
            '#FFDEAD', // Outono
            '#98FB98', // Primavera
            '#FDFD96'  // Verão
        ];
        
        // Aplica a cor de fundo correspondente à estação
        document.body.style.backgroundColor = colors[selectedSeason];
        
        // Armazena a cor de fundo no localStorage
        localStorage.setItem('backgroundColor', colors[selectedSeason]);
    }
});
