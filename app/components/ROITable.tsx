import React from "react";
import {
  Card,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

const ROITable: React.FC = () => {
  const ITC = 606.2;

  return (
    <Card width="fit-content">
      <TableContainer>
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Year</Th>
              <Th>ITC</Th>
              <Th isNumeric>Depreciation Tax Shield</Th>
              <Th isNumeric>Fixed Payment</Th>
              <Th isNumeric>Total Cash Flow</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>1</Td>
              <Td isNumeric>{`$${ITC}`}</Td>
              <Td isNumeric>$485.9</Td>
              <Td isNumeric>$15.0</Td>
              <Td isNumeric>$1,107.1</Td>
            </Tr>
            <Tr>
              <Td>2</Td>
              <Td>-</Td>
              <Td isNumeric>167.3</Td>
              <Td isNumeric>15.0</Td>
              <Td isNumeric>182.3</Td>
            </Tr>
            <Tr>
              <Td>3</Td>
              <Td>-</Td>
              <Td isNumeric>100.4</Td>
              <Td isNumeric>15.0</Td>
              <Td isNumeric>115.4</Td>
            </Tr>
            <Tr>
              <Td>4</Td>
              <Td>-</Td>
              <Td isNumeric>60.2</Td>
              <Td isNumeric>15.0</Td>
              <Td isNumeric>75.2</Td>
            </Tr>
            <Tr>
              <Td>5</Td>
              <Td>-</Td>
              <Td isNumeric>60.2</Td>
              <Td isNumeric>15.0</Td>
              <Td isNumeric>75.2</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Total</Th>
              <Th isNumeric>$606.2</Th>
              <Th isNumeric>$874.1</Th>
              <Th isNumeric>$75.0</Th>
              <Th isNumeric>$1,555.3</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default ROITable;
