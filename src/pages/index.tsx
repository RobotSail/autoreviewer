import { Button, Card, DarkThemeToggle, Navbar } from "flowbite-react";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Review from "../components/Review";
import CodeReviewer from "../components/Reviewer";
import type { CodeReviewerFormValues } from "../types";

import { api } from "../utils/api";

const Home: NextPage = () => {
  const [reviews, setReviews] = useState<string[]>([]);
  const reviewMutation = api.review.create.useMutation();
  const handleSubmitReview = ({
    content,
    language,
    numReviews,
    reviewPrompt,
    temperature,
  }: CodeReviewerFormValues) => {
    const _prompt = reviewPrompt.trim() === "" ? undefined : reviewPrompt;
    reviewMutation
      .mutateAsync({
        codeBlock: content,
        language: language,
        numReviews: numReviews,
        temperature: temperature,
        reviewPrompt: _prompt,
      })
      .then((r) => {
        // TODO: find a better way to incorporate the "reset" button with clearing this data from the UI without relying on state
        setReviews(r.map((v) => v.text ?? ""));
      })
      .catch((e) => window.alert("could not create review"));
  };
  const languages = [
    "Golang",
    "C",
    "C++",
    "C#",
    "Typescript",
    "Javascript",
    "Java",
    "YAML",
    "JSON",
    "Bash",
    "Python",
    "Scala",
    "Rust",
    "SQL",
  ];

  return (
    <>
      <Head>
        <title>Auto Code Reviewer</title>
        <meta name="description" content="Automatically review your code" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <Navbar className=" absolute w-full">
          <DarkThemeToggle />
        </Navbar>
        <div className="flex flex-col items-center justify-center ">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
              Automatic Code Reviewer
            </h1>
            {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8"> */}
            <div className="h-[65%] w-[65%]">
              <CodeReviewer
                initialValues={{
                  content: "",
                  numReviews: 1,
                  reviewPrompt: "",
                  temperature: 0.1,
                  language: languages[0] ?? "Golang",
                }}
                onSubmit={handleSubmitReview}
                isSubmiting={reviewMutation.isLoading}
                languages={languages}
                onReset={() => setReviews([])}
              />
              {reviews.map((review, i) => (
                <Review
                  loading={reviewMutation.isLoading}
                  review={review}
                  key={i}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
