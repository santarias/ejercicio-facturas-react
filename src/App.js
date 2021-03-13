import { useEffect, useState } from "react";
import { Col, Container, Form, FormControl, Row, Table, ToastHeader } from "react-bootstrap";
import Buscador from "./components/Buscador";
import Facturas from "./components/Facturas";
import Totales from "./components/Totales";
import useFetch from "./hooks/useFetch";
import { DateTime } from "luxon";

function App() {
  const [facturas, setFacturas] = useState([]);
  const [urlDatosApi, setUrlDatosApi] = useState(`${process.env.REACT_APP_API_URL}`);
  const { datos: facturasAPI } = useFetch(urlDatosApi);
  const [totalBase, setTotalBase] = useState(0);
  const [totalIva, setTotalIva] = useState(0);
  const [totalTotal, setTotalTotal] = useState(0);

  useEffect(() => {
    if (facturasAPI) {
      setFacturas(facturasAPI.filter(facturaAPI => facturaAPI.tipo === "ingreso"));
    }
  }, [facturasAPI]);

  useEffect(() => {
    if (facturas.length > 0) {
      setTotalBase(facturas.map(factura => factura.base).reduce((acc, base) => acc + base));
      setTotalIva(facturas.map(factura => factura.base * (factura.tipoIva / 100)).reduce((acc, iva) => acc + iva));
      setTotalTotal(Math.round(facturas.map(factura => factura.base + factura.base * (factura.tipoIva / 100)).reduce((acc, total) => acc + total) * 100) / 100);
    } else {
      setTotalBase(0);
      setTotalIva(0);
      setTotalTotal(0);
    }
  }, [facturas]);

  const cantidadIVA = (base, tipoIVA) => base * (tipoIVA / 100);
  const verificaVencimiento = (fechaHoy, fechaVencimiento) => {
    if (fechaVencimiento > fechaHoy) {
      return true;
    } else {
      return false;
    }
  };
  const compruebaVencimiento = (vencimiento) => {
    const fechaHoy = DateTime.local();
    const fechaVencimiento = DateTime.fromMillis(+vencimiento);
    const difFechas = fechaVencimiento.diff(fechaHoy, "days").toObject();
    const diasDif = Math.abs(Math.trunc(difFechas.days));
    if (verificaVencimiento(fechaHoy, fechaVencimiento)) {
      return `${fechaVencimiento.toLocaleString()} (faltan ${diasDif} días)`;
    } else {
      return `${fechaVencimiento.toLocaleString()} (hace ${diasDif} días)`;
    }
  };
  const cambiarBusqueda = e => {
    if (e.target.value) {
      setUrlDatosApi(`${process.env.REACT_APP_API_URL}?numero=${e.target.value}`);
    } else {
      setUrlDatosApi(`${process.env.REACT_APP_API_URL}`);
    }
  };

  return (
    <>
      <Container fluid as="section" className="principal">
        <Row as="header" className="cabecera">
          <Col as="h2">
            Listado de ingresos
          </Col>
        </Row>
        <main>
          <Row>
            <Col as="div" className="info-listado info-listado-top text-right">
              <Buscador cambiarBusqueda={cambiarBusqueda} />
            </Col>
          </Row>
          <Table striped bordered hover className="listado">
            <thead className="thead-light">
              <tr>
                <th className="col-min">Num.</th>
                <th className="col-med">Fecha</th>
                <th className="col-concepto">Concepto</th>
                <th className="col-med">Base</th>
                <th className="col-max">IVA</th>
                <th className="col-med">Total</th>
                <th className="col-max">Estado</th>
                <th className="col-max">Vence</th>
              </tr>
            </thead>
            <Facturas
              facturas={facturas}
              cantidadIVA={cantidadIVA}
              verificaVencimiento={verificaVencimiento}
              compruebaVencimiento={compruebaVencimiento} />
            <Totales
              totalBase={totalBase}
              totalIva={totalIva}
              totalTotal={totalTotal} />
          </Table>
        </main>
      </Container >
      <div className="loading off">
        <img src="img/loading.svg" alt="cargando" />
      </div>
    </>
  );
}

export default App;
