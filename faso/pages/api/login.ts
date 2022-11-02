import type { User } from "./user";

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import fetchJson from "lib/fetchJson";

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = (await fetchJson(
      "https://asia-southeast2-fasolasidon.cloudfunctions.net/auth-login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      }
    )) as User;
    console.log("data: ", JSON.stringify(data));

    const user = { ...data, isLoggedIn: true } as User;
    req.session.user = user;
    await req.session.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions);
