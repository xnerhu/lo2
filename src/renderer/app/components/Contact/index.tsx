import * as React from 'react';

import { Container, Column } from '../About/style';
import { Item, Map } from './style';

const Policy = () => {
  return (
    <div style={{ marginTop: 32 }}>
      <b><h5>Klauzula informacyjna</h5></b>
      <br />
      Zgodnie z art. 13 ust. 1 i ust. 2 ROZPORZĄDZENIE PARLAMENTU EUROPEJSKIEGO I RADY (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie o ochronie danych) o ochronie danych osobowych z dnia 27 kwietnia 2016 r. informuję, iż:
      <br /><br />
      Administratorem Pani/Pana danych osobowych jest:
      <ul>
        <li>Zespół Szkół Ogólnokształcących Nr II w Opolu, ul. Pułaskiego 3, 45-048 Opole</li>
      </ul>
      Dane kontaktowe inspektora ochrony danych osobowych: aleksandra.taskin@lo2.opole.pl
      <br />
      <br />
      Pani/Pana dane osobowe i dane osobowe Pani/Pana dziecka przetwarzane będą, na podstawie odpowiednich przepisów prawa lub odrębnie zbieranych zgód, w celach:
      <ul>
        <li>prowadzenia dokumentacji przebiegu nauczania</li>
        <li>wydawania świadectw, legitymacji i zaświadczeń</li>
        <li>prowadzenia badań zewnętrznych dotyczących umiejętności uczniów</li>
        <li>kontroli realizacji obowiązku szkolnego</li>
        <li>promocji szkoły</li>
        <li>udziału w konkursach</li>
        <li>organizacji wycieczek</li>
        <li>ubezpieczenia</li>
        <li>działań opiekuńczych</li>
        <li>opieki medycznej</li>
        <li>udzielania pomocy psychologiczno-pedagogicznej</li>
        <li>prowadzenia nauczania indywidualnego</li>
        <li>dostosowania wymagań na egzaminach zewnętrznych</li>
        <li>korzystania z dziennika elektronicznego</li>
        <li>kontaktów nauczyciel-rodzic</li>
        <li>rekrutacji do naszej szkoły na podstawie wyrażonej zgody</li>
      </ul>
      Odbiorcą Pani/Pana i dziecka danych osobowych będą:
      <ul>
        <li>dyrektor</li>
        <li>wicedyrektor</li>
        <li>sekretarz</li>
        <li>pracownicy administracji szkolnej</li>
        <li>pielęgniarka</li>
        <li>nauczyciele</li>
        <li>pedagog, psycholog</li>
        <li>inspektor ochrony danych osobowych</li>
        <li>oraz uprawnione organy publiczne</li>
      </ul>
      Pani/Pana dane osobowe i dane osobowe Pani/Pana dziecka będą przechowywane przez okres wymagany przepisami prawa (Rozporządzenie Ministra Edukacji Narodowej z dnia 25 sierpnia 2017 r. w sprawie sposobu prowadzenia przez publiczne przedszkola, szkoły i placówki dokumentacji przebiegu nauczania, działalności wychowawczej i opiekuńczej oraz rodzajów tej dokumentacji), maksymalnie 50 lat od zakończenia nauki w Zespole Szkół Ogólnokształcących Nr II w Opolu posiada Pani/Pan prawo dostępu do treści swoich danych oraz prawo ich sprostowania, usunięcia, ograniczenia przetwarzania, prawo wniesienia sprzeciwu, prawo do cofnięcia zgody w dowolnym momencie bez wpływu na zgodność z prawem przetwarzania, którego dokonano na podstawie zgody przed jej cofnięciem.
      <br /><br />
      Ma Pan/Pani prawo wniesienia skargi do Prezesa UODO, gdy uzna Pani/Pan, iż przetwarzanie danych osobowych dotyczących Pani/Pana narusza przepisy Rozporządzenia o ochronie danych osobowych z dnia 27.04.2016r.
      <br /><br />Podanie przez Pana/Panią danych osobowych jest wymogiem ustawowym (ustawa Prawo oświatowe, ustawa o systemie oświaty). Jest Pan/Pani zobowiązana do ich podania a konsekwencją niepodania danych osobowych będzie niezrealizowanie celów, w jakich zbierane są dane osobowe.
    </div>
  )
}

export const Contact = () => {
  return (
    <>
      <Container maxWidth={1216}>
        <Column>
          <b>
            <h6>Publiczne Liceum Ogółnokształcące nr II</h6>
            <h6>z Oddziałami Dwujęzycznymi w Opolu ul. Kazimierza Pułaskiego 3</h6>
            <h6>45-048 Opole</h6>
          </b>
          <br />
          <Item>
            Tel./Fax.: (0-77) 454-22-86, 402-18-87
          </Item>
          <Item>
            Godziny otwarcia sekretariatu: 700 ÷ 1500 w dni powszednie
          </Item>
          <Item>
            E-mail:	sekretariat@lo2.opole.pl
          </Item>
          <Item>
            NIP: 754-111-03-47
          </Item>
          <Item>
            REGON: 160 347 099
          </Item>
          <Item>
            Konto Rady Rodziców: 47 1160 2202 0000 0002 2731 8488
          </Item>
        </Column>
        <Map src="http://maps.google.pl/maps?f=q&amp;hl=pl&amp;geocode=&amp;q=ul.+Kazimierza+Pu%C5%82askiego+3,+Opole,+Poland&amp;ie=UTF8&amp;s=AARTsJrW9sAySn-ob6ZLOl2QVCS3Fkl7rA&amp;ll=50.675304,17.928743&amp;spn=0.010606,0.021029&amp;z=15&amp;iwloc=addr&amp;output=embed" />
      </Container>
      <Policy />
    </>
  );
};
