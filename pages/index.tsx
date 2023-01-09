import Head from 'next/head';
import { Header } from '@navikt/ds-react-internal';

export default function Home() {
  return (
    <>
      <Head>
        <title>AAP - Etterspørr dokumentasjon</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header>
          <Header.Title as="h1">AAP - Etterspørr dokumentasjon</Header.Title>
        </Header>
      </main>
    </>
  );
}
