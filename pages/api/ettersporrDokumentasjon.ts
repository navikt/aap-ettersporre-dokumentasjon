import { NextApiRequest, NextApiResponse } from 'next';

export interface EttersporrDokumentasjonRequest {
  fnr: string;
  soknadsId?: string;
  dokumentasjonstype: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({});
}
