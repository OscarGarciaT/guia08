var select = document.getElementsByTagName('select')[0];

const cargarDatos = () => {
    alert("Se han cargado los datos");
}

const fetchEscritores = async () => {
    try {
        let response = await fetch('https://dataserverdaw.herokuapp.com/escritores/xml');
        let data = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "application/xml");
        let escritores = xml.getElementsByTagName('escritor')
        

        for(let escritor of escritores){
            let option = document.createElement('option')
            let nombre = escritor.querySelector('nombre').textContent
            let id = escritor.querySelector('id').textContent
            option.textContent = nombre
            option.setAttribute('value',id)
            select.appendChild(option)
        }
    } catch (err) {
        console.error(err);
    }
}

const fetchFrases = async (escritorId, escritorNombre) => {
    try {
        var frasesDiv = document.getElementById('frases')
        frasesDiv.innerHTML = '';
        let response = await fetch('https://dataserverdaw.herokuapp.com/escritores/frases');
        let data = await response.json();

        const frasesById = data.frases.filter(frase => frase.id_autor == escritorId);

        for( frase of frasesById ) {
            let plantilla = `<div class="col-lg-3">
                                <div class="test-inner ">
                                    <div class="test-author-thumb d-flex">
                                        <div class="test-author-info">
                                            <h4>${escritorNombre}</h4>                                            
                                        </div>
                                    </div>
                                    <span>${frase.texto}</span>
                                    <i class="fa fa-quote-right"></i>
                                </div>
                            </div>`

            frasesDiv.innerHTML += plantilla
        }

    } catch (err) {
        console.error("Fetch err".repeat(10),err,"Fetch err".repeat(10))
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    fetchEscritores();
});

select.addEventListener('change', (event) => {
    const escritorId = event.target.value;
    const escritorNombre = event.target.options[event.target.selectedIndex].text;
    fetchFrases(escritorId, escritorNombre);
})


