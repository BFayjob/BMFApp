import {
  DynamoDBClient,
  GetItemCommand,
  GetItemCommandInput,
  PutItemCommand,
  PutItemCommandInput,
  CreateTableCommand,
  CreateTableCommandInput,
  ScanCommand,
  ScanCommandInput,
  DeleteItemCommand,
  DeleteItemCommandInput,
  UpdateItemCommand,
  UpdateItemCommandInput,
} from "@aws-sdk/client-dynamodb";

const dynamoDBClient = new DynamoDBClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS || "",
  },
});

const getItem = async (params: GetItemCommandInput) => {
  try {
    const data = await dynamoDBClient.send(new GetItemCommand(params));
    console.log(data.Item);

    return data;
  } catch (err) {
    console.error(err);
  }
};

const createItem = async (params: PutItemCommandInput) => {
  try {
    const data = await dynamoDBClient.send(new PutItemCommand(params));
    return data;
  } catch (err) {
    console.error(err);
  }
};

const createTable = async (params: CreateTableCommandInput) => {
  try {
    const data = await dynamoDBClient.send(new CreateTableCommand(params));
    return data;
  } catch (err) {
    console.error(err);
  }
};

const getItems = async (params: ScanCommandInput) => {
  try {
    const data = await dynamoDBClient.send(new ScanCommand(params));
    return data;
  } catch (err) {
    console.error(err);
  }
};

const deleteItem = async (params: DeleteItemCommandInput) => {
  try {
    const data = await dynamoDBClient.send(new DeleteItemCommand(params));
    return data;
  } catch (err) {
    console.error(err);
  }
};

const updateItem = async (params: UpdateItemCommandInput) => {
  try {
    const data = await dynamoDBClient.send(new UpdateItemCommand(params));
    return data;
  } catch (err) {
    console.error(err);
  }
};


export { getItem, createItem, createTable, getItems, deleteItem, updateItem };
