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
  const { createPayment } = usePayment();

  const handleBuy = () => {
    createPayment([item.itemId], window.location.href, "TRY").then((res) => {
      if (res.success) {
        window.location.href = res.value.paymentPageUrl;  
      }
    })
  }

  return (
    <div className={styles.card} onClick={handleBuy}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={item.imageUri} alt={item.name} />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{item.name}</h2>
        <p className={styles.description}>{item.description}</p>
        <div className={styles.details}>
          <p className={styles.price}>Price: ₺{item.price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}