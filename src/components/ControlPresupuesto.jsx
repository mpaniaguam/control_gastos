import {useEffect, useState} from 'react'
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({ gastos, setGastos, presupuesto, setPresupuesto, setIsValidPresupuesto }) => {

    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorcentaje] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);
        const totalDisponible = presupuesto - totalGastado

        // Calcular el porcentaje gastado para el grafico
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto ) * 100).toFixed(2);

        setGastado(totalGastado);
        setDisponible(totalDisponible);

        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1000);
        
    }, [gastos])

    const formatearCantidad = (cantidad) => {
        return Number(cantidad).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    } 

    const handleResetApp = () => {
        const resultado = confirm("Deseas reiniciar presupuesto y gastos?")

        if(resultado){
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }else{

        }
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div  > 
                {/* Implementar grafica para el calculo del presupuesto  */}
                <CircularProgressbar 
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#d34d4d' : '#3B82F6',
                        trailColor: '#F5F5F5',
                        textColor: porcentaje > 100 ? '#d34d4d' : '#3B82F6'
                    })}
                    value={porcentaje}
                    text={`${porcentaje}% Gastado`}
                />
            </div>
            <div className='contenido-presupuesto'>
                
                {/* Agregar boton para reiniciar la aplicacion  */}
                <button 
                    className='reset-app'
                    type='button'
                    onClick={handleResetApp}
                >
                    Resetear app
                </button>

                <p>
                    <span>Presupuesto: </span> {formatearCantidad(presupuesto) }
                </p>
                <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                    <span>Disponible: </span> {formatearCantidad(disponible) }
                </p>
                <p>
                    <span>Gastado: </span> {formatearCantidad(gastado) }
                </p>
            </div>
        </div>
    )
}
export default ControlPresupuesto
