import axios from 'axios';
import {useState,useCallback, useEffect} from 'react';
import './App.css';

function App() {
  const [loading,SetLoading]=useState(false);
  const [data,setData]=useState([]);

  const url='https://www.thecocktaildb.com/api/json/v1/1/random.php';

  const fetchCocktailHandler=useCallback(()=>{
   SetLoading(true);
   axios.get(url).then(res=>{
    console.log(res.data)
    setData(res.data.drinks);
   }).catch(e=>console.log(e))
   .finally(()=>SetLoading(false))
  },[]);
  
  if(loading){
    <h1>loading....</h1>;
  }

  useEffect(()=>{
   fetchCocktailHandler();
   },[fetchCocktailHandler]);


  return (
    <div className="App">
   {data.map((cocktail)=>(
    <div key={cocktail.idDrink} className="cocktail-container">
    <h2>{cocktail.strDrink}</h2>
      <img src={cocktail.strDrinkThumb} alt="#"/>
      <h3>{cocktail.strInstructions}</h3>
      <button onClick={fetchCocktailHandler}>Get another cocktail</button>
    </div>
   ))}
    </div>
  );
}

export default App;
