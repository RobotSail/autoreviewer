import { Navbar, DarkThemeToggle } from "flowbite-react";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import CodeReviewer from "../components/Reviewer";

import { api } from "../utils/api";

const Home: NextPage = () => {
  const [code, setCode] = useState("");
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.currentTarget.value);
  };
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Auto Code Reviewer</title>
        <meta name="description" content="Automatically review your code" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]"></main>
    </>
  );
};

export default Home;
