import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-toggle";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const LandingPage = async () => {
  const { userId } = auth();
  if (userId) {
    return redirect("/mail");
  }

  return (
    <>
      <div className="absolute inset-0 z-[-1] bg-gradient-to-r from-gray-800 via-gray-900 to-black opacity-90" />
      <div className="absolute inset-0 z-[-2] bg-gradient-to-b from-transparent via-gray-600/20 to-gray-900 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_80%)]"></div>
      <div className="relative z-10 flex min-h-screen flex-col items-center px-4 pt-36">
        <h1 className="bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-center text-6xl font-extrabold text-transparent">
          The Minimalistic <br /> AI-Powered Email Client
        </h1>
        <p className="mt-4 max-w-2xl text-center text-lg text-gray-300">
          MindfulMail helps you stay organized effortlessly with a clean,
          AI-powered interface that keeps your inbox clutter-free.
        </p>
        <div className="mt-10 flex space-x-4">
          <Link href="/mail">
            <Button className="px-8 py-3 text-lg font-semibold">
              Get Started
            </Button>
          </Link>
          <Link href="https://github.com/NaveedWaddo/MindfulMail">
            <Button variant="outline" className="px-8 py-3 text-lg">
              Learn More
            </Button>
          </Link>
        </div>

        <div className="mx-auto mt-20 max-w-5xl">
          <h2 className="mb-6 text-center text-2xl font-semibold text-gray-200">
            Why MindfulMail?
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg border border-gray-700 bg-gray-800/80 p-6 shadow-lg transition-all hover:bg-teal-500/10">
              <h3 className="mb-2 text-xl font-semibold text-teal-400">
                AI-Driven Email Prioritization
              </h3>
              <p className="text-gray-400">
                Let AI sort through your inbox and bring the most important
                emails to the forefront.
              </p>
            </div>
            <div className="rounded-lg border border-gray-700 bg-gray-800/80 p-6 shadow-lg transition-all hover:bg-indigo-500/10">
              <h3 className="mb-2 text-xl font-semibold text-indigo-400">
                Powerful Full-Text Search
              </h3>
              <p className="text-gray-400">
                Quickly find any email with our robust search tool designed to
                save time.
              </p>
            </div>
            <div className="rounded-lg border border-gray-700 bg-gray-800/80 p-6 shadow-lg transition-all hover:bg-purple-500/10">
              <h3 className="mb-2 text-xl font-semibold text-purple-400">
                Streamlined Shortcuts
              </h3>
              <p className="text-gray-400">
                Navigate effortlessly through your inbox with intuitive keyboard
                shortcuts.
              </p>
            </div>
          </div>
        </div>

        <div className="my-16 flex items-center space-x-4">
          <Link
            href="/sign-in"
            className="text-sm text-gray-400 hover:underline"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="text-sm text-gray-400 hover:underline"
          >
            Sign Up
          </Link>
          <ModeToggle />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
