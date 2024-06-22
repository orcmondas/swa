import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import axios from "axios";

const sparqlProxy: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const nameParam = context.bindingData.name;
  const jobParam = context.bindingData.job;
  console.log("someone has triggered a function <3", {context, req})
  try {
    const response = await axios.post(
      "https://reqres.in/api/users/",
      {
        name: nameParam,
        job: jobParam,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    context.res = {
      status: response.status,
      body: response.data,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", 
      },
    };
  } catch (error: any) {
    context.res = {
      status: error.response ? error.response.status : 500,
      body: error.message,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
  }
};

export default sparqlProxy;
