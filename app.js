function getMovie() {
    /*
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
        */

       const btn = document.querySelector('.container .row .search');
        btn.addEventListener('click', async function () {
            const input = document.querySelector('input');

            const movies = await getMovies(input.value);
            updateUI(movies);
        })
    
        
    function getMovies(keyword) {
            return fetch(`https://www.omdbapi.com/?apikey=cbd04506&s=${keyword}`)
            .then(response => response.json())
            .then(response => response.Search)
        }
    
    
    // event binding

    document.addEventListener('click', async function (e) {
        if (e.target.classList.contains('modal-detail-button')) {
            const imdbid = e.target.dataset.imdb;
            const movDetail = await  getMovieDetail(imdbid);
            updateUIDetail(movDetail);
        }
    })
    
    function getMovieDetail(x) {
        return fetch(`https://www.omdbapi.com/?apikey=cbd04506&i=${x}`)
            .then(res => res.json())
            .then(res => {
                const modalBody = document.querySelector('.modal-body');
                modalBody.innerHTML = movieDetail(res)
            })
    }    

    function updateUIDetail(y) {
        const mDetail = movieDetail(y);
        document.querySelector('.modal-body').innerHTML = mDetail;
    }
    
    function updateUI(mov) {
        let output = '';
        mov.forEach(m => output += getModal(m));
        document.querySelector('.container .movie-container').innerHTML = output;
    }
    
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

    function movieDetail(y) {
        return `
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-3 my-auto">
                            <img src="${y.Poster}" class="img-fluid">
                        </div>
                        <div class="col-md">
                            <ul class="list-group">
                                <li class="list-group-item"><h4>${y.Title}</h4></li>
                                <li class="list-group-item"><strong>Director : ${y.Director}</strong></li>
                                <li class="list-group-item"><strong>Actors : ${y.Actors}</strong></li>
                                <li class="list-group-item"><strong>Writer : ${y.Writer}</strong></li>
                                <li class="list-group-item"><strong>Plot : ${y.Plot}</strong></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
    `
    }
}

getMovie()