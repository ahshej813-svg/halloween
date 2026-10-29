# NOCTURNE — KOMPLETNY KONTEKST PROJEKTU

## Cel
Prywatna interaktywna strona halloweenowa przygotowywana dla Aleksa i jego dziewczyny Sandry. Strona ma się do nich zwracać po imieniu, sprawiać wrażenie „żywej”, a z czasem może prowadzić do zagadek i interakcji. Najważniejsze na obecnym etapie jest INTRO oraz bardzo dobry wygląd na komputerze.

## Ostateczne wymagania wizualne (priorytet: ostatnia korekta użytkownika)
- Tło początkowo całkowicie czarne; atmosfera mroczna i elegancka, bez estetyki „AI slop”.
- Ilustracje w stylistyce ASCII art, **smooth i czytelne**, nie minimalne ikonki, lecz też NIE ultradrobna ziarnista mozaika. Ważna czytelna sylwetka, kształt i mimika.
- W początkowym przelocie **KSIĘŻYC ma wyglądać jak księżyc** (okrągła szara tarcza, kratery), a nie jak kolejna dynia.
- Księżyc przelatuje z lewej strony po łuku jak po fragmencie okręgu/firmamentu, nie prostą poziomą linią.
- Następnie z góry spada średnio szybko **bardzo duża dynia** ASCII. Ma być podobna do prawdziwej dyni halloweenowej: naturalne żebrowanie, ogonek, nie idealny okrąg, wycięte skośne oczy i złośliwy, wycięty uśmiech z zębami.
- Twarz dyni ma się animować, także podczas mówienia.
- Następnie pojawiają się chmury ASCII i mroczne drzewo; piorun ASCII uderza w drzewo.
- **Dopiero po piorunie** dynia zaczyna mówić do Aleksa i Sandry.
- W tle docelowo: sporadycznie latające nietoperze i przechodzące duchy, a także dyskretne filtry retro/scanlines/ziarno.
- Na razie użytkownik chciał się skupić na wykonaniu tej sekwencji, bez dokładania dalszych etapów gry.

## Najważniejsze korekty użytkownika
1. Po wczesnym projekcie poprosił o dużo lepszą, bardziej dopracowaną jakość ASCII.
2. Wersja bardzo gęstego ASCII okazała się ZBYT szczegółowa/nieczytelna.
3. Ostateczny kierunek: gładkie, wyraźne ASCII, księżyc realistycznie księżycowy, duża **naturalna, rzeźbiona dynia** z halloweenowym uśmiechem; NIE idealna kula.

## Aktualne pliki (stan na przeniesienie czatu)
- `halloween_aleks_sandra.html` — najnowsza wersja samodzielnej strony; HTML/CSS/JavaScript w jednym pliku.
- `halloween_moon_v2.png` — podgląd sceny z księżycem po korekcie.
- `halloween_pumpkin_v2.png` — podgląd dyni po korekcie.
- dodatkowe PNG — wcześniejsze podglądy scen, pioruna, wersji mobilnej (materiały pomocnicze).

## Co można potwierdzić bezpośrednio w aktualnym kodzie
- Tło #000, filtry ziarna/scanlines, ciemna winieta, gwiazdki.
- Ruch księżyca po krzywej Béziera (nie w linii prostej).
- Spadanie wielkiej dyni, zmiany mimiki, klatki twarzy ASCII.
- Chmury ASCII w tagach PRE, rysowane znakami drzewo, piorun rysowany znakami ASCII, błyski.
- Komunikaty: „Aleks... Sandra...”, „W końcu jesteście.”, „Myśleliście, że was nie zauważę?”.
- Opcjonalny przycisk głosu korzysta z syntezy mowy `speechSynthesis` przeglądarki w języku polskim; wyniki zależą od zainstalowanych głosów i polityki przeglądarki.
- Przyciski: pomijanie intro i ponowne odtworzenie.
- Responsywne reguły CSS dla telefonu.

## Czego NIE należy błędnie przypisywać obecnej wersji
- To NIE jest jeszcze prawdziwy interaktywny model AI: tekst i kolejność kwestii są ustalone w kodzie.
- Obecna główna wersja intro nie zawiera pełnych minigier, zagadek ani rozbudowanej rozmowy.
- Nie zakładaj, że nietoperze i przechodzące duchy już działają w obecnej najnowszej wersji intro — to życzenie z wcześniejszych wiadomości, do późniejszego wdrożenia.
- Podgląd PNG nie jest plikiem źródłowym ASCII; źródłem jest HTML.

## Dalszy sposób pracy
Zachowuj dotychczasowy przebieg animacji i iteruj wizualnie na podstawie uwag użytkownika. Nie zmieniaj samowolnie księżyca w dynię, nie zwiększaj przesadnie gęstości ASCII i nie dodawaj niezamówionych funkcji. Najpierw dopracuj wygląd desktopowy. Zachowaj naturalnie wyglądającą dynię i gładkie, czytelne ASCII.

## Ważne
Ten plik jest OPISEM/INTERPRETACJĄ ustaleń. Dokładne oryginalne polecenia użytkownika, bez parafrazy, są osobno w pliku `01_WSZYSTKIE_WIADOMOSCI_UZYTKOWNIKA_DOSLOWNIE.txt`. Jeśli pojawi się konflikt, priorytet mają oryginalne słowa użytkownika, zwłaszcza jego ostatnia korekta.
