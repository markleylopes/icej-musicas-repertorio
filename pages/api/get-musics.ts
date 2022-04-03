// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { firebaseAdmin } from "services/firebaseAdmin";
import { NextApiRequest, NextApiResponse } from "next";

const hello = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const store = firebaseAdmin.firestore();

    const result = await store
      .collection("musics")
      .get()
      .then((res) => res.docs.map((doc) => ({ id: doc.id, ...doc.data()})));

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
  }
};

export default hello;
