import AuthControls from "./Navbar/AuthControls";
import ThemeControl from "./Navbar/ThemeControl";

export default function Navbar() {
  return (
    <nav className="bg-neutral-primary sticky w-full z-20 top-0 start-0 border-b border-default">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3">
          <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">
            Meal Tracker
          </span>
        </a>

        <div className="w-full md:block md:w-auto">
          <ul className="flex flex-row items-center font-medium p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-neutral-primary">
            <ThemeControl />
            <AuthControls />
          </ul>
        </div>
      </div>
    </nav>
  );
}
