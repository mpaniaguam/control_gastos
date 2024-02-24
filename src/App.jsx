import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filtros from './components/Filtros'
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos'
import { generarId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {

  // Crear el state 
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  )
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true)

      setTimeout(() => {
        setAnimarModal(true)
      }, 600);
    }
  }, [gastoEditar])

  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true)
    }, 600);
  }

  // 
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto] )

  useEffect(() =>{
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    if(presupuesto > 0){
      setIsValidPresupuesto(true)
    }
  })

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos))
  }, [gastos])

  useEffect(() => {
    if(filtro){
      // Filtrar datos por categoria
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])

  // Funcion para guardar el gasto que se esta agregando
  const guardarGasto = gasto => { 
    if (gasto.id) {
      // Actualizar gasto, entra cuando el usuario quiere editar un gasto 
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados);
      setGastoEditar({})
    } else {
      // Nuevo Gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto])
    }

    // Cerrar el modal despues de agregar un gasto
    setAnimarModal(false)
    setTimeout(() => {
      setModal(false)
    }, 500);
  }

  // Funcion para eliminar un gasto 
  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter( gasto => gasto.id != id);
    setGastos(gastosActualizados);
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {/* Mostrar el icono de nuevo gasto - dependiento del evento  */}
      {isValidPresupuesto && (
        <>
          {/* Para listar y mostrar los gastos  */}
          <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            />

            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>

          <div className='nuevo-gasto'>
            <img
              src={IconoNuevoGasto}
              alt="icono nuevo gasto"
              onClick={handleNuevoGasto}
            />

          </div>
        </>
      )}

      {/* Mostrar el modal del componente para agregar un gasto */}
      {modal && <Modal
        setModal={setModal}
        animarModal={animarModal}
        setAnimarModal={setAnimarModal}
        guardarGasto={guardarGasto}
        gastoEditar={gastoEditar}
        setGastoEditar={setGastoEditar}
      />}


    </div>
  )
}

export default App
