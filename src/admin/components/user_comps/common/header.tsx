import { useNavigate } from "react-router-dom"

export default function Header(){

    const navigate = useNavigate()

    function toSolicitudes(){
        navigate("/solicitudes")
    }

    function toEspacios(){
        navigate("/espacios")
    }

    function toUsers(){
        navigate("/users")
    }

    function toInventario(){
        navigate("/inventario")
    }

    function toPeriodos(){
        navigate("/periodos")
    }

    function toReportes(){
        navigate("/reportes")
    }

    return(
        <div id="header" className="w-full flex flex-row justify-evenly bg-morado h-[100px] w-full items-center"> 
            <h2 className="text-moradito text-xl font-bold" onClick={toSolicitudes}>Solicitudes</h2>
    
            <h2 className="text-moradito text-xl font-bold" onClick={toEspacios}>Espacios</h2>
        
            <h2 className="text-moradito text-xl font-bold" onClick={toUsers}>Usarios</h2>
        
            <h2 className="text-moradito text-xl font-bold" onClick={toInventario}>Inventario</h2>
        
            <h2 className="text-moradito text-xl font-bold" onClick={toPeriodos}>Periodos</h2>
        
            <h2 className="text-moradito text-xl font-bold" onClick={toReportes}>Reportes</h2>
        </div>

    )
}