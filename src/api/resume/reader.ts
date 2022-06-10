import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
// interface ContactBody {
//   message: string;
// }
{
  /* <ContactBody> */
}
export default function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  res.send({ title: `I am TYPESCRIPT` });
}
