// pages/api/test-mongo.js
import clientPromise from '@/lib/mongodb'; // assuming this exists

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('Portfolio');
    const data = await db.collection('your-collection-name').find({}).limit(1).toArray();
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
