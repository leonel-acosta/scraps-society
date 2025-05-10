import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button";

export default function Home() {
  return (
    <>
      <section className="w-full bg-primary bg-opacity-25 md:p-32 py-20 px-10 bg-blend-overlay	 h-screen bg-cover relative bg-center bg-[url('https://res.cloudinary.com/dkopuiyae/image/upload/v1731953315/pexels-tomfisk-3174348_feegvi.png')]">
        <div className="hero md:text-left text-center m-auto">
          <h1>RE-THINK</h1>
          <h1>RE-USE</h1>
          <h1 className="accent">RE-CYCLE</h1>
          <h4 className="mb-5">
            Join the Scraps Society and take action against waste.
          </h4>
          <Link href={"/posts"}>
            <Button accent text={"LET'S GO"} />
          </Link>
        </div>
      </section>
      <section className="flex flex-col-reverse lg:flex-row justify-center gap-10 items-center w-full bg-primary p-10 h-auto">
        <div>
          <Image
            src={
              "https://res.cloudinary.com/dkopuiyae/image/upload/t_Banner 16:9/v1731952074/pexels-magda-ehlers-pexels-2602537_jluq0q.jpg"
            }
            alt={"war on waste"}
            sizes="500px"
            width={500}
            height={500}
            style={{
              width: "500px",
              height: "500px",
              objectFit: "cover",
            }}
            className="rounded-lg text-center"
          />
        </div>
        <div className="lg:w-1/2 p-5">
          <h3>
            Connect with others to trade, donate, and reduce waste. Together, we
            can make sustainability simple and fun.
          </h3>
        </div>
      </section>
      <section className="flex flex-col  lg:flex-row justify-center gap-10 items-center w-full bg-secondary p-10 h-auto">
        <div className="lg:w-1/2 p-5">
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
            sizes="500px"
            width={500}
            height={500}
            style={{
              width: "500px",
              height: "500px",
              objectFit: "cover",
            }}
            className="rounded-lg text-center"
          />
        </div>
      </section>
    </>
  );
}
