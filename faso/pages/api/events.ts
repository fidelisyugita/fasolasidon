import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";

import type { Endpoints } from "@octokit/types";
import { NextApiRequest, NextApiResponse } from "next";

export type Events =
  Endpoints["GET /users/{username}/events"]["response"]["data"];

async function eventsRoute(req: NextApiRequest, res: NextApiResponse<Events>) {
  const user = req.session.user;

  if (!user || user.isLoggedIn === false) {
    res.status(401).end();
    return;
  }

  // try {
  //   const { data: events } =
  //     await octokit.rest.activity.listPublicEventsForUser({
  //       username: user.id,
  //     })

  //   res.json(events)
  // } catch (error) {
  //   res.status(200).json([])
  // }
}

export default withIronSessionApiRoute(eventsRoute, sessionOptions);
