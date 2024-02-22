import React from 'react'
import { formatearFecha } from '../helpers'
import IconoAhorro from '../img/icono_ahorro.svg'
import IconoCasa from '../img/icono_casa.svg'
import IconoComida from '../img/icono_comida.svg'
import IconoVarios from '../img/icono_gastos.svg'
import IconoOcio from '../img/icono_ocio.svg'
import IconoSalud from '../img/icono_salud.svg'
import IconoSuscripciones from '../img/icono_suscripciones.svg' 

// Crea un diccionario de iconos para asociar la categoria con los iconos
const diccionarioIconos = { 
    ahorro: IconoAhorro,
    comida: IconoComida,
    casa: IconoCasa,
    varios: IconoVarios,
    ocio: IconoOcio,
    salud: IconoSalud,
    suscripciones: IconoSuscripciones
}

const Gasto = ({ gasto }) => {

    // Destructuring: para acceder al objeto 
    const { nombre, cantidad, categoria, id, fecha } = gasto;

    return (
        <div className='gasto sombra'>
            <div className=' contenido-gasto'>
                <img 
                    alt='Icono Gasto'
                    src={diccionarioIconos[categoria]}
                />
                <div className='descripcion-gasto'>
                    <p className='categoria'> {categoria} </p>
                    <p className='nombre-gasto'> {nombre} </p>
                    <p className='fecha-gasto'>
                        Añadido: {''} <span>{formatearFecha(fecha)}</span>
                    </p>
                </div> 
            </div>
            <p className='cantidad-gasto'>${cantidad}</p>
        </div>
    )
}

export default Gasto
