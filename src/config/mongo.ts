import mongoose from 'mongoose';

async function dbConnect(): Promise<void> {
  try {
    let DB_URI = process.env.DB_URI;

    if (!DB_URI) {
      throw new Error('No mongo DB_URI provided');
    }

    await mongoose.connect(DB_URI);
    console.log('*** CREDIBOT DATABASE IS ALIVEEEEE ***');
  } catch (error) {
    console.error('*** CONNECTION FAILED *** ', error)
  }
}

export default dbConnect