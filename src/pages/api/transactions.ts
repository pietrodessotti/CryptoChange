/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next';

const values = [
  {
    nameCrypto: 'Pietro',
    quantity: 10,
    referencePrice: 25,
  },
];

export default function (req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      res.status(200).json(values);
      break;
    case 'POST':
      res.status(200).json(values);
      break;
    default:
      res.status(404).json({ statusCode: 404, message: 'Method not found' });
      break;
  }
}
