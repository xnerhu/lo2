import * as React from 'react';

import { Image } from '~/renderer/components/Image';
import { SectionTitle } from '~/renderer/components/Section';
import { Container, MastersContainer, Item } from './style';

const HistorySection = () => {
  return (
    <>
      <SectionTitle>Historia szkoły</SectionTitle>
      <b>Chcąc odtworzyć historię naszej szkoły</b> należałoby się cofnąć do powojennych czasów roku 1945, kiedy to 22 maja władze oświatowe podjęły decyzje o utworzeniu Liceum i Gimnazjum Żeńskiego w Opolu, które miało funkcjonować na przedwojennych zasadach.
    <br />
      <br />
      Dyrektorką szkoły została Maria Maria Tyszkiewicz. Siedzibą szkoły był (do 1982 roku) gmach przy ulicy Kościuszki, składający się z dwóch skrzydeł. W sierpniu 1945 roku przeprowadzono się pierwsze zapisy uczennic do nowoutworzonej szkoły, a 4 września tego samego roku odbyło się uroczyste otwarcie szkoły i rozpoczęcie pierwszego roku szkolnego.
      <Container style={{ marginBottom: 24 }}>
        <Image src='/static/history/header.jpg' style={{ width: 200, height: 136 }} />
        <Image src='/static/history/grono.jpg' style={{ width: 200, height: 132, marginBottom: 32 }}>
          <b>Grono pedagogiczne (wrzesień 1946)</b>
        </Image>
        <Image src='/static/history/maturzystki.jpg' style={{ width: 200, height: 132, marginBottom: 48 }}>
          <b>Pierwsze maturzystki i grono pedagogiczne (28 czerwiec 1946)</b>
        </Image>
      </Container>
      <b>Ale nazwisko patronki w nazwie szkoła otrzymała dopiero 6 grudnia 1946 roku</b>, kiedy to Ministerstwo Oświaty nadało szkole imię Marii Konopnickiej. A ponad rok później (20 grudnia 1947) szkoła otrzymała również pierwszy sztandar. Jednakże o II Ogólnokształcącym Liceum w Opolu możemy mówić dopiero od 1 września 1965 roku, wtedy bowiem nastąpiła reorganizacja szkoły i rozdzielenie jej na podstawówkę i liceum (które od tego czasu nosi nazwę II Liceum Ogólnokształcące im. Marii Konopnickiej w Opolu).
      <Container>
        <Image src='/static/history/header2.jpg' style={{ width: 200, height: 132 }} />
      </Container>
      <br />
      <br />
      Zadania wychowawcze szkoła realizowała poprzez poszukiwanie ideowego przewodnika. Wyboru dokonała sama młodzież. Stała się nim poetka - Maria Konopnicka. Wybór patronki oparty na wymowie utworów i poglądów poetki odpowiadał okolicznością chwili i duchowi czasów powojennych. Ślubując słowami Roty - "Nie rzucim ziemi skąd nasz ród" młodzież potwierdziła radość z odzyskania polskiego Śląska.
      <Container>
        <Image src='/static/history/patron.jpg' style={{ width: 133, height: 252 }} />
        <Image src='/static/history/patron2.jpg' style={{ width: 163, height: 258 }} />
      </Container>
      <br />
      <b>W 1968</b> r. szkole ufundowano gipsowe popiersie Marii Konopnickiej, które znajduje się wewnątrz budynku. Jest to kopia nagrobka poetki z Cmentarza Łyczakowskiego we Lwowie. Natomiast 6 października 1984 roku przed gmachem nowego budynku szkoły odsłonięto jej pomnik, będący dziełem artysty rzeźbiarza Mariana Nowaka.
    </>
  )
}

