export default function Navbar() {
  return (
    <nav className="mx-6 mt-5 flex h-24 items-center justify-between rounded-xl bg-primary px-16 font-instrument-serif text-secondary">
      <div className="text-4xl">
        The Incubator
      </div>
      <div className="flex items-center gap-4">
        <button className="rounded-lg border-1 border-secondary px-6 py-2 text-lg font-medium text-secondary transition-transform duration-100 hover:scale-x-110 hover:scale-y-95 hover:bg-secondary hover:text-primary">
          Login
        </button>
      </div>
    </nav>
  );
}
