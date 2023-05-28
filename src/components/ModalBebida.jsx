import React from "react";
import { Modal, Image } from "react-bootstrap";
import useBebidas from "../hooks/useBebidas";
export const ModalBebida = () => {
  const { modal, handleModalClick, receta, cargando } = useBebidas();
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
  }
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
            <h2 className="pt-3">Ingredientes y Cantidad</h2>
            {mostrarIngredientes()}
          </div>
        </Modal.Body>
      </Modal>
    )
  )
}
