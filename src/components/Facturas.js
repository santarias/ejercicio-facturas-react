import { useEffect, useState } from "react";

const Facturas = () => {
  const [facturas, setFacturas] = useState();
  const { DateTime } = require("luxon");

  useEffect(() => {
    (async () => {
      const resp = await fetch(`${process.env.REACT_APP_API_URL}`);
      const facturasJSON = await resp.json();
      setFacturas(facturasJSON.filter(facturaJSON => facturaJSON.tipo === "ingreso"));
    })();
  }, []);

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

  const total = {
    bases: 0,
    ivas: 0,
    totales: 0
  };

  const cantidadIVA = (base, tipoIVA) => base * (tipoIVA / 100);
  return (
    <tbody>
      { facturas ?
        facturas.map((factura) => (
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
        )) : <tr className="factura-dummy" />
      }
    </tbody >
  );
};

export default Facturas;
