import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="home">
        <Image
          src="https://static.octopuscdn.com/logos/logo.svg"
          alt="Octopus Energy Logo"
          width={200}
          height={100}
        />
        <h1>Welcome to the Octopus Energy Frontend code test!</h1>
        <p>
          Get started by visiting the <code>/product</code> URL and editing{" "}
          <Link href="/product">client/pages/product.js</Link>
        </p>
      </div>
    </main>
  );
}
