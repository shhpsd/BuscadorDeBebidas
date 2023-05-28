import { useState, useEffect, createContext } from "react";
import axios from "axios";
const BebidasContext = createContext();
const BebidasProvider = ({ children }) => {
  const [bebidas, setBebidas] = useState([]);
  const [modal, setModal] = useState(false);
  const [bebidaId, setBebidaId] = useState(null);
  const [receta, setReceta] = useState({});
  const [cargando, setCargando] = useState(false);
  // TODO: IMPLEMENTAR IMAGENES DE LOS INGREDIENTES EN LA CARD DE LA RECETA
  // DE OBTENEMOS LA DIRRECCION DE LA IMAGEN DEL INGREDIENTE
  useEffect(() => {
    const obtenerReceta = async () => {
      
      if (!bebidaId) return;
      try {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`;
        const { data } = await axios.get(url);
        setReceta(data.drinks[0]);
        console.log(receta)
      } catch (error) {
        console.error(error);
      }
    };
    obtenerReceta();
  }, [bebidaId]);

  const obtenerBebidas = async (datos) => {
    setCargando(true);
    try {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?s=${datos.nombre}&c=${datos.categoria}`;
      const { data } = await axios.get(url);
      setBebidas(data.drinks);
    } catch (error) {
      console.error(error);
    } finally {
      setCargando(false);
    }
  };
  const handleModalClick = () => {
    setModal(!modal);
  };
  const handleBebidaIdClick = (id) => {
    setBebidaId(id);
  };
  return (
    <BebidasContext.Provider
      value={{
        obtenerBebidas,
        bebidas,
        handleModalClick,
        handleBebidaIdClick,
        receta,
        cargando,
        modal,
      }}
    >
      {children}
    </BebidasContext.Provider>
  );
};

export { BebidasProvider };

export default BebidasContext;
