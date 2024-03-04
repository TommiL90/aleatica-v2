export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="grid grid-cols-3 gap-4">
        <div>01</div>
        <div>02</div>
        <div className="grid grid-cols-2">
          <div>02</div>
          <div>03</div>
          <div>04</div>
        </div>
      </div>
    </main>
  )
}
