import Head from 'next/head'
import Link from 'next/link'
import Button from "@mui/material/Button"

export default function Home({}) {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Link href="/fullcalendar">
            <Button variant='contained'>Go to Calendar</Button>
        </Link>        
      </main>
    </div>
  )
}