const TextSection = () => {
  return (
    <>
      <SectionTitle style={{ marginTop: 32 }}>Tekst ślubowania</SectionTitle>
      Każdy uczeń rozpoczynający naukę w naszym liceum składa uroczyste śluby:
      <br />
      <br />
      JA, UCZEŃ II LICEUM OGÓLNOKSZTAŁCĄCEGO
      <br />
      NOSZĄCEGO IMIĘ MARII KONOPNICKIEJ,
      <br />
      MAJĄC W PAMIĘCI IDEAŁY, KTÓRYCH JEST ONA SYMBOLEM,
      <br />
      NAWIĄZUJĄC DO NAJLEPSZYCH TRADYCJI POLSKIEJ SZKOŁY,
      <br />
      <br />
      ŚLUBUJĘ UROCZYŚCIE,
      <br />
      <br />
      ŻE SUMIENNIE WYPEŁNIAC
      <br />
      BĘDĘ WSZYSTKIE OBOWIĄZKI
      <br />
      WYNIKAJĄCE Z POTRZEB SZKOLNYCH.
      <br />
      ŚLUBUJĘ PILNIE SIĘ UCZYC, UCZCIWIE POSTĘPOWAC,
      <br />
      PRZESTRZEGAC
      <br />
      SPRAWDZONYCH W CIĄGU WIEKU NORM MORALNYCH:
      <br />
      SZANOWAC POGLĄDY INNYCH,
      <br />
      MIŁOWAC DOBRO, PRAWDĘ I PIĘKNO,
      <br />
      WZOROWO ZACHOWYWAC SIĘ W SZKOLE I POZA NIĄ,
      <br />
      BĘDĘ ODNOSIC SIĘ Z PRZYJAŹNIĄ DO MOICH KOLEGÓW,
      <br />
      Z ŻYCZLIWOŚCIĄ I SZACUNKIEM
      <br />
      DO NAUCZYCIELI, WYCHOWAWCÓW I RODZICÓW.
      <br />
      PILNĄ NAUKĄ, UCZCIWOŚCIĄ I WZOROWYM ZACHOWANIEM
      <br />
      PRAGNĘ Z CAŁEGO SERCA
      <br />
      SŁUŻYC MOJEJ OJCZYŹNIE.
    </>
  )
}

const Master = ({ src, name, style, children }: { src: string, name: string, style: React.CSSProperties, children: React.ReactNode }) => {
  return (
    <Item>
      <Image src={src} style={style} />
      <b style={{ fontSize: 16, marginTop: 12, marginBottom: 4, display: 'block' }}>{name}</b>
      {children}
    </Item>
  )
}

const HeadermastersSection = () => {
  return (
    <>
      <SectionTitle style={{ marginTop: 32 }}>Dyrektorzy naszej szkoły</SectionTitle>
      <MastersContainer>
        <Master name='mgr Franciszek Pedela' src='/static/history/pedela.jpg' style={{ width: 142, height: 198 }} >
          maj 1945 - sierpień 1945
        </Master>
        <Master name='mgr Maria Tyszkiewicz' src='/static/history/tyszkiewicz.jpg' style={{ width: 138, height: 204 }} >
          sierpień 1945 - wrzesień 1950
        </Master>
        <Master name='Helena Małecka' src='/static/history/malecka.jpg' style={{ width: 140, height: 205 }} >
          wrzesień 1950 - sierpień 1963
        </Master>
        <Master name='mgr Antoni Cięciel' src='/static/history/cieciel.jpg' style={{ width: 138, height: 204 }} >
          sierpień 1963 - październik 1966
        </Master>
        <Master name='mgr Witalis Brągiel' src='/static/history/bragiel.jpg' style={{ width: 141, height: 204 }} >
          październik 1966 - sierpień 1977
        </Master>
        <Master name='dr Stanisław Palej' src='/static/history/palej.jpg' style={{ width: 137, height: 187 }} >
          sierpień 1982 - sierpień 1991
        </Master>
        <Master name='mgr Michał Paterak' src='/static/history/peterak.jpg' style={{ width: 140, height: 197 }} >
          sierpień 1977 - sierpień 1982
          <br />
          sierpień 1991 - sierpień 2006
        </Master>
      </MastersContainer>
    </>
  )
}

export const History = () => {
  return (
    <>
      <HistorySection />
      <TextSection />
      <HeadermastersSection />
    </>
  );
};
