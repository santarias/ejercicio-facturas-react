import { Form } from "react-bootstrap";

const Buscador = props => {
  const { cambiarBusqueda } = props;
  return (
    <Form.Label>
      Buscar
      <Form.Control type="text" className="form-control-sm" onChange={cambiarBusqueda}></Form.Control>
    </Form.Label>
  );
};

export default Buscador;
