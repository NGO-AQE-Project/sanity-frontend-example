import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "7vf2csh0",
  dataset: "production",
  useCdn: true, //ensure fresh data
});

export default client;
