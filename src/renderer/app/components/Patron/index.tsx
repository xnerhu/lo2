import * as React from 'react';

import { SectionTitle, Content } from '~/renderer/components/Section';
import { Container, Text, Image } from './style';

export default () => {
  return (
    <Content>
      <SectionTitle>Nasza patronka - Maria Konopnicka</SectionTitle>
      <Container>
        <Text>
          Maria Stanisława Wasiłowska Konopnicka urodziła się w Suwałkach 23
          maja 1842 roku. Rodzice Józef i Scholastyka Wasiłowscy przybyli do
          Suwałk w 1841 roku ze swoją pierworodną córką Wandą urodzoną rok
          wcześniej w Warszawie. Józef Wasiłowski objął funkcję obrońcy
          prokuratorii guberni suwalskiej. Był również patronem trybunału
          (adwokatem). Młode małżeństwo zamieszkiwało w domu rejenta Jana
          Zapiórkiewicza przy obecnej ul. Kościuszki 31 (dawniej Petersburskiej
          200).
          <br />
          <br />
          I w tym domu urodziła się 23 maja 1842 roku Maria Stanisława -
          przyszła wielka poetka. Wasiłowscy przebywali w Suwałkach jeszcze
          siedem lat. W ciągu tego okresu urodziło się czworo ich dzieci: Jan
          Jarosław, Laura Celina, Zofia i Jadwiga Julia. Zofia zmarła nazajutrz
          po urodzeniu i została pochowana na suwalskim cmentarzu. We wrześniu
          1849 roku Wasiłowscy opuścili Suwałki i udali się do Kalisza. Józef
          Wasiłowski objął tam takie samo stanowisko jak w Suwałkach. W Kaliszu
          w 1850 roku przyszła na świat najmłodsza siostra Marii - Celina Maria.
          W cztery lata później Scholastyka Wasiłowska osierociła liczną
          gromadkę dzieci. Po latach pisarka będzie często wspominać smutne
          sieroce dzieciństwo, trudne obowiązki, które spadły na najstarsze
          dzieci, a więc i na nią.
          <br />
          <br />
          Rok tylko była Maria na pensji Sakramentek w Warszawie i tam zetknęła
          się z Lizą Pawłowską, późniejszą Orzeszkową. Przyjaźń ich,
          scementowana wspólnymi zainteresowaniami literackimi, przetrwała całe
          życie.
          <br />
          <br />
          W 1862 roku Maria wyszła za mąż za Jarosława Konopnickiego -
          zubożałego ziemianina, dzierżawcę okolicznych majątków: Bronowa i
          Gusina. Po latach zajmowania się liczną gromadką dzieci i
          uczestniczenia w życiu towarzyskim Konopnicka zapragnęła poświęcić się
          pisarstwu. Debiutowała w 1875 roku wierszem w "Kaliszaninie". Cykl
          lirycznych wierszy "W górach" zamieścił w rok później "Tygodnik
          Ilustrowany". Konopnicka zachęcona dobrym przyjęciem wierszy przez
          rodaków i znajomych już pisarzy, m. in. Henryka Sienkiewicza,
          przeniosła się do Warszawy. Bardzo szybko jej twórczość poetycka
          przepełniona patriotyzmem i szczerym liryzmem, stylizowana "na swojską
          nutę" zdobyła powszechne uznanie. Już w latach 1881, 1883 i 1886
          ukazały się trzy kolejne serie poezji. Ten rodzaj twórczości
          kontynuowała pisarka przez całe życie. Była jednak nie tylko wybitną
          poetką, ale świetną nowelistką ("Mendel Gdański", "Miłosierdzie
          Gminy", "Nasza szkapa", "Urbanowa"). Zajmowała się także krytyką
          literacką ("Mickiewicz, jego życie i duch", "Trzy studia"). Trwałą i
          ciągle cieszącą się wielkim uznaniem częścią jej pisarskiego dorobku
          jest twórczość poetycka i prozatorska dla dzieci ("O Janku
          Wędrowniczku", "Stefek Burczymucha", "O Krasnoludkach i sierotce
          Marysi").
          <br />
          <br />
          W dowód uznania Maria Konopnicka z okazji jubileuszu 25-lecia
          twórczości otrzymała w darze od narodu dworek w Żarnowcu koło Krosna.
          Już jako znana pisarka powróciła Konopnicka do wspomnień z lat
          dzieciństwa spędzonych w Suwałkach. Poświęciła im dwa utwory: "Z
          cmentarzy" (pierwodruk: "Kurier Warszawski" nr 302 z 1887 r.) i
          "Anusia" (pierwodruk: "Tygodnik Ilustrowany" nr 319-320 z 1889 r.).
          Śmierć pisarki - 8 października 1910 roku głęboko wstrząsnęła
          społeczeństwem Suwałk. Zorganizowano wieczór poświęcony jej twórczości
          i zapoczątkowano zbiórkę pieniędzy na tablicę pamiątkową. Władze
          carskie sprzeciwiły się tej inicjatywie.
          <br />
          <br />
          Dopiero w 25-lecie śmierci - 8 października 1935 roku na domu, w
          którym się poetka urodziła wmurowano pamiątkową tablicę. W 1963 roku,
          staraniem nauczycieli suwalskich i Zarządu Głównego Towarzystwa im.
          Marii Konopnickiej w Warszawie oraz dzięki wsparciu finansowemu
          Społecznego Funduszu Odbudowy Stolicy, odsłonięto pomnik dłuta Bohdana
          Chmielewskiego. W dziesięć lat później w sierpniu 1973 roku
          zorganizowano Muzeum Marii Konopnickiej.
        </Text>
        <Image src="/static/patron" ratio={9 / 16} shadow />
      </Container>
    </Content>
  );
};
