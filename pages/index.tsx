import Head from 'next/head';
import { Header } from '@navikt/ds-react-internal';
import { Alert, BodyShort, Button, Heading, Search, Select, TextField } from '@navikt/ds-react';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

interface UserInfo {
  fnr: string;
  navn: string;
  kanKontaktes: boolean;
}

export default function Home() {
  const [dokumentasjon, setDokumentasjon] = useState<string>('');

  const [userInfo, setUserInfo] = useState<any>(null);

  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  /* @ts-ignore */
  const onButtonClick = async (event) => {
    setError(null);
    setMessage(null);
    event.preventDefault();
    const result = await fetch('/api/ettersporrDokumentasjon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fnr: userInfo.fnr,
        type: dokumentasjon,
      }),
    });
    if (!result.ok) {
      setError('Kunne ikke etterspørre dokumentasjon');
      return;
    }
    setMessage('Dokumentasjon etterspurt');
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
        <form
          className={styles.headerSearch}
          onSubmit={(e) => {
            e.preventDefault();
            // @ts-ignore-line
            setUserInfo({ fnr: e.target[0].value, navn: 'Ola Nordmann', kanKontaktes: true });
          }}
        >
          <Search
            label="header søk"
            size="small"
            variant="simple"
            placeholder="Fødselsnummer"
            onClear={() => setUserInfo(null)}
          />
        </form>
      </Header>
      <main className={styles.mainFlex}>
        {userInfo && (
          <div className={styles.content}>
            <Heading level="2" size="medium">
              {userInfo.navn}
            </Heading>
            <BodyShort>Fødselsnummer: {userInfo.fnr}</BodyShort>
            <BodyShort>Kan kontaktes: {userInfo.kanKontaktes ? 'Ja' : 'Nei'}</BodyShort>
            <form>
              <Select
                label="Hvilken dokumentasjon etterspørres"
                onChange={(event) => setDokumentasjon(event.target.value)}
              >
                <option value="">Velg dokumentasjon</option>
                <option value="ARBEIDSGIVER">Arbeidsgiver</option>
                <option value="STUDIER">Studier</option>
                <option value="LÅNEKASSEN_STIPEND">Lånekassen stipend</option>
                <option value="LÅNEKASSEN_LÅM">Lånekassen lån</option>
                <option value="ANDREBARN">Andre barn</option>
                <option value="OMSORG">Omsorg</option>
                <option value="UTENLANDSKE">Utland??</option>
                <option value="ANNET">Annet</option>
              </Select>
              {error && <Alert variant="error">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
              <Button variant="primary" onClick={onButtonClick}>
                Etterspør dokkumentasjon
              </Button>
            </form>
          </div>
        )}
      </main>
    </>
  );
}
