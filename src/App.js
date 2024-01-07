import './App.css';
import {useState, useEffect} from 'react'
import { useFetch } from './hooks/useFetch';

const url = "http://localhost:3000/products"

function App() {
  const [products, setProducts] = useState([])
  // custon hook
  const {data, httpConfig, loading} = useFetch(url)

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  
  // resgatar produtos
  // useEffect(() => {
  //   (async () => {
  //     const res = await fetch(url)
  //     const data = await res.json()
  //     setProducts(data)
  //   })()
  // }, [])

  // add produto
  const handleSubmit = async (e) => {
    e.preventDefault()
    const product = {
      name,
      price
    }
    // const res = await fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(product)
    // })

    // // caso seja salvo, adicionar o item na lista dinamicamente
    // const addedProduct = await res.json()
    // setProducts(prevProducts => [
    //   ...prevProducts,
    //   addedProduct
    // ])

    httpConfig(product, 'POST')

    setName('')
    setPrice('')
  }

  const handleRemove = (id) => {
    httpConfig(id, 'DELETE')
  }

  return (
    <div className="App">
      <h1>Lista de Produtos</h1>
      {loading && <p>carregando dados...</p>}
      <ul>
        {data && data.map(product => (<li key={product.id}>{product.name} - {product.price}
        <button onClick={()=>handleRemove(product.id)}>excluir</button>
        </li>))}
      </ul>
      <div className='add-product'>
        <form onSubmit={handleSubmit}>
        <label>
          <span>Nome</span>
          <input type='text' value={name} onChange={e => setName(e.target.value)}/>
        </label>
        <label>
          <span>Preco</span>
          <input type='text' value={price} onChange={e => setPrice(e.target.value)}/>
        </label>
        <button type='submit'>Salvar</button>
        </form>
      </div>
    </div>
  );
}

export default App;
