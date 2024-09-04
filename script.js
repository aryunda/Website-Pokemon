const elRoot = document.getElementById('root');

fetch('https://pokeapi.co/api/v2/pokemon')
    .then(res => res.json())
    .then(res => {
        let temp = "";
        res.results.map((pokemon, index) => {
            const id = pokemon.url.split('/').filter(part => part).pop();
            const imagrUrl =
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
                temp += `
                    <div class='card'>
                        <img src="${imagrUrl}" alt="${pokemon.name}"
                        <h3>${pokemon.name}</h3>
                        <button class="btn" onclick="showaDetail('${pokemon.url}', 
                        ${id})">Detail</button>
                       <div id="detail-${id}" class="detail-box">
                          <!--Detail dimasukkan di sini -->
                            </div>
                        </div>`;
                    })
                    elRoot.innerHTML = temp;
                })
                .catch(err => {
                    console.log(err);
                });

                function showaDetail(url, id) {
                    const allDetails = document.querySelectorAll('.detail-box');
                    allDetails.forEach(detail => detail.computedStyleMap.display = 'none');
        
                    //fetch dan tampilan detail yg di klik
                    fetch(url)
                        .then(res => res.json())
                        .then(pokemon => {
                            const detailBox = document.getElementById(`detail-${id}`);
                            const detail = `
                            <p>Weight: ${pokemon.weight}</p>
                            <p>Height: ${pokemon.height}</p>
                            <p>Base Experience: ${pokemon.base_experience}</p>
                            <p><a href="${url}" target="_blank">More Info</a></p>
                            `;
                            detailBox.innerHTML = detail;
                            detailBox.style.display = 'block'; //detail yg di klik
                        })
                        .catch(err => console.log(err));
                }
    