export default function TransactionInfo({ transactions }) {
  let numberOfTransactions = transactions.length;
  let total = transactions.reduce((acc, n) => acc + parseInt(n.amount), 0);
  let average = Math.round(total / numberOfTransactions);

  function getMinOrMax(array, modifier) {
    let minOrMax;
    if (modifier === 'max') {
      minOrMax = -Infinity;
      array.forEach(
        (object) => (minOrMax = Math.max(minOrMax, parseInt(object.amount)))
      );
    } else {
      minOrMax = Infinity;
      array.forEach(
        (object) => (minOrMax = Math.min(minOrMax, parseInt(object.amount)))
      );
    }
    return minOrMax;
  }
  return (
    <>
      {transactions.length >= 1 && (
        <div>
          Smallest Transaction: ${getMinOrMax(transactions, 'min')} Largest
          Transaction: ${getMinOrMax(transactions, 'max')}
          Total: {total}
          Average: {average}
        </div>
      )}
    </>
  );
}
