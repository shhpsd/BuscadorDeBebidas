import {Form,Row,Col, Button, Alert } from "react-bootstrap"
import useCategorias from "../hooks/useCategorias"
import { useState } from "react"
import useBebidas from "../hooks/useBebidas"
export const Formulario = () => {
    const [busqueda,setBusqueda] = useState({
        nombre: '',
        categoria: ''
    })
    const [alerta,setAlerta] = useState('')
    const {categorias} = useCategorias()
    const {obtenerBebidas} = useBebidas()
    const handleSubmit = e => {
        e.preventDefault()
        console.log(busqueda)
        if(Object.values(busqueda).includes('')){
            setAlerta('Todos los campos son obligatorios')
        }
        setAlerta('')
        obtenerBebidas(busqueda)
    }
return (
    <Form onSubmit={handleSubmit}>
        {alerta && <Alert variant="danger" className="text-center">{alerta}</Alert>}
        <Row>
            <Col md={6} className='w-100'>
                        <Form.Group htmlFor="nombre" className="my-3">
                        <Form.Label htmlFor="categoria">Nombre De Bebida</Form.Label>

                            <Form.Control 
                                type="text"
                                placeholder="Ej: Tequila, Vodka..."
                                name="nombre"
                                value={busqueda.nombre}
                                onChange={e => setBusqueda({
                                    ...busqueda,
                                    [e.target.name] : e.target.value
                                })}
                                className='rounded'
                            >   
                        </Form.Control>
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col md={6}>
            <Form.Group className="my-3">
                    <Form.Label htmlFor="categoria">Tipo De Bebida</Form.Label>
                    <Form.Select 
                        id="categoria"
                        name="categoria"
                        value={busqueda.categoria}
                        onChange={e => setBusqueda({
                            ...busqueda,
                            [e.target.name] : e.target.value
                        })}
                    >  
                        <option>-Selecciona Categoria-</option> 
                        {categorias.map(categoria =>(
                            <option 
                                key={categoria.strCategory}
                                value={categoria.strCategory}>
                                {categoria.strCategory}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Col>
        </Row>
        <Row className="justify-content-end">
            <Col md={3}>
                <Button
                    variant="danger"
                    className="text-uppercase w-100 fw-bold"
                    type="submit"
                >Buscar Bebidas</Button>
            </Col>
        </Row>
    </Form>
)
}
