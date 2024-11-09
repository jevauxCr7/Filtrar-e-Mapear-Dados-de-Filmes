async function buscarFilmes() {
    const titulo = document.getElementById("titulo").value.trim();
    const resultadoDiv = document.getElementById("resultado");

    if (!titulo) {
        resultadoDiv.innerText = "Por favor, insira o título de um filme.";
        return;
    }

    try {
        const response = await fetch(`https://www.omdbapi.com/?s=${titulo}&apikey=SUA_API_KEY`);
        if (!response.ok) throw new Error("Erro ao acessar a API");
        
        const data = await response.json();
        
        if (data.Response === "False") {
            resultadoDiv.innerText = "Filme não encontrado.";
            return;
        }

        // Filtrar filmes
        const filmesFiltrados = data.Search
            .filter(filme => parseInt(filme.Year) > 2000)
            .map(filme => ({
                titulo: filme.Title,
                ano: filme.Year,
                diretor: "N/A"
            }));
        
        // resultados
        resultadoDiv.innerHTML = "<h3>Filmes Encontrados:</h3>";
        filmesFiltrados.forEach(filme => {
            const filmeInfo = document.createElement("p");
            filmeInfo.innerHTML = `<strong>Título:</strong> ${filme.titulo} <br>
                                   <strong>Ano:</strong> ${filme.ano} <br>
                                   <strong>Diretor:</strong> ${filme.diretor}`;
            resultadoDiv.appendChild(filmeInfo);
        });
    } catch (error) {
        resultadoDiv.innerText = "Erro ao buscar os filmes. Verifique se o título está correto.";
    }
}
