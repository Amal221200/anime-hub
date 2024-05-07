import Image from "next/image";


export default function Home() {
  // const user = await createUser({'email':'amal@gmail.com', password:'amal1234', username:"amalOtaku"})
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Anime Hub</h1>
      <Image src="/logo.png" alt="logo" className="" width={100} height={100} />
    </main>
  );
}
