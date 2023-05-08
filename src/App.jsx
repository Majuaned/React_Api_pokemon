import { useState } from 'react'
import './App.css'

function App() {

  const [nombres, setNombres] = useState([]);
  const [imagenes, setImagenes] = useState('');

  const seleccionPokemon = async()=> {
    const peticion = await fetch(`https://pokeapi.co/api/v2/pokemon/`)
    const respuesta = await peticion.json()
    const pintado = respuesta.results.map((pokemon)=>(
      {
        nombre: pokemon.name,
        imagen:pokemon.url
      }
    ))
    setNombres(pintado);
}

//******** Función para obtener la imágen *************************** */

  function consultaImagen(url) {
    fetch(url)
    .then( response2=>response2.json() )
    .then( response2 => {
      setImagenes(response2.sprites.front_default)
    })

  }

  return (
    <div className="App">
        <button onClick={()=>seleccionPokemon()}>
          {/* aca se renderiza el nombre que tendrá el botón */}
          Presiona para seleccionar los poquemons
        </button> 

        {/* ***************************************************** */}
              { 
                imagenes.length===0
                ?
                <p></p>
                :
                <div className="card">
                  <img src={imagenes} />
                </div>
              }  

        {
          nombres.map((person,index)=>{ 
            return (
            <>
            <button onClick={()=>consultaImagen(person.imagen)} id={index} key={index}>
              {person.nombre}
              
            </button>
            </>

           )
          })
        }
        
    </div>
  )
}

export default App
