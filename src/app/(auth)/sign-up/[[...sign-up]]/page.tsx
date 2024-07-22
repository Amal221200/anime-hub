import { APP_URL, defaultOpenGraph } from "@/lib/metadata";
import { SignUp } from "@clerk/nextjs"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign up page for users.",
  openGraph: {
    ...defaultOpenGraph,
    title: "Sign Up",
    description: "Sign up page for users.",
    url: `${APP_URL}/sign-up`
  }
};

const SignUpPage = () => {

  return <SignUp />
}

export default SignUpPage