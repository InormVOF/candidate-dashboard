import Airtable from "airtable";
import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";

const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_ID as string
  );

  if (!emailRegex.exec(req.body.email)) {
    res.send({ result: "NOK" });
    return;
  }

  base("ContactForm").create(
    [
      {
        fields: {
          Email: req.body.email,
          Message: req.body.message,
          Status: "Todo",
        },
      },
    ],
    (err: Error) => {
      if (err) {
        console.error(err);
        res.statusMessage = err.message;
        res.status(500);
        res.send({ result: "NOK" });
        return;
      }
      res.send({ result: "OK" });
    }
  );
}
