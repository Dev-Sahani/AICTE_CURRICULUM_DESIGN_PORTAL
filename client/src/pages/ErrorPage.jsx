import { PrimaryButton } from "../components";

const ErrorPage = () => {
  return (
    <main className="h-dvh p-8 flex flex-col items-center justify-center gap-8">
      <div>
        <img src="/404_error_page.png" alt="Page not found" />
      </div>
      <h1 className="w-full text-center text-4xl-custom font-bold">
        <span className="text-primary-500">{"Oops! "}</span>The page you are
        looking for does not exists.
      </h1>
      <PrimaryButton to={"/"}>Back to home</PrimaryButton>
    </main>
  );
};

export default ErrorPage;
