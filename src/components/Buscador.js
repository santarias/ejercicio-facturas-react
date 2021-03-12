import { Form } from "react-bootstrap";

const Buscador = props => {
  return (
    <Form.Label>
      Buscar
      <Form.Control type="text" className="form-control-sm" placeholder="Num de factura"></Form.Control>
    </Form.Label>
  );
};

export default Buscador;
