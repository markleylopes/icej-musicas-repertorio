import firebaseAdmin from "firebase-admin";

const { SECRET_GOOGLE_ADMIN_PRIVATE_KEY, SECRET_GOOGLE_ADMIN_CLIENT_EMAIL, SECRET_GOOGLE_ADMIN_PROJECT_ID } = process.env;


if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: (SECRET_GOOGLE_ADMIN_PRIVATE_KEY as string).replace(/\\n/g, '\n'),
      clientEmail: SECRET_GOOGLE_ADMIN_CLIENT_EMAIL,
      projectId: SECRET_GOOGLE_ADMIN_PROJECT_ID,
    }),
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  });
}

export { firebaseAdmin };
