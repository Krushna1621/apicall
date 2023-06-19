import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
     const[movies,setMovies]=useState([])
     const[isLoading,setIsLoading]=useState(false)
     const[error,setError]=useState(null)
     async function fetchMovieshandler(){
      setIsLoading(true)
      setError(null)
      try{
        const response= await fetch('https://swapi.dev/api/film/')
        if(!response.ok){
          throw new Error('Something went wrong ....Retrying')
        }
        const data=await response.json();
        
       
        
             const transformedMovies=data.results.map((movieData)=>{
                  return{
                   id:movieData.episode_id,
                   title:movieData.title,
                   openingText:movieData.opening_crawl,
                   releaseDate:movieData.release_date
                  }
             }) 
             setMovies(transformedMovies);
             setIsLoading(false)
      }catch(error){
            setError(error.message)
      }
      setIsLoading(false)
        
    }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieshandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length>0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error &&<p>Found No Movies.</p>}
        {isLoading &&<p>Loading....</p>}
        {!isLoading&&error&&<p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
