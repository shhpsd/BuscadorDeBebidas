import React from "react";
import { Modal, Image } from "react-bootstrap";
import useBebidas from "../hooks/useBebidas";
export const ModalBebida = () => {
  const { modal, handleModalClick, receta, cargando, imagenIngrediente } = useBebidas();
  const mostrarImagenesIngredientes = () => {
    // let imagenesIngredientes = [];
    console.log(imagenIngrediente);
    // for (let i = 0; i < 16; i++) {
    //   // if (imagenIngrediente[i]) {
    //     //Modifica la variable originarl utilizamos ".push" porque no tenemos ningun state
    //     //Modifica la variable originarl utilizamos ".push" porque no tenemos ningun state
    //     // imagenesIngredientes.push(
    //     //   <img src={data} alt={`Imagen receta ${receta.strDrink}`}></img>
    //     //   )
    //   }
    }
    // return imagenesIngredientes;
  const mostrarIngredientes = () => {
    let ingredientes = [];
    for (let i = 1; i < 16; i++) {
      if (receta[`strIngredient${i}`]) {
        //Modifica la variable originarl utilizamos ".push" porque no tenemos ningun state
        ingredientes.push(
          <li>
            {receta[`strIngredient${i}`]} {receta[`strMeasure${i}`]}
          </li>
        );
      }
    }
    return ingredientes;
  };
  return (
    !cargando && (
      <Modal
        show={modal}
        onHide={() => {
          handleModalClick();
        }}
      >
        <Image
          className="rounded"
          src={receta.strDrinkThumb}
          alt={`Imagen receta ${receta.strDrink}`}
        />
        <Modal.Header>
          <Modal.Title>{receta.strDrink}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="p-3">
            <h2>Instrucciones</h2>
            {receta.strInstructions}
            <h2>Ingredientes y Cantidad</h2>
            {mostrarIngredientes()}
            {mostrarImagenesIngredientes()}
          </div>
        </Modal.Body>
      </Modal>
    )
  )
}
