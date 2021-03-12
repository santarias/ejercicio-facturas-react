const Totales = props => {
  return (
    <tfoot>
      <tr className="totales">
        <th className="text-right" colspan="3">Totales:</th>
        <td><span className="total-bases"></span>€</td>
        <td><span className="total-ivas"></span>€</td>
        <td><span className="total-totales"></span>€</td>
        <td colspan="2"></td>
      </tr>
    </tfoot>
  );
};

export default Totales;
