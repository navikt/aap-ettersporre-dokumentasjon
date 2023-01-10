import Head from 'next/head';
import { Header } from '@navikt/ds-react-internal';
import { Button, Select, TextField } from '@navikt/ds-react';
import { useState } from 'react';

export default function Home() {
  const [fnr, setFnr] = useState<string>('');
  const [dokumentasjon, setDokumentasjon] = useState<string>('');

  /* @ts-ignore */
  const onButtonClick = async (event) => {
    event.preventDefault();
    await fetch('/api/ettersporrDokumentasjon', {
      method: 'POST',
      body: JSON.stringify({
        fnr,
        type: dokumentasjon,
      }),
    });
  };

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
          <TextField label="Fødselsnummer" onChange={(event) => setFnr(event.target.value)} />
          <Select
            label="Hvilken dokumentasjon etterspørres"
            onChange={(event) => setDokumentasjon(event.target.value)}
          >
            <option value="">Velg dokumentasjon</option>
            <option value="STUDIER">Studier</option>
            <option value="OMSORG">Omsorg</option>
          </Select>
          <Button variant="primary" onClick={onButtonClick}>
            Etterspør dokkumentasjon
          </Button>
        </form>
      </main>
    </>
  );
}
