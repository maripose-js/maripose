import { Button } from "@mantine/core";
import { IconBase } from "../components/icons/base.tsx";
import { Link } from "react-router-dom";

export const NotFound = () => {
  const goBack = () => {
    window.history.back();
  };
  return (
    <section className="mp-mantine-body">
      <div className="container flex items-center min-h-screen mx-auto">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
          <p className="text-sm font-medium mp-mantine-body-light mp-mantine-text-light rounded-full h-9 w-9 flex justify-center items-center">
            <IconBase icon={"tabler:info-circle"} className={"p-3"} size={6} />
          </p>
          <h1 className="mt-3 text-2xl font-semibold mp-mantine-text md:text-3xl">
            Page not found
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            The page you are looking for doesn't exist. Here are some helpful
            links:
          </p>

          <div className="flex items-center justify-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
            <Button
              variant={"light"}
              leftSection={<IconBase icon={"tabler:arrow-narrow-left"} />}
              onClick={() => goBack()}
            >
              Go back
            </Button>

            <Link to={"/"}>
              <Button>Take me home</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
