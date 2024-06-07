import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import Globe from "@/Components/Globe/Globe";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>DSF Bank</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <main>
        <Globe />
      </main>
      <Footer />
    </>
  );
}
