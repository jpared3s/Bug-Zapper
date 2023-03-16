import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import { useRouter } from 'next/router'


const inter = Inter({ subsets: ['latin'] })

export default function IssuesCreate() {
  return (
    <>
      <Head>
        <title>Create Issues</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <p>Issue create form here</p>
      </main>
    </>
  )
}


