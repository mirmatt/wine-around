import Head from 'next/head'
import CalendarComponent from "./CalendarComponent"

export default function Home({}) {
  return (
    <div className="container">
      <Head>
        <title>Calendar WineAround App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <CalendarComponent/>
      </main>
    </div>
  )
}


// TODO
// Aggiungere Tanstack
// Aggiungere creazione di nuovo evento
// Aggiungere modifica evento
// Passare a typescript
// Rework Grafico