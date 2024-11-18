import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button";

export default function Home() {
  return (
    <>
      <Header />
      <section className="w-full bg-primary bg-opacity-90 p-52 h-screen bg-cover bg-center bg-[url('https://res.cloudinary.com/dkopuiyae/image/upload/v1731953315/pexels-tomfisk-3174348_feegvi.png')]">
        <div className="text-center auto">
          <h1>RE-THINK</h1>
          <h1>RE-USE</h1>
          <h1>RE-CYCLE</h1>
          <h4 className="mb-3">
            Join the Scraps Society and take action against waste.
          </h4>
          <Link href={"/posts"}>
            <Button accent text={"CHECK IT OUT"} />
          </Link>
        </div>
      </section>
      <section className="flex md:flex-row justify-center gap-20 items-center w-full bg-primary p-20 h-auto">
        <div>
          <Image
            src={
              "https://res.cloudinary.com/dkopuiyae/image/upload/t_Banner 16:9/v1731952074/pexels-magda-ehlers-pexels-2602537_jluq0q.jpg"
            }
            alt={"war on waste"}
            sizes="600px"
            width={600}
            height={600}
            style={{
              width: "600px",
              height: "600px",
              objectFit: "cover",
            }}
            className="rounded-lg text-center"
          />
        </div>
        <div className="md:w-1/2 p-5">
          <h3>
            Connect with others to trade, donate, and reduce waste. Together, we
            can make sustainability simple and fun.
          </h3>
        </div>
      </section>
      <section className="flex md:flex-row justify-center gap-20 items-center w-full bg-secondary p-20 h-auto">
        <div className="md:w-1/2 p-5">
          <h3>
            Participate, track your progress, and help build a cleaner world
            with every exchange.
          </h3>
        </div>
        <div>
          <Image
            src={
              "https://res.cloudinary.com/dkopuiyae/image/upload/v1731952074/pexels-emmet-35167-128421_uufkcj.jpg"
            }
            alt={"Waste Management"}
            sizes="600px"
            width={600}
            height={600}
            style={{
              width: "600px",
              height: "600px",
              objectFit: "cover",
            }}
            className="rounded-lg text-center"
          />
        </div>
      </section>
    </>
  );
}
