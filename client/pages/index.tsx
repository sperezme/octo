import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="home">
        <figure>
          <img
            src="https://static.octopuscdn.com/logos/logo.svg"
            alt="Octopus Energy Logo"
          />
        </figure>
        <h1>Welcome to the Octopus Energy Frontend code test!</h1>
        <p>
          Get started by visiting the <code>/product</code> URL and editing{" "}
          <Link href="/product">client/pages/product.js</Link>
        </p>
      </div>
    </main>
  );
}
