import { movies } from '../modules/db.js'
let promoImg = document.querySelectorAll('.promo__adv img')
let promo__bg = document.querySelector('.promo__bg')
let promo__genre = document.querySelectorAll('.promo__genre')
let promo__title = document.querySelectorAll('.promo__title')
let promo__descr = document.querySelectorAll('.promo__descr')
let promo__ratings = document.querySelectorAll(".promo__ratings span")
let search = document.querySelector('#search')
let search_im = document.querySelector('#search')
let ul = document.querySelector('.promo__interactive-list')
let ulGenres = document.querySelector('.promo__menu-list ul')
let rating = document.querySelector('.rating')
let ratingActive = rating.querySelector('.rating_active')
let close_text = document.querySelector('.close_text')
let moviesArr = movies

let arr_GENRES = ['all']



promoImg.forEach((img) => {
    img.remove(img)
})


search_im.onclick = () => {
    console.log('aa');
    let { value } = search
    value = value.toLowerCase().trim()

    let filtered = moviesArr.filter(item => {
        let { Title } = item
        Title = Title.toLowerCase().trim()

        if (Title.includes(value)) {
            return item
        }
    })


    reload(filtered)
}

const reload = (arr) => {
    ul.innerHTML = ""
    showMovie(arr[0])

    arr.forEach((item, index) => {
        let span = document.createElement('span')

        let li = document.createElement('li')
        let delet = document.createElement('div')

        li.classList.add('promo__interactive-item')

        span.innerHTML = `${index + 1}.${item.Title}`
        span.style.cursor = 'pointer'
        delet.classList.add('delete')

        ul.append(li)
        li.append(span, delet)

        // functions
        span.onclick = () => {
            showWindow(item)
            showMovie(item)
        }
        delet.onclick = () => {
            moviesArr = moviesArr.filter(film => film.ID !== item.ID)

            reload(moviesArr)
        }
        close_text.onclick = () => {
            closeMovie()
        }

        arr_GENRES.push(item.Genre)

    })
}

let window = document.querySelector('.window')
let widow_right = document.querySelector('.widow_right')
let window_bg = document.querySelector('.window_bg')


const showMovie = (movie) => {

    promo__bg.style.background = `url(${movie.Poster}) center center/cover`
    promo__genre[0].innerHTML = movie.Genre
    promo__title[0].innerHTML = movie.Title
    promo__descr[0].innerHTML = movie.Plot
    promo__ratings[0].innerHTML = `IMDb: ${movie.imdbRating}`
    promo__ratings[1].innerHTML = `Кинопоиск: ${movie.Metascore}`

}

const showWindow = (movie) => {
    widow_right.style.background = `url(${movie.Poster}) center center/cover`

    promo__genre[1].innerHTML = movie.Genre
    promo__title[1].innerHTML = movie.Title
    promo__descr[1].innerHTML = movie.Plot

    window_bg.style.display = 'block'
    window.style.left = '50%'
    window.style.opacity = '1'
    setTimeout(() => {
        promo__genre[1].style.opacity = '1'
    }, 300);
    setTimeout(() => {
        promo__title[1].style.opacity = '1'
    }, 500);
    setTimeout(() => {
        promo__descr[1].style.opacity = '1'
    }, 700);
    setTimeout(() => {
        promo__ratings[2].style.opacity = '1'
        promo__ratings[3].style.opacity = '1'
    }, 900);
    setRating(movie.imdbRating)
}

const closeMovie = () => {
    window_bg.style.display = 'none'
    window.style.left = '100%'
    window.style.opacity = '0'
    setTimeout(() => {
        window.style.left = '-100%'
    }, 200);
    promo__genre[1].style.opacity = '0'
    promo__title[1].style.opacity = '0'
    promo__descr[1].style.opacity = '0'
    promo__ratings[2].style.opacity = '0'
    promo__ratings[3].style.opacity = '0'
}

function setRating(ratingValue) {
    let percent = (ratingValue / 10 * 100).toFixed(0);
    ratingActive.style.width = `${percent}%`
}



const createGenres = (arr) => {

    ulGenres.innerHTML = "" 
    for (let item of arr) {
        let li = document.createElement('li')
        let a = document.createElement('a')

        
        a.classList.add('promo__menu-item')
        a.href = "#"
        
        a.innerHTML = item
        
        
        li.append(a)
        ulGenres.append(li)
        
        
        if (arr.indexOf(item) === 0) {
            a.classList.add('promo__menu-item_active')
        }

        a.onclick = () => {
           
            let ass = a.innerHTML

            ass = ass.toLowerCase().trim()

            console.log(ass);

            let filtered = movies.filter(item => {

                let { Genre } = item

                Genre = Genre.toLowerCase().trim()

                if (Genre.includes(ass)) {

                    return item

                } 
                
            })

            console.log(filtered);


            reload(filtered)


        }
            li.onclick = () => {

                console.log(ulGenres);
                
                ulGenres.childNodes.forEach(elem => elem.firstChild.classList.remove('promo__menu-item_active'))
                
                li.firstChild.classList.add('promo__menu-item_active')
        
                let filtered = movies.filter(elem => {
                
                    let genre = elem.Genre.toLowerCase()
                
                    if (item.toLowerCase() === genre) {
                
                        return elem
                
                    } else if (item.toLowerCase() === 'all') {
                
                        reload(movies)
                
                    }
                
                })
        
                if (filtered.length > 0) reload(filtered)
            }

    }
}

reload(movies)

reload(moviesArr)

arr_GENRES = [...new Set(arr_GENRES)]

createGenres(arr_GENRES)