import { Button, Card } from "flowbite-react";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Review from "../components/Review";
import CodeReviewer from "../components/Reviewer";

import { api } from "../utils/api";

const Home: NextPage = () => {
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.currentTarget.value);
  };
  const reviewMutation = api.review.create.useMutation();
  const handleSubmitReview = () => {
    reviewMutation
      .mutateAsync({
        codeBlock: code,
      })
      .then((r) => {
        setReview(r ?? "Could not get review");
      })
      .catch((e) => window.alert("could not create review"));
  };

  const handleReset = () => {
    setReview("");
    setCode("");
  };

  return (
    <>
      <Head>
        <title>Auto Code Reviewer</title>
        <meta name="description" content="Automatically review your code" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Automatic Code Reviewer
          </h1>
          {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8"> */}
          <div className="h-[65%] w-[65%]">
            <CodeReviewer
              content={code}
              onChangeContent={handleContentChange}
              onSubmit={handleSubmitReview}
              isSubmiting={reviewMutation.isLoading}
              onReset={handleReset}
            />
            <Review loading={reviewMutation.isLoading} review={review} />
          </div>
        </div>
        {/* <p className="text-2xl text-white">
            {hello.data ? hello.data.greeting : "Loading tRPC query..."}
          </p> */}
        {/* </div> */}
      </main>
    </>
  );
};

export default Home;
