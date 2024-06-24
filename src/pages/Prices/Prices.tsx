import React from 'react';

import styles from './Prices.module.scss'
import { usePayment } from '@Hooks/usePayment';
import { Item } from '@Services/Payment/PaymentService.types';

function Prices() {
  const [items, setItems] = React.useState<Item[]>([]);
  const { getItems } = usePayment();

  React.useEffect(() => {
    getItems().then((res) => {
      console.log(res);
      if (res.success) {
        setItems(res.value.items);
      }
    })
  }, [])

  return (
    <div className={styles.container}>
      {items.map((item) => (
        <ItemComponent key={item.itemId} item={item} />
      ))}
    </div>
  )
}

export default Prices;

function ItemComponent({ item }: { item: Item }) {
  return (
    <div>
      <h1>{item.name}</h1>
      <p>{item.price}</p>
    </div>
  )
}