function getMovie() {
    const btn = document.querySelector('.container .row .search');
    btn.addEventListener('click', function () {
        const input = document.querySelector('input');
        fetch(`https://www.omdbapi.com/?apikey=cbd04506&s=${input.value}`)
            .then(response => response.json())
            .then(response => {
                const val = response.Search;
                let output = '';
                val.forEach(v => output += getModal(v));
                document.querySelector('.container .movie-container').innerHTML = output;

                const modalButton = document.querySelectorAll('.modal-detail-button');

                modalButton.forEach(modal => {
                    modal.addEventListener('click', function () {
                        const imdbid = this.dataset.imdb;
                        fetch(`https://www.omdbapi.com/?apikey=cbd04506&i=${imdbid}`)
                            .then(res => res.json())
                            .then(res => document.querySelector('.modal-body').innerHTML = movieDetail(res))
                    })
                })
            }).catch(res => document.querySelector('.modal-body').innerHTML = res);
    })
    
    function getModal(v) {
        return `
                <div class="col-md-4 my-3">
                    <div class="card">
                        <img src="${v.Poster}" class="card-img-top">
                            <div class="card-body">
                            <h5 class="card-title">${v.Title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${v.Year}</h6>
                            <a href="#" class="modal-detail-button btn btn-primary" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdb="${v.imdbID}">Details</a>
                            </div>
                    </div>
                </div>
                `
    }

    function movieDetail(md) {
        return `
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-3">
                            <img src="${md.Poster}" class="img-fluid">
                        </div>
                        <div class="col-md">
                            <ul class="list-group">
                                <li class="list-group-item"><h4>${md.Title}</h4></li>
                                <li class="list-group-item"><strong>Director : ${md.Director}</strong></li>
                                <li class="list-group-item"><strong>Actors : ${md.Actors}</strong></li>
                                <li class="list-group-item"><strong>Writer : ${md.Writer}</strong></li>
                                <li class="list-group-item"><strong>Plot : ${md.Plot}</strong></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
    `
    }
}

getMovie()