import type { RouteComponent, ActionFunction } from "remix";
import { redirect } from "remix";
import { getInstanceURLs } from "~/utils/get-fly-instance-urls.server";

const action: ActionFunction = async ({ request }) => {
  let token = request.headers.get("Authorization");
  // verify post request and the token matches
  if (
    request.method !== "POST"
    // || (process.env.NODE_ENV !== "development" && token !== process.env.AUTH_TOKEN)
  ) {
    return redirect("/");
  }

  const { search } = new URL(request.url);

  try {
    // get all app instances and refresh them
    const instances = await getInstanceURLs();

    const results = await Promise.allSettled(
      instances.map(async (instance) => {
        const url = new URL(instance);
        url.pathname = "/_refreshlocal";
        url.search = search;

        return fetch(url.toString(), {
          method: "POST",
          headers: {
            Authorization: process.env.AUTH_TOKEN!,
          },
        });
      })
    );

    results.forEach((result) => {
      console.log(result);
    });

    return redirect(request.url);
  } catch (error) {
    console.error(error);
    return redirect(request.url);
  }
};

const RefreshAllInstancesDocsPage: RouteComponent = () => {
  return (
    <form
      method="post"
      className="flex flex-col items-center justify-center h-screen"
    >
      <button
        className="px-4 py-1 text-3xl text-white transition-colors duration-150 ease-in-out bg-purple-500 rounded-xl hover:bg-purple-600"
        type="submit"
      >
        Refresh All Instances!
      </button>
    </form>
  );
};

export default RefreshAllInstancesDocsPage;
export { action };
