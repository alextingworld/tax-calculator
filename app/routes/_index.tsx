import { SetStateAction, useState, useEffect } from "react";
import type { MetaFunction } from "@remix-run/node";
import {
  Badge,
  Box,
  Divider,
  Heading,
  HStack,
  Select,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  // separate
  Card,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

import { calculateFederalDepreciation } from "~/utils/taxCalculation";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

type IncomeType = "capital-gains" | "ordinary-income";

interface StateTaxRate {
  "capital-gains": number;
  "ordinary-income": number;
}

const FEDERAL_TAX_RATE: Record<IncomeType, number> = {
  "capital-gains": 0.2,
  "ordinary-income": 0.37,
};

const STATE_TAX_RATE: Record<string, StateTaxRate> = {
  Alabama: { "capital-gains": 0.05, "ordinary-income": 0.05 },
  Alaska: { "capital-gains": 0.0, "ordinary-income": 0.0 },
  Arizona: { "capital-gains": 0.025, "ordinary-income": 0.025 },
  Arkansas: { "capital-gains": 0.044, "ordinary-income": 0.044 },
  California: { "capital-gains": 0.144, "ordinary-income": 0.144 },
  Colorado: { "capital-gains": 0.044, "ordinary-income": 0.044 },
  Connecticut: { "capital-gains": 0.0699, "ordinary-income": 0.0699 },
  Delaware: { "capital-gains": 0.066, "ordinary-income": 0.066 },
  Florida: { "capital-gains": 0.0, "ordinary-income": 0.0 },
  Georgia: { "capital-gains": 0.0549, "ordinary-income": 0.0549 },
  Hawaii: { "capital-gains": 0.0725, "ordinary-income": 0.11 },
  Idaho: { "capital-gains": 0.058, "ordinary-income": 0.058 },
  Illinois: { "capital-gains": 0.0495, "ordinary-income": 0.0495 },
  Indiana: { "capital-gains": 0.0305, "ordinary-income": 0.0305 },
  Iowa: { "capital-gains": 0.057, "ordinary-income": 0.057 },
  Kansas: { "capital-gains": 0.057, "ordinary-income": 0.057 },
  Kentucky: { "capital-gains": 0.04, "ordinary-income": 0.04 },
  Louisiana: { "capital-gains": 0.0425, "ordinary-income": 0.0425 },
  Maine: { "capital-gains": 0.0715, "ordinary-income": 0.0715 },
  Maryland: { "capital-gains": 0.0575, "ordinary-income": 0.0575 },
  Massachusetts: { "capital-gains": 0.09, "ordinary-income": 0.09 },
  Michigan: { "capital-gains": 0.0425, "ordinary-income": 0.0425 },
  Minnesota: { "capital-gains": 0.0985, "ordinary-income": 0.0985 },
  Mississippi: { "capital-gains": 0.047, "ordinary-income": 0.047 },
  Missouri: { "capital-gains": 0.048, "ordinary-income": 0.048 },
  Montana: { "capital-gains": 0.059, "ordinary-income": 0.059 },
  Nebraska: { "capital-gains": 0.0584, "ordinary-income": 0.0584 },
  Nevada: { "capital-gains": 0.0, "ordinary-income": 0.0 },
  "New Hampshire": { "capital-gains": 0.0, "ordinary-income": 0.0 },
  "New Jersey": { "capital-gains": 0.1075, "ordinary-income": 0.1075 },
  "New Mexico": { "capital-gains": 0.059, "ordinary-income": 0.059 },
  "New York": { "capital-gains": 0.0882, "ordinary-income": 0.109 },
  "North Carolina": { "capital-gains": 0.045, "ordinary-income": 0.045 },
  "North Dakota": { "capital-gains": 0.029, "ordinary-income": 0.029 },
  Ohio: { "capital-gains": 0.035, "ordinary-income": 0.035 },
  Oklahoma: { "capital-gains": 0.0475, "ordinary-income": 0.0475 },
  Oregon: { "capital-gains": 0.099, "ordinary-income": 0.099 },
  Pennsylvania: { "capital-gains": 0.0307, "ordinary-income": 0.0307 },
  "Rhode Island": { "capital-gains": 0.0599, "ordinary-income": 0.0599 },
  "South Carolina": { "capital-gains": 0.064, "ordinary-income": 0.064 },
  "South Dakota": { "capital-gains": 0.0, "ordinary-income": 0.0 },
  Tennessee: { "capital-gains": 0.0, "ordinary-income": 0.0 },
  Texas: { "capital-gains": 0.0, "ordinary-income": 0.0 },
  Utah: { "capital-gains": 0.0495, "ordinary-income": 0.0485 },
  Vermont: { "capital-gains": 0.0875, "ordinary-income": 0.0875 },
  Virginia: { "capital-gains": 0.0575, "ordinary-income": 0.0575 },
  Washington: { "capital-gains": 0.07, "ordinary-income": 0.07 },
  "West Virginia": { "capital-gains": 0.065, "ordinary-income": 0.065 },
  Wisconsin: { "capital-gains": 0.0765, "ordinary-income": 0.0765 },
  Wyoming: { "capital-gains": 0.0, "ordinary-income": 0.0 },
};

const ITC_RATE = 0.3;

export default function Index() {
  const [incomeType, setIncomeType] = useState<IncomeType | "">("");
  const [state, setState] = useState<string>("");
  const [stateTaxRate, setStateTaxRate] = useState<number | null>(null);
  const [federalTaxRate, setFederalTaxRate] = useState<number | null>(null);
  const [federalDepreciation, setFederalDepreciation] = useState<[]>([]);

  useEffect(() => {
    if (state && incomeType) {
      setStateTaxRate(STATE_TAX_RATE[state][incomeType]);
    }
  }, [state, incomeType]);

  useEffect(() => {
    if (incomeType) {
      setFederalTaxRate(FEDERAL_TAX_RATE[incomeType]);
    }
  }, [incomeType]);

  useEffect(() => {
    if (federalTaxRate) {
      setFederalDepreciation(
        calculateFederalDepreciation(federalTaxRate) as SetStateAction<[]>
      );
    }
  }, [federalTaxRate]);

  const handleIncomeTypeChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setIncomeType(e.target.value as SetStateAction<"" | IncomeType>);
  };
  const handleSelectStateChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setState(e.target.value as SetStateAction<string>);
  };

  const federalTaxRateDisplay =
    federalTaxRate !== null ? `${federalTaxRate * 100}%` : "0%";

  const stateTaxRateDisplay =
    stateTaxRate !== null ? `${(stateTaxRate * 100).toFixed(2)}%` : "0%";

  const states = Object.keys(STATE_TAX_RATE);

  console.log(federalDepreciation);
  return (
    <Box bg="#fff" w="100%" p={4} color="#2D3748">
      <Heading as="h1" size="lg" mb={1}>
        Calculate Your Returns & Tax Savings
      </Heading>
      <Text fontSize="xl" mb={20}>
        Values below assume highest marginal tax rates
      </Text>

      <Box mb={20}>
        <Heading as="h2" size="md" mb={2}>
          Tax Details
        </Heading>
        <Divider orientation="horizontal" mb={4} />
        <HStack direction="row" spacing="24px" mb={6}>
          <Select
            placeholder="Select your income type..."
            onChange={handleIncomeTypeChange}
            width="300px"
          >
            <option value="capital-gains">Capital gains</option>
            <option value="ordinary-income">Ordinary income</option>
          </Select>
          <Badge
            colorScheme="blue"
            variant="solid"
            width="40px"
            textAlign="center"
          >
            {federalTaxRateDisplay}
          </Badge>
        </HStack>

        <HStack direction="row" spacing="24px">
          <Select
            placeholder="Select your state..."
            width="300px"
            disabled={incomeType === ""}
            onChange={handleSelectStateChange}
          >
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </Select>
          <Badge
            colorScheme="blue"
            variant="solid"
            width="fit-content"
            minWidth="40px"
            textAlign="center"
          >
            {stateTaxRateDisplay}
          </Badge>
        </HStack>
      </Box>

      <Box>
        <Heading as="h2" size="md" mb={2}>
          Potential ROI for each $1,000 invested{" "}
        </Heading>
        <Divider orientation="horizontal" mb={4} />
        <Stat mb={6}>
          <StatLabel>5-Year Return</StatLabel>
          <StatNumber>$1,555.3</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            55.53%
          </StatHelpText>
        </Stat>

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
                  <Td isNumeric>{ITC_RATE * 1000}</Td>
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
      </Box>
    </Box>
  );
}
