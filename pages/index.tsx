import Head from 'next/head';
import { Header } from '@navikt/ds-react-internal';
import { Button, Select, TextField } from '@navikt/ds-react';

export default function Home() {
  return (
    <>
      <Head>
        <title>AAP - Etterspør dokumentasjon</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header>
        <Header.Title as="h1">AAP - Etterspør dokumentasjon</Header.Title>
      </Header>
      <main>
        <form>
          <TextField label="Fødselsnummer" />
          <TextField label="SøknadsId" />
          <Select label="Hvilken dokumentasjon etterspørres">
            <option value="">Velg type dokumentasjon</option>
            <option value="Lønnsslipp">Lønnsslipp</option>
            <option value="Vitnemål">Vitnemål</option>
          </Select>
          <Button variant="primary">Etterspør dokkumentasjon</Button>
        </form>
      </main>
    </>
  );
}
