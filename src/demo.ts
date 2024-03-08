export type DynamoDBAttributeValue = {
  S?: string;
  N?: number;
  L?: Array<DynamoDBAttributeValue>;
  M?: Record<string, DynamoDBAttributeValue>;
};

export type DynamoDBItem = Record<string, DynamoDBAttributeValue>;

export type SalesItem = {
  unitPrice: string;
  quantity: string;
  size: string;
  metric:string
  brand: string;
};

export type SalesTransaction = {
  customerName: string;
  date: string;
  discountedTotal: string;
  paymentMethod: string;
  id: string;
  remarks: string;
  items: Array<SalesItem>;
  discount: string;
  totalBeforeDiscount: string;
  cashAmount?: string
  transferAmount?:string
  useBothPayments?:string
};

// Convert DynamoDB response to a more structured TypeScript object
const parseDynamoDBResponse = (item: DynamoDBItem): SalesTransaction => {
  const parseAttribute = (attribute: DynamoDBAttributeValue): any => {
    if (attribute.S !== undefined) return attribute.S;
    if (attribute.N !== undefined) return attribute.N;
    if (attribute.L !== undefined) return attribute.L.map(parseAttribute);
    if (attribute.M !== undefined)
      return Object.fromEntries(
        Object.entries(attribute.M).map(([key, value]) => [
          key,
          parseAttribute(value),
        ])
      );
    return undefined;
  };

  const parseSalesItem = (salesItem: DynamoDBAttributeValue): SalesItem => {
    if (salesItem.M) {
      return {
        unitPrice: salesItem.M.unitPrice?.S || "0",
        quantity: salesItem.M.quantity?.S || "0",
        size: salesItem.M.size?.S || "",
        brand: salesItem.M.brand?.S || "",
        metric: salesItem.M.brand?.S || "",
      };
    }

    return {
      unitPrice: "0",
      quantity: "0",
      size: "",
      brand: "",
      metric: ''
    };
  };

  const parseItems = (
    items: DynamoDBAttributeValue
  ): Array<SalesItem> => {
    if (items.L !== undefined) {
      return items.L.map((item) => (parseSalesItem(item.M!) ));
    }

    return [];
  };

  const parsedTransaction: SalesTransaction = {
    customerName: parseAttribute(item.customerName),
    date: parseAttribute(item.date),
    discountedTotal: parseAttribute(item.discountedTotal),
    paymentMethod: parseAttribute(item.paymentMethod),
    id: parseAttribute(item.id),
    remarks: parseAttribute(item.remarks),
    items: parseItems(item.items),
    discount: parseAttribute(item.discount),
    totalBeforeDiscount: parseAttribute(item.totalBeforeDiscount),
    // cashAmount: parseAttribute(item.cashAmount),
    // transferAmount: parseAttribute(item.transferAmount),
    // useBothPayments: parseAttribute(item.useBothPayments)
  };

  return parsedTransaction;
};
// Example usage
const dynamoDBResponse: DynamoDBItem = {
  customerName: { S: "demo" },
  date: { S: "2024-03-07T17:51:51.834Z" },
  discountedTotal: { S: "0" },
  paymentMethod: { S: "Cash" },
  id: { S: "b33b4865-0b32-4b4e-b0f6-d3aacc4442a3" },
  remarks: { S: "" },
  items: {
    L: [
      {
        M: {
          unitPrice: { S: "0" },
          quantity: { S: "31" },
          size: { S: "4mm" },
          brand: { S: "Bluecrown" },
        },
      },
      {
        M: {
          unitPrice: { S: "0" },
          quantity: { S: "33" },
          size: { S: "2mm" },
          brand: { S: "Alleraqua" },
        },
      },
    ],
  },
  discount: { S: "0" },
  totalBeforeDiscount: { S: "0" },
};

const parsedTransaction = parseDynamoDBResponse(dynamoDBResponse);

// Now `parsedTransaction` has a strongly typed structure
console.log(parsedTransaction.customerName);

export { parsedTransaction, parseDynamoDBResponse };
