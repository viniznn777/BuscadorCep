import './styles/app.css'
import { FiSearch } from 'react-icons/fi'
import { useState } from 'react'
import api from '../sevices/api.js';


function App() {
  const inputBox = document.getElementById('input')

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

   async function searchCep() {
    if (input === '') {
      alert('Digite um CEP válido!')
      return;
    }
    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput('')
      inputBox.focus()
    }
    catch {
      window.alert('Ops erro ao buscar seu CEP!')
      setInput('')
      inputBox.focus()
    }
  }


  return (
    <div className="container">
        <h1 className='title'>Buscador de CEP</h1>

        <div className='containerInput'>
          <input type="number"
          placeholder='Digite um CEP'
          value={input}
          onChange={(e) => setInput(e.target.value)} id="input" autoComplete="off"></input>
          <button onClick={searchCep}>
            <FiSearch size={25} color="#fff"></FiSearch>
          </button>
        </div>

        {Object.keys(cep).length > 0 && (
          <main className='main'>
            <h2>CEP: {cep.cep}</h2>

            <span>{cep.logradouro}</span>
            <span>Complemento: {cep.complemento}</span>
            <span>{cep.bairro}</span>
            <span>{cep.localidade} - {cep.uf}</span>
            <span>DDD - ({cep.ddd})</span>
          </main>
        )}
    </div>
  );
}

export default App;
