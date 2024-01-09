document.addEventListener('DOMContentLoaded' , ()=>{
    const form = document.querySelector('.search-box');
    const input = form.querySelector('input[type="search"]');
    const resultContainer = document.querySelector('.results')
    const resultCount = document.querySelector('header p');

    form.addEventListener('submit', (event)=>{
        event.preventDefault(); 
        const searchTerm = input.value
        if (searchTerm) {
            serachWikiPedia(searchTerm)
        }
    })

    function serachWikiPedia(searchTerm) {
        const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=url&utf8=&format=json&origin=*&srlimit=500&srsearch=${encodeURIComponent(searchTerm)}`
        fetch(url).then(response => response.json()).then(data =>{
            displayResults(data.query.search)
        }).catch(error => alert('Error ' + error))
    }

    function displayResults(results){
        resultContainer.innerHTML = ''
        resultCount.textContent = `Results Count: ${results.length}`
        results.forEach(result => {
            const resultElemment = document.createElement('div')
            resultElemment.className = 'resulte'
            resultElemment.innerHTML = `
            <h3>${result.title}</h3>
            <p>${result.snippet}</p>
            <a href="https://en.wikipedia.org/?curid=${result.pageid}" target="_blank">Read More</a> 
            `
            resultContainer.appendChild(resultElemment)
        });
    }
})