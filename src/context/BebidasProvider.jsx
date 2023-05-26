import { useState,useEffect,createContext } from "react";
import axios from "axios";
const BebidasContext = createContext()
const BebidasProvider = ({children}) =>{
    const [bebidas,setBebidas] = useState([])
    const [modal,setModal] = useState(false)
    const [bebidaId, setBebidaId] = useState(null)
    const [imagenIngrediente, setImagenIngrediente] = useState([])
    const [receta,setReceta] = useState({})
    const [cargando, setCargando] = useState(false)

    // useEffect(() =>{
    //     const obtenerImagenIngredientes = async () =>{
    //         const imagenes = []
    //         if (!bebidaId) return
    //         try {
    //             for(let i = 1; i < 16; i++){
    //                 if(receta[`strIngredient${i}`]){
    //                 imagenes.push(
    //                     <li>{imagenBebida[`strIngredient${i}`]} {imagenBebida[`strMeasure${i}`]}</li>
    //                   )
    //                 }
    //               }
    //             const url = `https://www.thecocktaildb.com/images/ingredients/${imagenBebida}-Small.png`
    //             const {data} = await axios.get(url)
    //             setImageBebida(data)
    //         }catch(error){
    //             console.error(error)
    //         }
    //         obtenerImagenIngredientes()
    //     }
    //     obtenerReceta()
    // }, [bebidaId])

    // TODO: IMPLEMENTAR IMAGENES DE LOS INGREDIENTES EN LA CARD DE LA RECETA
    // DE OBTENEMO LA DIRRECCION DE LA IMAGEN DEL INGREDIENTE
    
    const obtenerImagenesReceta = async () =>{
            if (!bebidaId) return
            try {
                for(let i = 1; i < 16; i++){
                    if(receta[`strIngredient${i}`]){
                        const urlImagen = `https://www.thecocktaildb.com/images/ingredients/${receta[`strIngredient${i}`]}-Small.png`
                        const {data} = await axios.get(urlImagen)
                        setImagenIngrediente(data)
                    }
                }
            }catch(error){
                console.error(error)
            }
        }
    useEffect(() =>{
        const obtenerReceta = async () =>{
            setCargando(true);
            if (!bebidaId) return
            try {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`
                const {data} = await axios.get(url)
                setReceta(data.drinks[0])
            }catch(error){
                console.error(error)
            }finally{
                setCargando(false)
            }
        }
        obtenerReceta()
    }, [bebidaId])

    const obtenerBebidas = async datos =>{
        try {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&c=${datos.categoria}`
            const {data} = await axios.get(url)
            setBebidas(data.drinks)
        } catch (error) {
            console.error(error)
        }
    }

    const handleModalClick = () =>{
        setModal(!modal)
    }
    const handleBebidaIdClick = (id) =>{
        setBebidaId(id)
    }
    return (
        <BebidasContext.Provider value={{
            obtenerBebidas,
            obtenerImagenesReceta,
            imagenIngrediente,
            bebidas,
            handleModalClick,
            handleBebidaIdClick,
            receta,
            cargando,
            modal
        }}>
            {children}
        </BebidasContext.Provider>
    )
}


export{
    BebidasProvider
}

export default BebidasContext