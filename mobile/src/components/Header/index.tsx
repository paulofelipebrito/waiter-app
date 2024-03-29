import { TouchableOpacity } from 'react-native';

import { Text } from '../Text';
import { Container, Content, OrderHeader, Table } from './styles';

interface HeaderProps {
  selectedTable: string;
  onCancelOrder: () => void;
}

export function Header({ selectedTable, onCancelOrder }: HeaderProps) {
  return (
    <Container>
      {!selectedTable && (
        <>
          <Text size={14} opacity={0.9}>
            Welcome to
          </Text>
          <Text size={24} weight="700">
            WAITER<Text size={24}>APP</Text>
          </Text>
        </>
      )}
      {selectedTable && (
        <Content>
          <OrderHeader>
            <Text size={24} weight="600">
              Order
            </Text>
            <TouchableOpacity onPress={onCancelOrder}>
              <Text color="#d73035" weight="600">
                Cancel Order
              </Text>
            </TouchableOpacity>
          </OrderHeader>
          <Table>
            <Text color="#666666">Table {selectedTable}</Text>
          </Table>
        </Content>
      )}
    </Container>
  );
}
