import Logo from '../resources/brand/Logo';

export default function Header() {
  return (
    <header className="header bg-theme-600 flex justify-center font-roboto items-center space-x-4 p-4">
      <Logo className="w-36 md:w-52 lg:w-full" />
      <div className="slogan flex flex-col justify-start items-between text-white text-xl md:text-2xl lg:text-3xl font-bold">
        <span>The</span>
        <span className="text-5xl md:text-7xl lg:text-9xl">BEST</span>
        <div>
          <span className="block">Party Game</span>
          <span className="block">Out There</span>
        </div>
      </div>
    </header>
  );
}
