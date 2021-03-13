import PropTypes from "prop-types";

const Totales = props => {
  const { totalBase, totalIva, totalTotal } = props;
  return (
    <tfoot>
      <tr className="totales">
        <th className="text-right" colSpan="3">Totales:</th>
        <td><span className="total-bases"></span>{`${totalBase} €`}</td>
        <td><span className="total-ivas"></span>{`${totalIva} €`}</td>
        <td><span className="total-totales"></span>{`${totalTotal} €`}</td>
        <td colSpan="2"></td>
      </tr>
    </tfoot>
  );
};

Totales.propTypes = {
  totalBase: PropTypes.number.isRequired,
  totalIva: PropTypes.number.isRequired,
  totalTotal: PropTypes.number.isRequired
};
export default Totales;
