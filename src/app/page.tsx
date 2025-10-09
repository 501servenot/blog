import RollingText from "@/components/RollingText";
export default function Home() {
  return (
    <div className="mx-auto max-w-1/3">
      <main>
        <h1 className="text-2xl text-neutral-300 mt-20">
          <RollingText
            text="Hello"
            duration={0.8}
            delay={0.1}
            direction="up"
          />
        </h1>
        <p className="text-neutral-300 text-lg mt-5">我是MrZhang</p>
        <p className="text-neutral-300">一名前端开发工程师</p>
      </main>
      <footer></footer>
    </div>
  );
}
