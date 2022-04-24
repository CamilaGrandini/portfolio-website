function searchMovie(query) {
    const url = `https://imdb8.p.rapidapi.com/auto-complete?q=${query}`;
    fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "imdb8.p.rapidapi.com",
            "x-rapidapi-key": "ce8d8e3d06mshb67a9c3ef08138cp1c1557jsnf3c790a086b2"
        }
    })
        .then(response => response.json())
        .then(data => {
            const list = data.d;

            document.querySelector('.movies').innerHTML = "";

            list.map(function (item, index, object) {
                if (item.q == null) {
                    object.splice(index, 1)
                } else {
                    const name = item.l;
                    const poster = item.i.imageUrl;
                    const movie = `<li><img src="${poster}"> <h2>${name}</h2></li>`
                    document.querySelector('.movies').innerHTML += movie;
                }

            })

            console.log(data);
            document.getElementById("errorMessage").innerHTML = "";
        })
        .catch(err => {
            document.getElementById("errorMessage").innerHTML = err;
            console.error(err);
        });
}

let searchTimeoutToken = 0;
window.onload = () => {
    const searchFieldElement = document.getElementById("searchBar");
    searchFieldElement.onkeyup = (event) => {

        clearTimeout(searchTimeoutToken);

        if (searchFieldElement.value.trim().length === 0) {
            return;
        }

        //this is time out is so the user can finish writing on the search bar and then
        //it can be searched, in order to no get a lot of requests
        searchTimeoutToken = setTimeout(() => {
            searchMovie(searchFieldElement.value);
        }, 250);

    };
}

