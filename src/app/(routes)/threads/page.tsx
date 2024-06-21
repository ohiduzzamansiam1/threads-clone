import AddThread from "./_components/AddThread";

export default function Home() {
  return (
    <div className="flex-1 border-x-2 overflow-auto no-scrollbar">
      <AddThread />
    </div>
  );
}
