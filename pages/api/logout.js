import { destroySession } from '../../server/auth';

export default function logout(req, res) {
  if (req.method === 'GET') {
    destroySession(res);
    res.status(200).end();
  }
}
