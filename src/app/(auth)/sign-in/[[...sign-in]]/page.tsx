import { APP_URL, defaultOpenGraph } from "@/lib/metadata";
import { SignIn } from "@clerk/nextjs"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in page for users.",
  openGraph: {
    ...defaultOpenGraph,
    title: "Sign In",
    description: "Sign in page for users.",
    url: `${APP_URL}/sign-in`
  }
};


const SignInPage = () => {

  return <SignIn />
}

export default SignInPage