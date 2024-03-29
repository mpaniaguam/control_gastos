import { useState, useEffect } from "react"
import Mensaje from "./Mensaje"
import CerrarModal from "../img/cerrar.svg"

const Modal = ({ setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar }) => {

    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [fecha, setFecha] = useState('')
    const [id, setId] = useState('')

    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setFecha(gastoEditar.fecha)
            setId(gastoEditar.id)
        }
    }, [gastoEditar])

    const ocultarModal = () => {
        setAnimarModal(false)
        setGastoEditar({})
        setTimeout(() => {
            setModal(false)
        }, 600);
    }

    const handleSubmit = (e) => {
        e.preventDefault(); 

        // Verificar si todos los campos estan llenos
        if ([nombre, cantidad, categoria].includes('')) {
            setMensaje('Todos los campos son obligatorios ')
            // Ocultar el mensaje de alerta 
            setTimeout(() => {
                setMensaje('')
            }, 3000)
            return;
        }
        // Crear el objeto que va a almacenar el gasto 
        guardarGasto({ nombre, cantidad, categoria, fecha, id })
    }

    return (

        <div className="modal">

            <div className="cerrar-modal">
                <img
                    src={CerrarModal}
                    alt="cerrar modal"
                    onClick={ocultarModal}
                />

            </div>
            <form
                onSubmit={(handleSubmit)}
                className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}
            >
                <legend> {gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto"} </legend>

                {mensaje && <Mensaje tipo='error'>{mensaje} </Mensaje>}

                <div className="campo">
                    <label htmlFor="nombre" >Nombre Gasto </label>
                    <input
                        id="nombre"
                        type="text"
                        placeholder="Añade el nombre del gasto"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="cantidad">Cantidad </label>
                    <input
                        id="cantidad"
                        type="number"
                        placeholder="Añade la cantidad del gasto. ej:300"
                        value={cantidad}
                        onChange={e => setCantidad(Number(e.target.value))}
                    />
                </div>
                <div className="campo">
                    <label htmlFor="categoria" >Categoria </label>
                    <select
                        id="categoria"
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}
                    >
                        <option value="">--Seleccione--</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="varios">Gastos varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>
                <input
                    type='submit'
                    value={gastoEditar.nombre ? "Guardar cambios" : "Añadir Gasto"} 
                />
            </form>

        </div>
    )
}

export default Modal
