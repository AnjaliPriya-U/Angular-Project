export module Constant {
    const key='bf94fcf9e88fdaef636745da07dda5eb' 
    const baseUrl: String = 'https://api.themoviedb.org/3/movie/latest?api_key='+key+'&language=en-US';
    export const getEndpoint: String = `${baseUrl}`;  
    export const k='bf94fcf9e88fdaef636745da07dda5eb' 
    export const getDetails:String='https://api.themoviedb.org/3/movie/' 
    export const getLatest:String='https://api.themoviedb.org/3/discover/movie?api_key='+key+'&language=en-US';
    export const getNowPlaying:String='https://api.themoviedb.org/3/movie/now_playing?api_key='+key+'&language=en-US'
    export const getPopular:String='https://api.themoviedb.org/3/movie/popular?api_key='+key+'&language=en-US'
    export const getUpcoming:String='https://api.themoviedb.org/3/movie/upcoming?api_key='+key+'&language=en-US' 
    export const getSearchMovie:String='https://api.themoviedb.org/3/search/movie?api_key='+key+'&query='
    
    export const book:String='http://localhost:3000/bookings/'
  }