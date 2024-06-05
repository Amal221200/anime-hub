import { SignUp } from "@clerk/nextjs"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign up page for users.",
};

const SignUpPage = () => {

  return <SignUp />
}

export default SignUpPage