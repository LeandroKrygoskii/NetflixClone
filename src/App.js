import React, {useEffect , useState} from 'react';
import Tmdb from './services/tmdb';
import MovieRow from './components/MovieRow';
import './App.css';
import FilmeDestaque from './components/FilmeEmDestaque';
import tmdb from './services/tmdb';
import Header from './components/Header';

export default function App(){


  const [moviesList , setMoviesList]=useState([]);
  const [featuredData, setFeaturedData] = useState(moviesList[0]);
  const [blackHeader, setBlackHeader]= useState(false);

  useEffect(()=>{
    const loadAll= async () =>{
       //Pegando a lista toda
       let list = await Tmdb.getHomeList();
       setMoviesList(list);

       //Pegando o filme Destaque
       let originals = list.filter(i=>i.slug==='originals'); // só pega os items do array list que forem igual a SLUG: originals, unsando o método filter do js
       let randomChosen= Math.floor(Math.random() * (originals[0].items.results.length -1));
       let chosen = originals[0].items.results[randomChosen];
       let chosenInfo = await tmdb.getMovieInfo(chosen.id , 'tv');

       setFeaturedData(chosenInfo);
        
    }

    loadAll();

  },[])
  
  useEffect(()=>{
    const scrollListener = () =>{
        if(window.scrollY > 10){
          setBlackHeader(true)
        }
        else{
          setBlackHeader(false)
        }
    }

    window.addEventListener('scroll', scrollListener);
    return() =>{
      window.removeEventListener('scroll', scrollListener);
    }
  },[])

  
 return (
   <div className="page">
      
      <Header black={blackHeader}/>

      {featuredData &&
       <FilmeDestaque item={featuredData}/>
      }

       <section className="lists">
        {moviesList.map((item, key)=>(
          <div>
            <MovieRow key={key} title={item.title} items={item.items} />
          </div>
        ))}
       </section>

       <footer>
         Feito por <strong>Leandro Krygoski</strong> em 09/12/20<br/>
         Direitos de Imagem a <strong>Netflix</strong><br/>
         Dados pegos do site <strong>TheMoviedb.org</strong>
       </footer>
        
         {moviesList.length <= 0 &&      
          <div className="loading">
           <img src="https://media.tenor.com/images/60f3b1faa4c27ebf674eb77924c5b3d9/tenor.gif" alt="carregando" />
          </div>      
         }
       

   </div>
  );
}