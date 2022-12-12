/* eslint-disable react/no-unescaped-entities */
import { useEffect } from 'react';

import { Order } from '../../@types/Order';
import closeIcon from '../../assets/images/close-icon.svg';
import { formatCurrency } from '../../utils/formatCurrency';
import ReactPortal from '../ReactPortal';
import {
  Actions,
  Header,
  ModalBody,
  OrderDetails,
  OrderItems,
  Overlay,
  StatusContainer,
  Total,
} from './styles';

interface OrderModalProps {
  isLoading: boolean;
  onCancelOrder: () => Promise<void>;
  onClose: () => void;
  onChangeOrderStatus: () => void;
  order: Order | null;
  visible: boolean;
}

export function OrderModal({
  isLoading,
  onCancelOrder,
  onClose,
  onChangeOrderStatus,
  order,
  visible,
}: OrderModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!visible || !order) {
    return null;
  }

  const total = order.products.reduce(
    (acc, { product, quantity }) => acc + product.price * quantity,
    0
  );

  return (
    <ReactPortal containerId="modal-root">
      <Overlay>
        <ModalBody>
          <Header>
            <strong>Table {order.table}</strong>
            <button type="button" onClick={onClose}>
              <img src={closeIcon} alt="Icon to close modal" />
            </button>
          </Header>
          <StatusContainer>
            <small>Order's Status</small>
            <div>
              <span>
                {order.status === 'WAITING' && '🕒'}
                {order.status === 'IN_PRODUCTION' && '👨‍🍳'}
                {order.status === 'DONE' && '✅'}
              </span>
              <strong>
                {order.status === 'WAITING' && 'Queue'}
                {order.status === 'IN_PRODUCTION' && 'In production'}
                {order.status === 'DONE' && 'Ready!'}
              </strong>
            </div>
          </StatusContainer>
          <OrderDetails>
            <strong>Items</strong>
            <OrderItems>
              {order.products.map(({ _id, quantity, product }) => (
                <div className="item" key={_id}>
                  <img
                    src={`http://localhost:3001/uploads/${product.imagePath}`}
                    alt={product.name}
                    width="56"
                    height="28"
                  />
                  <span className="quantity">{quantity}x</span>
                  <div className="product-details">
                    <strong>{product.name}</strong>
                    <span>{formatCurrency(product.price)}</span>
                  </div>
                </div>
              ))}
            </OrderItems>
            <Total>
              <span>Total</span>
              <strong>{formatCurrency(total)}</strong>
            </Total>
          </OrderDetails>
          <Actions>
            {order.status !== 'DONE' && (
              <button
                type="button"
                className="primary"
                disabled={isLoading}
                onClick={onChangeOrderStatus}
              >
                <span>{order.status === 'WAITING' ? '👨‍🍳' : '✅'}</span>
                <strong>
                  {order.status === 'WAITING'
                    ? 'Start production'
                    : 'Finish order'}
                </strong>
              </button>
            )}
            <button
              type="button"
              className="secondary"
              disabled={isLoading}
              onClick={onCancelOrder}
            >
            Cancel Order
            </button>
          </Actions>
        </ModalBody>
      </Overlay>
    </ReactPortal>
  );
}
