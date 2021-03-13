import PropTypes from "prop-types";
import { DateTime } from "luxon";

const Facturas = (props) => {
  const { facturas, cantidadIVA, verificaVencimiento, compruebaVencimiento } = props;
  return (
    <tbody>
      { facturas &&
        facturas.map((factura) =>
        (
          < tr key={factura.id} className="factura" >
            <td className="numero">{factura.numero}</td>
            <td className="fecha">{DateTime.fromMillis(+factura.fecha).toLocaleString()}</td>
            <td className="concepto">{factura.concepto}</td>
            <td><span className="base">{factura.base.toFixed(2)}</span>€</td>
            <td>
              <span className="cantidad-iva">
                {cantidadIVA(factura.base, factura.tipoIva)}
              </span>€ (<span className="tipo-iva">{factura.tipoIva}</span>%)</td>
            <td>
              <span className="total">
                {(factura.base + cantidadIVA(factura.base, factura.tipoIva)).toFixed(2)}
              </span>€</td>
            <td className={`estado ${factura.abonada ? "table-success" : "table-danger"}`}>{factura.abonada ? "Abonada" : "Pendiente"}</td>
            <td className=
              {`vencimiento
              ${(!verificaVencimiento(DateTime.local(), factura.vencimiento) && !factura.abonada) ? "table-danger" : "table-success"}
              `}>
              {factura.abonada ? "-" : compruebaVencimiento(factura.vencimiento)}
            </td>
          </tr>
        ))
      }
    </tbody >
  );
};

Facturas.propTypes = {
  facturas: PropTypes.array.isRequired,
  cantidadIVA: PropTypes.func.isRequired,
  verificaVencimiento: PropTypes.func.isRequired,
  compruebaVencimiento: PropTypes.func.isRequired
};

export default Facturas;
