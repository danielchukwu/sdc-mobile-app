import { TCaseSchema } from "@/lib/types";
import { createId } from "@paralleldrive/cuid2";
import { db } from "drizzle";
import { cases, offenders, TCases, TOffenders } from "drizzle/schema";

export async function GET(req: Request) {
  const cases = await db.query.cases.findMany({
    with: {offenders: true}
  });

  return Response.json(cases);
}

export async function POST(request: Request) {
  console.log('POST /cases Endpoint hit 🎯');

  const data: TCaseSchema = await request.json();
  console.log({ data });
  if (!data) throw new Error('Missing body object');

  // create case
  const caseId = createId();
  const caseData: TCases = {
    id: caseId,
    title: data.title,
    type: data.type,
    description: data.description,
    location: data.location,
  };
  await db.insert(cases).values(caseData);

  // create cases offenders
  const offendersData: TOffenders[] = data.offenders.map((item) => ({
    name: item.name,
    email: item.email,
    matricNo: item.matricNo,
    statement: item.statement,
    caseId: caseId,
  }));
  await db.insert(offenders).values(offendersData);


  return Response.json({ data });
}