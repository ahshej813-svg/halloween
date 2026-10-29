# HALLOWEEN — pełna specyfikacja v5 dla Codexa

> Pełen zapis tekstowy dokumentacji. Diagramy graficzne pozostają w wersji DOCX; tu najważniejsze przejścia są również opisane słownie.

> KANON = zatwierdzone; PROJEKT = liczby, klawisze i proponowane reguły do testów. W razie konfliktu sekcje 27–32 oraz najnowsze poprawki 3D mają pierwszeństwo.

# HALLOWEEN

Biblia fabularna v5  •  kanon + projekty do zatwierdzenia  •  29 października 2026

Zaktualizowany projekt interaktywnego horroru ASCII dla Aleksa i Sandry. Zawiera poprawione mapy, działanie minigier, warunki 6 zakończeń i sekretnego siódmego, sceny finałowe oraz listę stanów gry.

KANON  To, co autor zaakceptował w rozmowie, ma pierwszeństwo przed dawnymi wersjami.

PROJEKT  Szczegółowe warunki, liczby i teksty doproponowane poniżej wymagają jeszcze akceptacji; są gotową bazą do implementacji.

## 1. Niepodważalne zasady świata

- Gra nazywa się „Halloween”. Horror w przestrzennym ASCII; dwie osoby sterują niezależnie: Aleks (KS) przez WASD, Sandra strzałkami. Świat to noc, cmentarz, księżyc, kamień, wiatr, krew i absurdalny humor. Bez rzeczki i pomarańczowych latarni.
- Aleks i Sandra wybierają po jednym osobistym przedmiocie przed prologiem. Przedmiotów początkowych NIE można sobie przekazywać. Nożyce ze stołu w domku są oddzielnym przedmiotem fabularnym.
- Tom istniał przed wydarzeniami. Mściciel na cmentarzu jest klonem Toma, którego oryginał ocala podczas katastrofy. Wołanie „Tom, Tom, Tom” przyciąga uwagę / wywołuje trans Sandry, ale nie tworzy Toma.
- Po zoo bohaterowie trafiają w przeszłość. Pojawiają się Alex (pisany przez X) i Salsa. Ich los prowadzi do scen ciała przy drodze i nieznajomego na krzyżu, lecz autor sam określi dokładny przebieg tego etapu.
- Dynia ostrzega zgodnie z prawdą, a jednocześnie kieruje postaci w pułapkę. Główne zakończenie resetuje nieskończoną pętlę i pamięć obu bohaterów. Inne zakończenia mogą przerwać pętlę.
- W quizie o zwierzęciu Aleks i Sandra MUSZĄ wspólnie wybrać jedną odpowiedź; gra czeka na zgodę obojga. Nie istnieje konflikt dwóch równoczesnych wyborów.
- Wszystkie endingi mają pełne sceny, dialog i epilog; razem jest 6 zwykłych zakończeń i 7. sekretne.
## 2. Cała mapa wydarzeń — poprawiona

### Akt pierwszy: grób, krzyż, nożyce

KANON: Sandra nakłania do pomocy, ale o kolejności decyduje Aleks. Ranny może wcześniej wypowiedzieć ostrzeżenie „Nie ufajcie temu, który wygląda jak on”; gdy zbyt późno zajmą się pomocą, nie ma siły tego powiedzieć. Ze zdjęciem z krzyża i bez niego ostatecznie wykrwawia się.

### Wybór ofiary i powrót zmarłego

KANON: trzy ofiary z grobów przechodzą przez burzę i wielkiego Toma; śmierć Sandry prowadzi do karaoke; wybór Aleksa do pojedynku i Epitafium. Wyjaśniamy trzy odrębne wejścia do Goon Roomu zamiast jednej mylącej gałęzi.

### Goon Room: quiz i wspólny wybór

### Zoo, powrót i finał

KANON: w zoo Aleks musi pokonać PIĘĆ fok, Sandra przywitać PIĘĆ żółwi Tomów. Porażka Aleksa powoduje foczą klątwę, a porażka Sandry oznacza 60 sekund oczekiwania, podczas których Aleks ogląda ASCII TikToka.

## 3. Małe decyzje, duże konsekwencje

| Decyzja | Natychmiastowy skutek | Późny skutek |
| --- | --- | --- |
| Który grób | Osobny grób, model i napis | Odpowiada za jeden z 3 ataków Toma; duch ostrzega |
| Zapalenie znicza | Zapalony znicz przy grobie | Duch raz osłania przed atakiem przypisanym do grobu |
| Najpierw ratunek | Nieznajomy ma jeszcze siłę mówić | Wskazówka o sobowtórze / klonie |
| Najpierw grób | Nieznajomy słabnie | Brak tej wskazówki; późniejszy finał nadal możliwy |
| Wybrana ofiara | Jedna z pięciu rozbudowanych gałęzi | Gabryś / Weronika / Boris mają indywidualne reakcje-duchy |
| Zaufanie | Dwie indywidualne odpowiedzi | Wspólna droga, zdrada, zemsta, sekret |
| Chrupek zjedzony | Duże HP i obrażenia | Losowe szczekanie; może zdradzać pozycję |
| Lila + karma | Oswajanie przy finale | Pomoc przeciw Tomowi; ending 5 lub 7 |
| ETF: dług | Gołąb śledzi bohaterów | 10 piór = spłata; brak spłaty = pojedynek |
| Nożyce zabrane | Można zdjąć nieznajomego | Można uwolnić echa na krzyżach podczas bossa |
| Osoba pochowana | Trzywersowe Epitafium | Pochowany pamięta krzywdę; możliwa zdrada |

## 4. Wszystkie przedmioty — działanie

KANON  Aleks wybiera 1 z 6, Sandra 1 z tych samych 6 albo pluszaka. Nie ma wymiany przedmiotów, także podczas zoo; właściciel aktywuje własną umiejętność.

| Przedmiot | Zastosowanie | Status |
| --- | --- | --- |
| Rem (ASCII) | Przywołanie podczas walki z Tomem; można podłożyć własne nagranie „Rem, Rem!” podczas strzelania. Opcjonalne nagranie lokalne i domyślny dźwięk, jeśli gracz odmawia mikrofonu. | KANON / detale projektu |
| Kartka „gaźnik” | W domku ukryta fraza „KLON NIE JEST ORYGINAŁEM”. W finałowej minigrze prawdziwy Tom różni się od klonów tylko kolorem oczu; kartka ujawnia podpowiedź. | KANON |
| Karma dla psa | Pozwala oswoić demoniczną Lilę przed bossem; bez karmy walczy po stronie Toma. | KANON |
| Widelec | W zoo eliminuje jedną z 5 fok; właściciel włącza ten efekt przed rozdzieleniem bohaterów. | KANON |
| Gouda | W zoo zwabia 3 z 5 fok w pułapkę. Widelec + gouda zostawiają tylko 1 fokę do pokonania. | KANON |
| Długopis | Quiz bez krwi; łatwiejszy wybór wersów Epitafium. Bez niego pisanie krwią daje karę -3% obrażeń do końca obiegu. | KANON |
| Pluszak Toma (Sandra) | Odblokowuje opcję zdrady Toma albo manipulacji, która pozwala Aleksowi wbić mu nóż w plecy. | KANON |
| Nożyce ze stołu | Przecinanie więzów przy krzyżu oraz uwalnianie alternatywnych wersji na arenie Toma. | KANON |

PROJEKT: widelec i gouda mogą być aktywowane przez dowolnego posiadacza podczas krótkiej sceny przygotowania przed rozdzieleniem w zoo. Nie jest to przekazanie przedmiotu.

## 5. Wskrzeszenia, quiz i karaoke

### Epitafium po pojedynku Aleks–Sandra

KANON  Osoba, która wygrała pojedynek, grzebie przegraną. Tom każe napisać trzywersowy zabawny wiersz nagrobny; po ukończeniu przegrany wraca. Aleks mówi: „Z martwych wstałem jak Jezus Chrystus, szmato”. Pochowana osoba pamięta krzywdę.

PROJEKT  Zamiast swobodnego pisania: 3 wersy z rozsypanki słów. Każdy z trzech wersów ma kilka absurdalnych poprawnych kombinacji, co zajmuje około minuty. Długopis oferuje dodatkowe gotowe słowa. Przegranie nie blokuje Goon Roomu — słowa można przestawiać aż do sukcesu.

### Karaoke przy bezpośrednim poświęceniu Sandry

KANON  Przywrócenie Sandry łączy frazę „Gabryś jest spoko” z szybką imprezową minigrą. Jest do 100 szans, ale ma się dać zaliczyć znacznie szybciej. Musi istnieć alternatywa bez mikrofonu.

PROJEKT  Mikrofon służy tylko do wykrywania impulsów rytmicznych, nie do rozpoznawania polskich słów. Gra mierzy poziom tła przez 2 sekundy, przyjmuje szerokie okno rytmu i nie karze za cichy mikrofon. Tryb klawiatury: naciskaj klawisz w rytm pięciu sylab „GA-BRYŚ-JEST-SPO-KO”. Tryb można zmienić w każdej chwili. Po błędach nie ma ujemnych konsekwencji fabularnych.

### Quiz nr 3

KANON  W inkubatorze jest fikcyjna Iga. Cztery odpowiedzi, błędne znikają; na końcu należy wybrać odpowiedź nr 3 dotyczącą zabicia postaci. To celowy żart z pozornego wyboru.

## 6. Zoo i klątwa foki

KANON  Aleks ma za zadanie pokonać pięć fok. Jeśli nie zdąży, sam staje się foką, chodzi wolniej i nosi klątwę, która nie zmienia endingów. Sandra wita pięć żółwi Tomów. Jeśli się nie uda, spędza tam jeden dzień w grze (60 sekund).

KANON  Na tabliczce w dalszej części zoo jest informacja, że klątwę zdejmie Sandra, pokonując foczą postać Aleksa. Po ostatnim ciosie ludzki Aleks wyskakuje z foczego ciała, a skóra zostaje na ziemi.

PROJEKT  Starcie jest krótką sekwencją 3 trafień: Aleks przełącza się na sterowanie ruchem foki i unika, Sandra trafia wyznaczoną strefę; po 3 uderzeniach Aleks odzyskuje postać. Jeśli oboje chcą uniknąć frustracji, tabliczka daje możliwość ponowienia minigry. Do zdjęcia klątwy nie potrzeba żadnego przedmiotu.

## 7. Pożyczka i dziesięć piór

KANON  Porażka na ETF prowadzi do ASCII strony pożyczkowej szamańskiego gołębia. Pożyczka pozwala iść dalej, lecz gołąb śledzi bohaterów. Na ziemi jest 10 łatwo dostrzegalnych, świecących piór; po zebraniu wszystkich gołąb przychodzi po spłatę.

| Miejsce | Ile piór | Czytelność |
| --- | --- | --- |
| Goon Room i przejście za drzwiami | 3 | Blisko trasy i widoczne przy wyjściu |
| Zoo | 3 | Przy wybiegach fok i żółwi, bez ukrytych ścieżek |
| Droga po cofnięciu czasu | 4 | Na kamieniach i ścieżce do bramy; proste do zauważenia |

PROJEKT  Licznik 0/10 zawsze widoczny przy aktywnym długu. Ostatnie brakujące pióra mogą pulsować mocniej; nie ma losowego spawnu. Po zebraniu 10 gołąb przylatuje w najbliższej spokojnej scenie, mówi „Dług uregulowany”, odbiera pióra i znika.

PROJEKT  Jeśli do finału nie uzbierali 10, gołąb blokuje przejście: „Oddawaj pióra albo walcz o anulowanie odsetek”. Krótka walka z gołębiem 30–45 sekund, bez twardego game over i bez blokady któregokolwiek endingu. Odmowa spłaty uruchamia komiczny pościg gołębia aż do bossa.

## 8. Finał: boss Tom, klony i trzy ataki grobowe

### Przed walką: prawdziwy Tom

KANON  Prawdziwy Tom może różnić się od klonów wyłącznie kolorem oczu. Klony krążą wokół graczy, a ci muszą rozpoznać oryginał w ograniczonym czasie. Kartka „gaźnik” daje wskazówkę.

PROJEKT  Trzy identyczne modele Toma obracają się po okręgu przez 12 sekund. Oryginał: złote oczy; klony: czerwone. Kartka spowalnia obrót i wyświetla przez sekundę napis „ZŁOTE OCZY”. Błędny wybór powoduje jeden dodatkowy atak w fazie bossa; można nadal wygrać.

### Walka: dwie fazy

1. Faza 1: Sandra, opętana, wybija rytm strzałkami, aby przerwać trans. Aleks WASD unika fal żółwi; Rem może zatrzymać jedną falę.
1. Faza 2: Angry Tom w czarnej arenie z pentagramem i krzyżami. Nożyce pozwalają uwolnić alternatywne wersje Aleksa i Sandry. Ich projekcje wpadają w Toma i eksplodują, zadając obrażenia. Bez nożyc boss jest trudniejszy, nie niemożliwy.
1. W trakcie fazy 2 pojawia się atak zależny od odwiedzonego grobu (poniższa tabela). Znicz raz uruchamia pomoc ducha. Duchy Gabrysia, Weroniki i Borisa komentują walkę po chińsku.
| Odwiedzony grób | Atak Toma | Jak uniknąć | Korzyść ze znicza |
| --- | --- | --- | --- |
| Gabryś | MEIMEI APOKALIPSA: wielki kot ASCII zostawia 3 czerwone pasy pazurów. | Przeskocz / przejdź do bezpiecznej luki między pasami. | Duch Gabrysia raz rozprasza kota. |
| Weronika | KLĄTWA WIEDŹMY: 3 wybuchające kręgi; 1 przez moment śledzi Sandrę. | Sandra wyprowadza krąg z dala od Aleksa; oboje wybiegają ze stref. | Duch Weroniki rozprasza 1 krąg. |
| Boris | KRYPTO KRACH: zielone świeczki wyrastają z podłogi; czerwone spadają z góry. | Wybierz prześwit na wykresie i obserwuj zapowiedź kierunku. | Duch Borisa zamienia 1 świecę w osłonę. |

PROJEKT  Każdy atak ma 1,5 sekundy widocznego ostrzeżenia. Znicz daje tylko jedno uratowanie niezależnie od tego, czy dany duch jest poświęconą ofiarą. Nie ma nieuniknionych obrażeń.

### Duchy i ofiara z aktu pierwszego

KANON  Gabryś może przestać przeszkadzać po wspólnym potwierdzeniu, że Chrupek jest lepszy od Lili i Areny. Weronika rzuca klątwę obniżającą maksymalne HP; Sandra może nazwać ją wiedźmą. Boris w trakcie walki prowokuje losowe rozmowy o kryptowalutach.

PROJEKT  Duch poświęconej osoby komentuje jej śmierć bardziej złośliwie. Gabryś przestaje przeszkadzać dopiero po wypowiedzeniu i potwierdzeniu kwestii przez oboje; Weronika stosuje drobną, czasową klątwę, Boris tylko rozprasza dialogami. Pozostałe duchy nie znikają, nawet jeśli bohaterowie nie odwiedzili ich grobu.

## 9. Zasady wyboru 7 zakończeń

Wszystkie warunki niżej są PROJEKTEM do zatwierdzenia, z wyjątkiem podstawowych sytuacji już wskazanych jako kanon. Zakończenia nie przyznają się automatycznie po samym posiadaniu przedmiotu: końcowa decyzja gracza ma pierwszeństwo.

| Ending | Warunek aktywacji | Stan pętli |
| --- | --- | --- |
| 1. Nieskończona noc | Zwykłe pokonanie Toma i brak decyzji o ucieczce z Lilą, zdradzie lub sekretnym rytuale. | Pełny reset, utrata pamięci |
| 2. Impreza Halloween | Wspólny wybór Areny i porażka w miauczeniu → gołębie. | Osobny finał; powrót do checkpointu przed zwierzęciem |
| 3. Sandra Toma | Sandra ma pluszaka, nie ufa Aleksowi lub ma urazę po pochówku, świadomie przyjmuje ofertę Toma. | Pełny reset |
| 4. Nóż w plecy | Sandra ma pluszaka, wybiera udawany rozejm, Aleks zgadza się zaatakować Toma. | Pełny reset |
| 5. Lila przeciw panu | Wspólny wybór Lili, karmę posiada któreś z bohaterów, Lila została oswojona; po walce wybierają ucieczkę za jej cenę. | Pętla przerwana, Lila pozostaje uwięziona |
| 6. Dwa cienie | Oboje nie ufają lub istnieje uraza po pochówku; jedno świadomie porzuca drugie przy bramie ucieczki. | Jedna osoba wolna, druga w pętli |
| 7. Ostatni świt [SEKRET] | Aleks wybrał karmę, Sandra pluszaka, oboje ufają sobie, wybrali Lilę i ją oswoili, wzięli nożyce, uwolnili min. 2 echa i wybierają walkę z dynią. | Pętla przerwana, oboje i Lila wolni |

PROJEKT  Gdy warunki 5 i 7 są spełnione równocześnie, para podejmuje JAWNY wybór: „Uciekaj z Lilą” (5) lub „Złam zasady dyni” (7). Brak przypadkowego przełączenia endingów. Sandra z pluszakiem widzi oddzielnie opcje 3 i 4. Ending 6 wymaga wyraźnej deklaracji zdrady.

## 10. Siedem pełnych szkiców finałowych

### Ending 1 — NIESKOŃCZONA NOC

1. Pokonany Tom upada. Na arenie gasną krzyże, bohaterowie pierwszy raz widzą jaśniejące niebo. Sandra mówi, że chyba wreszcie są wolni.
1. Na drodze pojawia się pierwsza dynia. Zaczyna się śmiać i tłumaczy, że Tom był tylko jednym z elementów jej gry; przy każdym obiegu bohaterowie sami doprowadzają historię do znanych wydarzeń.
1. Kamera gwałtownie cofa się przez zoo, cmentarz i drogę, do identycznego ujęcia księżyca z prologu.
1. Czarny ekran: „Możesz wybrać każdą drogę. Ale nie możesz wybrać, dokąd prowadzi.” Słychać początkowe ostrzeżenie dyni. Bohaterowie budzą się bez pamięci.
Epilog: pętla zaczyna się ponownie. Drugie dno: nie mogą zmienić losu, dopóki grają według reguł dyni; inne endingi dowodzą, że reguły można złamać.

### Ending 2 — IMPREZA HALLOWEEN

1. Niezaliczona sekwencja miauczenia. Gołębie wypełniają cały ekran, zakrywają obraz, dźwięki rozciągają się do ciszy.
1. Aleks i Sandra otwierają oczy na imprezie halloweenowej. Wspominają sen o cmentarzu, ale każdy pamięta trochę inny fragment.
1. Wychodzą na zewnątrz; światła samochodu nagle wypełniają ekran. Słychać uderzenie, następuje ciemność.
1. Głos z ciemności mówi: „A może to tamta noc była snem?”. Pojawia się obraz pióra na asfalcie — niejednoznaczne zakończenie.
Epilog: wybór „Wróć przed pytanie o zwierzę” przywraca checkpoint, aby gracze mogli wybrać inną ścieżkę. To nie jest zwykły reset pamięci dyni.

### Ending 3 — SANDRA TOMA

1. Przed walką Tom zwraca uwagę na trzymanego przez Sandrę pluszaka. Przypomina jej brak zaufania do Aleksa albo fakt, że została przez niego pochowana.
1. Sandra widzi osobny wybór: „Zostań z Aleksem” / „Przejdź na stronę Toma”. Po świadomym wyborze zdrady jej strzałki zaczynają sterować atakami żółwi.
1. Aleks próbuje uciec, ale Sandra blokuje przejście. Tom mówi: „To nie ja cię zdradziłem, Aleks.” Za nimi widać dynię, która zamyka bramę.
1. Sandra dostaje od Toma koronę z małych pluszowych żółwi. Gdy oboje triumfują, dynia kasuje całą scenę i resetuje noc.
Epilog: Sandra na nowo stoi po prawej stronie ekranu wyboru przedmiotów, nie pamięta zdrady, ale przez ułamek sekundy pluszak sam odwraca głowę.

### Ending 4 — NÓŻ W PLECY

1. Sandra pokazuje pluszaka i proponuje Tomowi rozejm. Tom zgadza się, opuszcza gardę, robi absurdalnie długą mowę zwycięstwa.
1. Sandra wyciąga ceremonialny nóż należący do Toma i podaje go Aleksowi. Na ekranie Aleksa pojawia się jednorazowy wybór „Teraz” / „Nie rób tego”.
1. Jeśli Aleks wybiera „Teraz”, scena zwalnia: Aleks wbija nóż Tomowi w plecy, Tom obraca głowę o 180 stopni i mówi: „To było niegrzeczne”.
1. Tom rozsypuje się na kopie, które gasną jedna po drugiej. Dynia komentuje: „Zabiłeś rolę, nie reżysera”. Następuje reset.
Epilog: na nowej pętli w kamieniu cmentarza na chwilę tkwi znajomy nóż — ślad, którego bohaterowie nie rozumieją.

### Ending 5 — LILA PRZECIW PANU

1. Przed bossem gracz z karmą oswaja Lilę. Lila staje naprzeciw Toma w swojej demonicznej formie i odmawia wykonania polecenia.
1. Wspólna walka kończy się otwarciem pęknięcia za areną. Lila tłumaczy, że potrafi utrzymać przejście, ale pozostanie po drugiej stronie.
1. Aleks i Sandra wybierają ucieczkę. Lila zostaje jako strażniczka przejścia; dynia nie może już cofnąć bohaterów do prologu.
1. Po świcie ludzie stoją na pustej drodze. W scenie po napisach dwie Lile siedzą naprzeciwko siebie w pustym zoo. Jedna ma czerwone oczy.
Epilog: pętla bohaterów przerwana, ale finał celowo pozostawia wątpliwość co do losu Lili i jej kopii.

### Ending 6 — DWA CIENIE

1. Przy pęknięciu w świecie dynia ogłasza, że przez przejście może przejść tylko jedna osoba. Jest to propozycja ucieczki kosztem partnera, a nie obiektywne prawo świata.
1. Jeśli wcześniejsze odpowiedzi lub pochówek otwierają zdradę, bohaterowie dostają osobne decyzje: „Zostań razem” albo „Porzuć”. Zdrajca zamyka przejście za sobą.
1. Jedna osoba wychodzi na pustą ulicę. Nie ma nikogo, nawet dźwięków. Za jej plecami powstaje drugi cień, choć stoi sama.
1. Wewnątrz pętli pozostała osoba ponownie słyszy ostrzeżenie dyni. Ocalona poza pętlą nie potrafi wrócić.
Epilog: pętla trwa dla pozostawionej osoby, a uciekinier zostaje w bezludnym świecie; osobny wariant kwestii w zależności, kto kogo zdradził.

### Ending 7 — SEKRETNY: OSTATNI ŚWIT

1. Warunki spełnione: Aleks ma karmę, Sandra pluszaka, wspólnie wybrali Lilę, oboje sobie ufają, Lila została oswojona, nożyce uwolniły co najmniej dwa echa, nikt nie wybrał zdrady.
1. Po Tomie pojawia się sama dynia. Zamiast zwykłej ucieczki para wybiera „Złam zasady dyni”. Otwiera się nowa arena z mechanizmem trzech pierścieni.
1. Minigra: Aleks przesuwa trzy kamienne symbole WASD, Sandra obraca trzy pierścienie strzałkami. Trzeba dopasować symbol księżyca, krzyża i dyni; Lila przytrzymuje mechanizm, aby gracze mieli czas. Pomyłki resetują tylko układ, nie całą grę.
1. Po ułożeniu symboli oboje w tym samym momencie zatwierdzają zerwanie pętli. Dynia próbuje uruchomić prolog, ale kolejno znikają znane sceny. Uwolnione wcześniej echa odzyskują swoje prawdziwe postacie; eksplozje na arenie były wyładowaniem projekcji, a nie zabiciem oryginałów.
1. Zaczyna wschodzić prawdziwe słońce. Aleks, Sandra i Lila wychodzą z cmentarza. Ostatni kadr: dynia jest tylko zwykłą dynią, nieruchomą przy drodze.
Epilog: pętla naprawdę przerwana. Ocalają także alternatywne wersje i Lilę. Można umieścić ostatnią, absurdalną kwestię Aleksa, ale bez podważania zwycięstwa.

## 11. Priorytety stanów i zabezpieczenia przed zablokowaniem gry

- Checkpoint przed wspólnym wyborem zwierzęcia; ending 2 odtwarza ten moment, zamiast wymuszać cały prolog.
- Pożyczka nigdy nie zamyka zakończeń na stałe. Dziesięć piór gwarantuje spłatę, alternatywny pojedynek odblokowuje przejście, jeśli pióra pominięto.
- Przegrana w karaoke nie ma stałej kary. Domyślny tryb opiera się na rytmie i głośności; brak mikrofonu natychmiast przełącza na klawisz.
- Brak nożyc uniemożliwia część ułatwień oraz sekretny ending, ale zwykłą walkę z Tomem można wygrać.
- Fokowa klątwa nie blokuje trasy ani żadnego endingu; Sandra może ją zdjąć po powrocie bohaterów do wspólnej lokacji.
- Kolejność przyznania endingów: 2 po wyzwoleniu przez Arenę; 3/4/6 tylko po jawnej zdradzie lub planie; 7 i 5 po świadomym końcowym wyborze; w pozostałych wypadkach 1.
- Tom/Mściciel, klony i oryginał mogą używać zbliżonych modeli, lecz minigra kolorów oczu musi być czytelna również bez rozróżniania kolorów (alternatywne oznaczenie na żądanie w ustawieniach).
- Pamięć Aleksa i Sandry kasuje się dopiero przy pełnym resecie pętli; w ramach jednego obiegu pamiętają wybór o zaufaniu, grób, ofiarę i pochówek.
- Pierwotne sceny Alexa (X) i Salsy pozostają do napisania przez autora. Nie należy tworzyć ich sposobów śmierci bez jego decyzji.
- Różne wykorzystanie Rema, używanie widelca i goudy lub ducha nie może powodować softlocka ani wymagać perfekcyjnego wykonania.
## 12. Zmienne stanu dla implementacji

Sugerowane nazwy techniczne. Takie flagi pozwolą rozdzielać dialogi i endingi bez ręcznego kodowania dziesiątek ścieżek.

| Stan | Przykładowa wartość |
| --- | --- |
| grave_visited | gabrys \| weronika \| boris |
| grave_candle | true \| false |
| help_order | person_first \| grave_first |
| scissors_owned | true \| false |
| sacrifice | gabrys \| weronika \| boris \| sandra \| aleks |
| aleks_trusts_sandra / sandra_trusts_aleks | true \| false |
| buried_by | none \| aleks \| sandra |
| animal_choice | chrupek \| lila \| arena \| etf |
| lila_tamed / chrupek_eaten | true \| false |
| debt_active / feathers_collected | bool / 0..10 |
| aleks_seal_curse | true \| false |
| echoes_freed | 0..N |
| final_choice | fight \| tom_team \| knife \| lila_exit \| abandon \| pumpkin_ritual |

## 13. Otwarte decyzje autora (celowo nie dopisane)

- Wydarzenia, w wyniku których Alex (X) i Salsa stają się człowiekiem na krzyżu i ciałem przy drodze.
- Finalne brzmienie nowych dialogów, m.in. głos Toma, gołębia i sekwencja po walce z dynią.
- Czy ending „Dwa cienie” ma być zawsze ciężki i niepokojący, czy również absurdalny.
- Czy końcowe sceny mają być możliwe do pominięcia przy ponownym przechodzeniu gry.
- Dokładny czas wszystkich minigier, liczby HP, obrażeń oraz ustawienia ułatwień — wartości projektu pozostają robocze.
Zasada redakcyjna: starsze wersje zakładające zakończenie gry na akcie I są materiałem archiwalnym. Aktualna opowieść obejmuje Goon Room, zoo, pętlę, walkę i siedem zakończeń.

# HALLOWEEN

BIBLIA FABULARNA v5 — SYSTEMY GRY I WYDAJNOŚĆ

Dodatek techniczny do biblii fabularnej. Stan: 29 października 2026. KANON: gra ma rzeczywisty świat TRÓJWYMIAROWY 3D z estetyką ASCII; lokalny co-op na jednej klawiaturze laptopa; świat i walka nie są płaską grą 2D. Wersja v5 zastępuje starszą rekomendację Canvas 2D jako silnika świata.

KANON  Ustalone przez autora: dwie postacie, WASD i strzałki; gra imprezowa, trzy ataki grobowe plus zwykłe ataki Toma; 7 endingów; minigry i powiązane stany zachowane z v3.

PROJEKT  Wszystkie poniższe liczby HP, czasy, przypisania klawiszy, obrażenia i algorytmy są propozycją balansu, gotową do testów i korekty.

RESEARCH  Wnioski o renderowaniu, pętli gry, klawiaturach, dźwięku i profilowaniu oparto na MDN, Microsoft i Chrome DevTools. Pełne adresy źródeł znajdują się na końcu dokumentu.

## 14. Specyfikacja celu i zakresu technicznego

| Element | Decyzja projektowa / mierzalny cel |
| --- | --- |
| Platforma | Gra przeglądarkowa (Chrome / Edge na Windows), lokalny co-op na JEDNEJ klawiaturze; bez obowiązkowego serwera i konta. |
| Styl | W pełni przestrzenne 3D: Three.js + WebGL 2, modele i oświetlenie 3D, shaderowy efekt ASCII; ciemnoczerwona krew, kamienna droga, noc, pogoda i filmy kamery. Płaski Canvas 2D NIE jest silnikiem świata. |
| Wydajność | Cel: ~60 FPS podczas typowej gry na przetestowanych zwykłych laptopach; adaptacyjny tryb 30 FPS na słabszych. To cele, nie gwarantowany wynik bez kodu i benchmarków. |
| Pętla symulacji | 60 aktualizacji logiki/s, renderowanie zależne od odświeżania. Nie przyspieszać czasu gry na ekranach 120/144 Hz. |
| Rozdzielczość | Testować 1366×768 i 1920×1080; skalowanie świata jako spójna siatka ASCII. Zachować czytelność tekstu również przy 125–150% skali systemu. |
| Zasada dostępności | Każda minigra ma alternatywę bez mikrofonu, przegrywanie nie blokuje kampanii, nie polegać jedynie na barwach oczu albo alarmów. |
| Zakres audytu | Dokument określa projekt; nie ocenia aktualnego FPS, zużycia pamięci ani błędów kodu, bo kod i testowe buildy nie zostały dostarczone. |

## 15. Sterowanie: dwa stanowiska na jednej laptopowej klawiaturze

KANON  Aleks: WASD. Sandra: strzałki. Oba zestawy działają jednocześnie; rozdzielone role, osobne przedmioty.

RESEARCH  Klawiatury mogą nie rejestrować pewnych trzech–sześciu klawiszy wciśniętych jednocześnie (ghosting). Nie jest to błąd JavaScriptu; trzeba testować fizyczne kombinacje i oferować rebinding.

| Czynność | Aleks (lewa ręka) | Sandra (prawa ręka) | Sposób użycia |
| --- | --- | --- | --- |
| Ruch | W / A / S / D | Strzałki | Ciągłe trzymanie; normalizacja ruchu po przekątnej. |
| Atak podstawowy | Spacja | Prawy Shift | Tap = jeden zamach; trzymanie = auto-powtórzenie z cooldownem. Tylko gdy postać jest w zasięgu przeciwnika. |
| Interakcja / dialog / podnoszenie | F | Enter | Tap przy obiekcie. Dłuższe trzymanie tylko do wskrzeszania lub uwolnienia echa. |
| Unik / krótki doskok | Lewy Shift | Prawy Ctrl | Tap, z cooldownem, w bieżącym kierunku ruchu; jeśli klawiatura nie posiada prawego Ctrl — zamiana obowiązkowa. |
| Specjal / przedmiot | E | Kropka (.) | Jedno naciśnięcie; zależnie od ekwipunku oraz sceny. |
| Wybór decyzji | W/S + F | Góra/dół + Enter | Przy osobnych pytaniach każde wybiera samodzielnie. Przy wspólnych wyborach wymagane dwie zgodne odpowiedzi. |
| Pauza i ustawienia | Esc | Esc | Jeden przycisk pauzuje CAŁĄ lokalną symulację. |
| Restart nieudanego etapu | Przycisk ekranowy po porażce | Przycisk ekranowy po porażce | Tylko gdy gra pyta, bez przypadkowego resetu. |

Plan B na klawiaturach z ghostingiem: zamienić atak Sandry na Enter, interakcję na prawy Shift; albo przypisać oba działania od nowa. Konfigurator testuje ruch W+D+atak Aleksa równocześnie z ruchem ↑+←+atakiem Sandry i informuje, gdy któregoś wejścia nie zarejestrowano. Układ powyżej NIE jest uniwersalnie sprawdzony.

- Osobne funkcje zamiast dziesięciu ataków pod oddzielnymi klawiszami. Atak wybiera automatycznie najbliższy wrogi cel w promieniu i kierunku postaci; kamera nie wymaga celowania myszką.
- Wszystkie interakcje fabularne wymagają wyraźnego potwierdzenia, nie używać tego samego przycisku do przypadkowego wyboru ofiary przy końcu dialogu.
- W przeglądarce mapować fizyczne KeyboardEvent.code, z rozsądnym zapasowym event.key; rozróżniać ShiftLeft/ShiftRight i ControlRight. Obsługiwać keydown/keyup; nie opierać ruchu na powtórzeniach klawiatury.
- Gdy gra ma focus, blokować domyślny scrolling od strzałek i spacji; nie przechwytywać wpisywania tekstu do pól dialogowych, pozwalać na standardowe przejście fokusu, czyścić stan klawiszy po utracie focusu.
- Remap wszystkich klawiszy, kontrola kolizji przypisań, możliwość zmiany prawy Ctrl/Shift. Nigdy nie wymagać numpada ani F1–F12.
## 16. System walki — reguły wszystkich starć

PROJEKT  Prosty, szybki brawler ASCII z automatycznym namierzaniem i czytelnymi zapowiedziami ataków. Wartości liczbowe do testów.

| Parametr | Aleks | Sandra | Uwagi |
| --- | --- | --- | --- |
| HP maksymalne | 100 | 100 | Indywidualne paski stale widoczne. |
| Ruch | 4,2 pola/s | 4,4 pola/s | Ruch mierzony w jednostkach świata 3D na płaszczyźnie XZ; wysokość Y dla dekoracji, uderzeń i przejść. |
| Atak podstawowy | 12 DMG; 0,45 s odstępu | 10 DMG; 0,40 s odstępu | Trzymanie klawisza automatyzuje zamachy; nie trzeba wciskać 10 razy/s. |
| Atak specjalny — gdy brak przedmiotu aktywnego | Ciężki zamach: 28 DMG; 8 s odnowy | Tarcza: 1,2 s osłony; 10 s odnowy | Specjal aktywny z przycisku; nie przytrzymywać. |
| Unik | 0,22 s ruchu; 1,8 s odnowy | 0,22 s ruchu; 1,8 s odnowy | Przez 0,18 s nietykalność; widoczne poświaty ASCII. |
| Po trafieniu | 0,45 s ochrony | 0,45 s ochrony | Brak łańcucha obrażeń od kilku klatek tego samego pocisku. |
| Zasięg ataku | 1,8 pola | 2,0 pola | Namierzanie położenia przeciwników na XZ, zasięg i kąt względem postaci w 3D; nie atakować przez ściany. |
| Pomoc partnerowi | F trzymane 2 s | Enter trzymane 2 s | W pobliżu powalonego partnera; po powstaniu 30 HP. Podczas ciężkiej fazy boss jest checkpoint. |

### 16.1 Logika trafień i balans

1. Oblicz wejścia obu graczy dla tej samej klatki symulacji; ustal kierunki, ruch i kolizje z otoczeniem. Ruch po przekątnej = taka sama prędkość jak w osi.
1. Atak: sprawdź cooldown, zasięg, sektor oraz czy nie jest aktywna scenka. Zamach wybiera jednego najbliższego celu, a jego trafienie następuje w stałym momencie animacji. Nie liczyć trafień od FPS.
1. Atak bossa: widoczny warning i aktywacja hitboxu po określonym czasie. Unik / tarcza blokuje obrażenia; postać ma krótką ochronę po otrzymanym trafieniu.
1. Gdy jedna postać ma 0 HP, pada na ziemię; druga może ją podnieść. Gdy oboje mają 0 HP — powrót do checkpointu aktualnej fazy, z odtworzonymi zasobami i stanem fabuły.
1. Postacie nie ranią się zwykłymi atakami podczas kampanii; wyjątek stanowi dobrowolny pojedynek Aleks–Sandra oraz scena zdejmowania foczej klątwy.
1. Oboje atakują przeciwnika w ciągu 0,6 s: jednorazowy bonus COMBO +18 DMG na maks. 5 s. Bonus zachęca do współpracy, ale nie wymusza naciśnięcia dokładnie w tej samej milisekundzie.
Cel czasu pojedynczej zwykłej potyczki: 15–40 s; pojedynek minigrowy 30–60 s; obie fazy finałowego Toma łącznie około 2–4 min z możliwością restartu fazy. Wstępne liczby HP/DMG należy dostroić po testach dwóch osób na laptopie.

### 16.2 Zwykli przeciwnicy i cele

| Typ | Zachowanie | Atak / obrona | Zasada porażki |
| --- | --- | --- | --- |
| Foka w zoo | Zbliża się do Aleksa; po trafieniu odskakuje | 2 trafienia bazowe, 12 dmg kontaktowe, jasno sygnalizowana szarża | Nieukończenie 5 fok w limicie aktywuje klątwę. |
| Szamański gołąb (dług) | Krąży po obrzeżach areny, nie znika z ekranu | Wysyła 3 pióra jako pociski; można odeprzeć unikami | Wygrana anuluje dług; porażka = ponów walkę, bez softlocka. |
| Diabelska Lila | Strefy szarży i krótkie skoki | Walka obok Toma, jeśli nieoswojona; po karmie walczy za graczy | Jej obecność nie może uniemożliwiać zwycięstwa nad Tomem. |
| Klon Toma | Służy do zmyłki i jednej sekwencji ataków | Oryginał odróżnia kolor oczu; wspomaganie tekstem w ustawieniach | Pomyłka = dodatkowa trudna fala, nie automatyczny game over. |
| Focza forma Aleksa | Sterowana przez Aleksa tylko podczas minigry zdjęcia klątwy | Sandra trafia 3 razy specjalny hitbox skorupy | Aleks odzyskuje ludzką postać; można ponawiać. |

## 17. Tom — kompletny zestaw ataków

KANON  Dwie fazy; w fazie 1 Sandra łamie trans strzałkami, Aleks unika żółwi; w fazie 2 Angry Tom z pentagramem, krzyżami i echami. Odwiedzony grób wybiera jeden specjalny atak grobowy.

PROJEKT  Regularne ataki opisane niżej są nowym projektem, nie zamiennikiem trzech zaakceptowanych ataków grobowych.

| Atak Toma | Zapowiedź | Efekt i unik | Częstotliwość |
| --- | --- | --- | --- |
| Rząd żółwi | 1,8 s: czerwone pasy na ziemi; co najmniej 1 szeroki bezpieczny korytarz | Żółwie przebiegają poziomo. Co najmniej jedna bezpieczna luka; oboje mogą przejść. 15 DMG. | Faza 1 i 2; 7–11 s |
| Łapa gniewu | 1,8 s: wyraźna CZERWONA STREFA w kształcie koła/decal na podłożu XZ dokładnie tam, gdzie uderzy łapa; nieruchoma po zablokowaniu celu | Łapa uderza po upływie sygnału; gracze wychodzą z koła albo robią unik. 18 DMG; czerwony obszar znika dopiero po uderzeniu. | Faza 2; 8–12 s |
| Krzyżowy promień | 1,4 s: cienkie znaki +, potem pogrubienie | Dwa przecinające się promienie z krzyży. Bezpieczne narożniki. 16 DMG. | Faza 2; 12–16 s |
| Pentagram pulsuje | 2,3 s: szeroki pulsujący czerwony pierścień i duża bezpieczna luka; wolna fala oznaczona na podłożu | Fala od środka ku krawędzi w ~2–3 s, duża luka pozwalająca przejść zwykłym ruchem; unik daje drugi sposób. 13 DMG. ZERO wymaganych skoków. | Faza 2; 15–20 s |
| Szarpnięcie czasu | 1,2 s: znaki << przy krawędzi | Krótki przyciąg do środka, potem opóźnione uderzenie w centralnym polu. 14 DMG. | Faza 2; 18–24 s |
| Deszcz przeklętych dyni | 1,5 s: 3 wyraźne kręgi na ziemi | 3 meteory spadają kolejno, nigdy na całą arenę jednocześnie. 12 DMG/szt. | Faza 2; 13–18 s |
| Przemarsz klonów | Krótki dźwięk i symbole oczu | Trójwymiarowe modele klonów przechodzą przez arenę, pozostawiając duże przejścia; kolizja w XZ, 12 DMG. | Faza 2; wybrane przejście fazowe |

Zasady czytelności: każdy zwykły atak ma własny kształt zapowiedzi, nie tylko kolor; nigdy nie łącz dwóch wzorów tak, aby zamknąć wszystkie bezpieczne drogi. Kolizje z hitboxami, nie z każdą ozdobną literą.

### 17.1 Harmonogram faz i trudność

| Moment | Zachowanie systemu |
| --- | --- |
| Faza 1 — uruchomienie | Sandra w transie: rytm czterech sekwencji strzałek po 3–4 wejścia. Aleks robi uniki przed żółwiami. Po 2 błędach sekwencja powtarza się bez cofania całej sceny. |
| Faza 1 — zakończenie | Po udanym rytmie Sandra odzyskuje kontrolę, wspólna krótka cutscenka, checkpoint BOSS_2. |
| Faza 2 — 100% HP bossa | Tom 700 HP (roboczo). Wykonuje zwykłe ataki w rotacji, maksimum jedna duża strefa obrażeń naraz. |
| Faza 2 — 70% HP | Tom uaktywnia atak przypisany do odwiedzonego grobu, z mocnym ostrzeżeniem i opcjonalną pomocą ducha. |
| Faza 2 — 45% HP | Dostępne ratowanie ech nożycami, animacje wbiegnięcia echa i obrażeń (propozycja 80 DMG za projekcję). |
| Faza 2 — 25% HP | Minigra wyboru prawdziwego Toma spośród klonów albo jest odpalana przed fazą 2 — obie wersje można przetestować; ostateczną kolejność ustali autor. |
| Faza 2 — 0% HP | Wstrzymanie walki i wyświetlenie wyłącznie endingów, do których warunki są spełnione. Żaden ending nie uruchamia się bez właściwego wyboru. |

### 17.2 Trzy ataki grobowe + duchy

| Grób | Atak specjalny | Unik | Skutek zapalenia znicza |
| --- | --- | --- | --- |
| Gabryś | MEIMEI APOKALIPSA: wielki kot zostawia 3 pasy pazurów; 1,5 s zapowiedzi. | Stań w wolnym pasie; 18 DMG za trafienie. | Duch raz rozprasza kota i chroni przed falą. |
| Weronika | KLĄTWA WIEDŹMY: 3 kręgi, 1 chwilę śledzi Sandrę; 1,5 s zapowiedzi. | Wyprowadzić krąg, a potem obie postacie opuścić pola; 18 DMG. | Duch raz rozprasza krąg; Sandra komentuje wiedźmę. |
| Boris | KRYPTO KRACH: rosnące zielone słupki i spadające czerwone świece; 1,5 s zapowiedzi. | Przechodzić między wyraźnymi przerwami; 18 DMG. | Duch raz zmienia spadającą świecę w osłonę. |

## 18. Przedmioty i zdolności — spięcie z walką

| Przedmiot | Kontekst i przycisk | Efekt oraz ograniczenie |
| --- | --- | --- |
| Rem | Walka: E / kropka, jeśli przedmiot właściciela | Jedna salwa zatrzymuje najbliższy rząd żółwi i zadaje 35 DMG Tomowi; 14 s cooldown (projekt). Własny dźwięk „Rem, Rem” odtwarzany opcjonalnie i tylko lokalnie. |
| Gaźnik | Domek: automatycznie przy oględzinach; klony: E/kropka | Wskazówka KLON NIE JEST ORYGINAŁEM; minigra klonów spowalnia obrót i ujawnia podpowiedź do oczu. Bez kartki minigra nadal wygrywalna. |
| Karma dla psa | Przed walką z Tomem: E/kropka w pobliżu Lili | Oswaja Lilę raz; od tej chwili pomaga na arenie (np. co 14 s kontruje jedną łapę). Nie można przekazać karmy drugiej postaci. |
| Widelec | Przygotowania w zoo: E/kropka | Automatycznie eliminuje 1 z 5 fok. Działa, nawet jeśli właścicielem jest Sandra — aktywacja PRZED podziałem lokacji. |
| Gouda | Przygotowania w zoo: E/kropka | Wabienie do pułapki usuwa 3 z 5 fok. Razem z widelcem zostaje 1 foka, ale tylko jeśli różni właściciele wybrali te przedmioty. |
| Długopis | Quiz i Epitafium: pasywny | Quiz bez krwi; daje więcej gotowych wariantów wersów. Brak długopisu: -3% DMG po pisaniu krwią, liczone osobno dla postaci. |
| Pluszak Toma | Sandra, finał: wybór fabularny | Otwiera świadome przejście do Toma albo pozorowany rozejm. Nie oznacza automatycznej zdrady. |
| Nożyce | Domek: F / Enter; arena: F / Enter | Przedmiot fabularny grupowy; brak wymiany przedmiotów osobistych. Echa można uwolnić, stojąc przy krzyżu i przytrzymując interakcję przez 1 s. |

Uwaga o przedmiotach: w v3 ustalono jedną rzecz na osobę i brak przekazywania. Żeby sekretny ending był możliwy, jednoczesne używanie karmy przez Aleksa, pluszaka przez Sandrę i zdobycie nożyc w świecie jest legalne.

## 19. Wszystkie minigry — pełna pętla, porażka i zabezpieczenie

| Minigra | Start i sterowanie | Wygrana / porażka / checkpoint |
| --- | --- | --- |
| Wybór osobistych przedmiotów | Podzielony ekran, Aleks W/S+F, Sandra ↑/↓+Enter. Każde wybiera jedno. | Dwa potwierdzenia; brak wymiany później. W menu czytelny opis zastosowania bez spoilerów. |
| Ratunek nieznajomego | Aleks wybiera kolejność; Sandra zachęca. Nożyce zbiera się w domku, przy krzyżu interakcja. | Jeśli najpierw pomoc, ranny ostrzega. Po uwolnieniu wykrwawia się przy krzyżu; bez nożyc ginie związany. Obie wersje kontynuują akt. |
| Wybór ofiary | Aleks wybiera 1 z 5, F zatwierdza po dodatkowym potwierdzeniu. | Trzy ofiary → burza/Tom; Sandra → karaoke; Aleks → pojedynek i Epitafium. |
| Pojedynek Aleks–Sandra | Krótka arena PvP, obaj mają ruch, atak i unik; cel 3 czyste trafienia. | Przegrany pochowany; zwycięzca pisze Epitafium. Po wygranej quiz zawsze osiągalny. |
| Epitafium | 3 wersy ze słów; strzałki lub WASD w roli selektorów, F/Enter zatwierdzają. | Trzy absurdalne, poprawnie złożone wersy; nieograniczone przestawianie, podpowiedź po 30 s; wskrzeszenie. |
| Karaoke Toma | 5 sylab w rytmie na mikrofonie albo na przycisku F/Enter; automatyczna 2–3 s kalibracja. | 3/5 lub 4/5 trafień wystarcza; max 100 prób formalnie, auto ułatwienia po 3 nieudanych; powrót Sandry. Bez mikrofonu równorzędna alternatywa. |
| Quiz 1: zaufanie | Aleks i Sandra odpowiadają indywidualnie, nie widzą z góry wyboru partnera. | Zapisywane dwa bool; wpływają na dialogi, zemstę, zdradę i ending 7. |
| Quiz 2: zwierzę | Oboje wybierają ten sam wariant; przy rozbieżności gra każe uzgodnić. | Chrupek / Lila / Arena / ETF; jeden efekt wspólny. Checkpoint przed zatwierdzeniem. |
| Arena — miauczenie | Co 5 minut aktywnego czasu gry przy wyborze Areny pauza, 60 s na 3 miauknięcia (mikrofon lub klawisz). | Błąd = gołębie / ending Impreza Halloween, potem checkpoint przed wyborem zwierzęcia. Fabularne cutscenki wstrzymują timer. |
| ETF + Tom Clicker | Jeden gracz steruje giełdą; drugi klika z boostami. Cel wspólnej ekonomii do ustalenia, roboczo 4 mld w 90 s. | Wygrana → bonus walki. Porażka → obowiązkowa pożyczka, przejście dalej. Bez zabójczej blokady. |
| Quiz 3: inkubator | Cztery odpowiedzi; błędna znika; trzecia jest jedyną pozostającą poprawną. | Niezależnie od kolejności kliknięć gra przechodzi przez ustaloną scenę, a potem do zoo. To żart z pozornego wyboru. |
| Zoo — 5 fok | Aleks atakuje foki przez 60 s (projekt); widelec/gouda redukują liczbę. | Sukces → normalny ruch; porażka → Aleks foka / spowolnienie, wątek odczarowania. |
| Zoo — 5 żółwi Tomów | Sandra podchodzi i Enterem wita 5 żółwi w 60 s (projekt). | Porażka → 60 s dnia w grze; Aleks w swojej części ekranu scrolluje ASCII TikToka. |
| Odczarowanie foki | Po zebraniu drużyny Sandra atakuje specjalny hitbox foczej formy 3 razy, tabliczka uprzedza o zasadzie. | Aleks wyskakuje jako człowiek, skóra foki zostaje. Możliwe powtarzanie bez zamknięcia trasy. |
| 10 piór | Widoczne pióra (3 wyjście z Goon Roomu, 3 zoo, 4 droga); automatyczne zbieranie po wejściu w promień. | 10/10 → gołąb przylatuje w bezpiecznym momencie i odbiera pióra. Inaczej przy bossie spłata / krótka walka. |
| Klon Toma | 3 Tomy krążą przez ~12 s; wybór wskazaniem lub podświetleniem; gaźnik daje wskazówkę. | Trafna identyfikacja → ułatwienie; błędna → jeden dodatkowy atak. Kolor + opcjonalny znak wzoru oka. |
| Echa na krzyżach | Podczas fazy 2 posiadacz nożyc przytrzymuje F/Enter 1 s przy krzyżu. | Uwolnione projekcje wbiegają w Toma i wybuchają (DMG). Licznik ech do sekretnego finału. |
| Szamański gołąb — egzekucja długu | Jeśli brak 10 piór przed finałem, mała arena z trzema seriami piór. | Porażka → powtórka; wygrana → dług anulowany, wejście na arenę Toma. |
| Ostatni świt — dynia | Aleks przestawia symbole WASD+F, Sandra pierścienie strzałkami+Enter; ustawienia niezależne. | Zgodny układ 3 znaków i jednoczesne potwierdzenie w oknie 2 s; pomyłka powtarza układ, nie całą grę. |

### 19.1 Mikrofon i prywatność

- Mikrofon jest opcjonalny. Prośba o zgodę dopiero przed minigrą albo funkcją nagrywania własnego głosu Rema. Nie prosić o dostęp podczas zwykłego uruchomienia gry.
- Karaoke nie może obiecywać weryfikowania wypowiedzenia dokładnie „Gabryś jest spoko”, jeśli działa tylko po impulsach natężenia. Ekran wyświetla frazę do wykonania; mechanika liczy rytm, a nie poprawną transkrypcję.
- Jeśli mikrofon jest słaby: usuwanie szumu, wykrycie poziomu tła, próg względny, tolerancja ±200 ms jako wartość startowa i kalibracja; natychmiastowy równoważny tryb klawiszowy.
- Nagranie własnego głosu Rema (lokalny plik): 1–3 s, odsłuch, ponów, wycisz lub użyj dźwięku domyślnego. Bez przesyłania na serwer; po zakończeniu nagrywania zwolnić strumień mikrofonu.
## 20. Grafika, świat i kamera 3D z efektem ASCII

### 20.1 Architektura renderowania: WebGL i 3D

1. 1. Podstawowy renderer: Three.js + WebGLRenderer (WebGL 2); rzeczywiste obiekty i geometria 3D, głębia, cienie, obracana/płynnie śledząca kamera. Canvas 2D może służyć co najwyżej do lekkiego HUD, miniatur lub wygenerowania atlasu znaków, NIE do budowania świata.
1. 2. Renderowanie sceny 3D do tekstury, a następnie pojedynczy postprocessing ASCII na GPU (shader + atlas glifów). Ogranicz liczbę znaków na ekranie siatką próbkowania, zachowując czytelność szczegółów. Tekst HUD/dialogi pozostają w osobnej, ostrej warstwie. Nie generuj elementu DOM dla każdego znaku.
1. 3. Modele Toma, dyni, grobów, postaci, krzyży i scenografii są przestrzennymi meshami 3D z prostą, ale bogatą sylwetką. Światło księżyca, czerwona krew i efekty są widoczne pod efektem ASCII. Powtarzalne groby, drzewa, pióra i żółwie łącz w instancje tam, gdzie faktycznie redukuje to draw calls.
1. 4. Osobno skaluj: wewnętrzną rozdzielczość renderu 3D, wielkość siatki znaków ASCII i ostrość warstwy UI. Na słabszym sprzęcie redukuj wyłącznie koszt kosmetyki / rozdzielczość wewnętrzną, nie rozmiar hitboxów ani długość sygnałów ostrzegawczych.
1. 5. Statyczne elementy optymalizuj przez instancing, zgrupowane draw calls, bake światła i preloading; ruchome przez pule cząsteczek. Unikaj masowych przezroczystych obiektów i kilkudziesięciu dynamicznych cieni. Profilowanie GPU/CPU decyduje o kolejnych cięciach.
1. 6. Frustum culling i ograniczenia odległości są dozwolone wyłącznie dla kosmetycznych obiektów; skrypty fabularne, spłata długu, postaci oraz kluczowe telegraphy pozostają poprawne. Obiekty w tle mogą mieć niższy tick AI, nie mogą zatrzymywać logiki historii.
### 20.2 Co oszczędzamy bez zauważalnej utraty wyglądu

| Efekt | Wysoka jakość | Tryb oszczędny — co zostaje |
| --- | --- | --- |
| Księżyc, groby, pentagram | Szczegółowe modele i cienie | IDENTYCZNE modele, bez redukcji geometrii świata; cache nieruchomych elementów. |
| Wrony i nietoperze | Drobne loty wielu sylwetek | Mniej egzemplarzy w oddali; najbliższe mają pełne animacje. |
| Deszcz i wiatr | Kilka warstw kropli i ukośnych smug | Rzadziej aktualizowane dalekie warstwy; klimat, kierunek i natężenie pozostają. |
| Rozbłyski uderzeń | Poświata + ASCII odłamki | Ten sam główny błysk, mniej małych cząsteczek i gotowy atlas blasku. |
| Przestrzenna kamera | Interpolacja, obrót i drżenie | Mniej przeliczanych pośrednich ujęć, te same kadry; redukowane drgania w ustawieniach dostępności. |
| Boss Tom | Pełny model, hitboxy, telegraphy | Nigdy nie redukować czytelności ostrzeżeń; obniżać tylko kosmetyczny chaos. |

Nie wyłączać animacji ostrzeżeń, istotnych cieni fabularnych, wybuchów ech, oczu klonów ani scenek endingów, nawet na słabym laptopie. Najpierw optymalizować ich sposób rysowania.

### 20.3 Kamera i dwie osoby na jednym ekranie

- • Wspólna kamera prawdziwego świata 3D śledzi środek pary. Kąt kamery (np. izometryczny/ukośnie z góry) zachowuje czytelność aren i kierunków. Zoom ma dolny i górny limit, a odległość graczy nie wymusza mikroskopijnych postaci; pojawia się bezpieczny miękki tether i wskazówki ekranowe.
- • Podział ekranu tylko w wybranych scenach: przedmioty, dwa quizowe monitory, zoo i ASCII TikTok. Tam można uruchomić dwa widoki/kamery tej samej sceny 3D, renderowane kolejno; zachowaj jedną symulację oraz ogranicz koszt postprocessingu na każdej połówce.
- • Obrót kamery wokół sceny oznacza rzeczywistą zmianę położenia i orientacji kamery Three.js. Kierunki ruchu są liczone względem stabilnej płaszczyzny XZ, a podczas filmowych obrotów sterowanie zostaje zablokowane albo wektor ruchu płynnie przeliczony; nigdy nie dezorientuj dwóch graczy.
## 21. Pętla gry, AI i dane — realizacja

### 21.1 Logika nie może zależeć od liczby klatek

Proponowana pętla: render przez requestAnimationFrame, akumulator czasu i stały krok symulacji 1/60 s. Przy długim zawieszeniu ograniczyć maksymalnie 5 kroków nadrabiających, odrzucić nadmiar i ponownie zsynchronizować zegary. Silnik zdarzeń fabularnych ma własne timery mierzone w aktywnym czasie rozgrywki.

Pseudokod implementacyjny:

```javascript
const STEP = 1/60;
let accumulator = 0, last = 0;
function frame(nowMs) {
  const now = nowMs/1000;
  const dt = Math.min(0.10, now - (last || now));
  last = now;
  if (!paused && !document.hidden) {
    accumulator += dt;
    let steps = 0;
    while (accumulator >= STEP && steps < 5) {
      readInputSnapshot();
      updateWorld(STEP);  // walka, kolizje, skrypty, zegary
      accumulator -= STEP;
      steps++;
    }
    if (steps === 5) accumulator = 0;
    drawFrame(accumulator / STEP);
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
```

RESEARCH  requestAnimationFrame dostosowuje się do częstotliwości ekranu i może być wstrzymywany w tle; Page Visibility API pozwala odpowiednio pauzować. Dla długich scen dźwiękowych nie zakładać, że setTimeout działa identycznie w tle.

### 21.2 Model danych, stany i priorytety

| Moduł | Zawiera | Reguła |
| --- | --- | --- |
| GameState | act, scene, phase, time, paused, checkpoints | Jeden centralny automat stanów, zmiana sceny atomowa. |
| PlayerState[2] | position, facing, hp, hitCooldown, actionCooldowns, item, trust, buried | Dwa osobne byty, ten sam silnik walki. |
| StoryFlags | grave, candle, sacrifice, scissors, animal, rescuedEarly, lilaTamed, echoesFreed | Zapisywane przy zdarzeniu, nie wywnioskowywane z tekstu dialogu. |
| DebtState | active, feathers(0–10), pigeonEncounter, repaid | 10 piór zawsze dostępnych; zero softlocków. |
| EndingResolver | eligibility[1..7], offers, explicitChoice | Nie wybiera pierwszego pasującego endingu; pokazuje uprawnione opcje. |
| NarrativeTimeline | cutscenes, dialogue, triggers, localTime | Skrypty nie zostają aktywne po wyjściu ze sceny. |
| AudioManager | ambient, SFX, micState, remVoice | Audio buffers w pamięci; dźwięk może być wyciszony. |
| Renderer | staticBuffers, glyphAtlas, particles, camera, HUD | Rysuje tylko widoczne/celowe zmiany. |

### 21.3 Save, checkpoint, replay i brak softlocków

- Checkpoint przed: wyborem zwierzęcia, giełdą/karaoke, zoo, walką z gołębiem, pierwszą i drugą fazą Toma, minigrą dyni. Po restarcie zachować wszystkie decyzje wcześniejszego etapu.
- Ending Impreza Halloween wraca do checkpointu sprzed zwierzęcia, a nie rozpoczyna całej gry. Pozostałe endingi: po napisach wyraźne „Zagraj ponownie / Wróć do menu”, z fabularnym resetem pamięci według opowieści.
- Pauza i przełączenie okna: wstrzymać grę i minigry; nie robić automatycznej porażki podczas alt-tab. Unikać automatycznego ponownego startu dźwięku, jeśli wcześniej był wyciszony.
- Walka z Tomem i dług u gołębia nie mogą blokować kampanii po porażce: ponawianie od odpowiedniego checkpointu, opcjonalny tryb ułatwień. Sekretny ending nie wyklucza zwykłego endingu w jednym przejściu.
- Przy skryptach zakończeń chronić przed wielokrotnym wykonaniem tego samego zdarzenia (jeden callback, jednorazowy trigger, idempotentny zapis flag).
## 22. Optymalizacja — techniki w kolejności opłacalności

| Priorytet | Praktyka | Jak mierzyć |
| --- | --- | --- |
| P0 | P0: Three.js/WebGL 2, scene graph 3D, rysowanie 3D do tekstury i jeden lekki pass ASCII na GPU. UI w osobnej ostrej warstwie; żadnych tysięcy DOM-glifów. | GPU frame time, liczba draw calls, CPU render time, liczba DOM nodes. |
| P0 | Nie alokować setek nowych tablic i obiektów w pętli; pula pocisków i cząsteczek. | Rozmiar heap, regularność GC w DevTools. |
| P0 | P0: frustum culling, instancing powtarzalnych meshów, bake światła statycznego, jeden kluczowy cień księżyca; nie powielać całej sceny przy split screen. | Draw calls i koszt cieni; porównanie jednej i dwóch kamer. |
| P0 | P0: fizyka na płaszczyźnie XZ + wysokość Y dla rzeczywistej sceny 3D; kolizje 3D oparte na prostych kapsułach / AABB i spatial hash; bez pełnej, ciężkiej symulacji fizyki. | Czas aktualizacji obiektów i liczba zapytań kolizyjnych. |
| P1 | P1: cache shaderów/glyph-atlas, ograniczyć nowe materiały i dynamiczne cienie; precompile materiały 3D przed scenami z bossem. | GPU compile stalls, rozmiar tekstur, p95 klatki. |
| P1 | Pooling audio SFX, preloading zasobów jednej sceny naprzód, ograniczenie nakładających się dźwięków. | Opóźnienia podczas pierwszej i kolejnej walki. |
| P1 | Rzadziej aktualizować AI obiektów poza ekranem bez naruszania timerów historii. | Spadki przy wielu gołębiach i tłumie duchów. |
| P1 | Limit particle budget dla detali kosmetycznych; dynamiczny DPR / rozdzielczość renderowania przy utrzymaniu czytelności HUD. | Średni FPS, 1% low, ostrość liter. |
| P2 | OffscreenCanvas w Worker, jeżeli profilowanie wykaże zablokowanie głównego wątku. | A/B test vs prosty Canvas; zysk musi być zmierzony. |
| P2 | P2: rozważ Worker / OffscreenCanvas TYLKO po profilowaniu; nie przebudowuj silnika na 2D w celu rzekomej optymalizacji. | A/B test main thread vs worker, stabilność WebGL i input latency. |

### 22.1 Jak mierzyć, zamiast zgadywać FPS

- Mierzyć FPS, 1% low FPS, 95. percentyl czasu klatki, maks. opóźnienie inputu, użycie pamięci, czas updateWorld i drawFrame. Dla 60 FPS jedna klatka trwa około 16,7 ms; dążyć do marginesu dla przeglądarki.
- Testować: (A) początkowy cmentarz z pogodą, (B) tłum gołębi Areny, (C) zoo split UI + TikTok, (D) Angry Tom z wszystkimi efektami, (E) co najmniej 20 min gry bez wycieku pamięci.
- Sprzęt docelowy do empirycznych testów: typowy laptop ze zintegrowaną grafiką i 8 GB RAM, Chrome/Edge, rozdzielczość 1366×768; drugi laptop z ekranem 1080p; także podłączenie zasilacza/tryb oszczędzania energii.
- W Chrome DevTools użyć Performance panel do nagrania FPS i czasu funkcji, Rendering → Frame rendering stats do sprawdzenia dropów oraz Performance Monitor do wykresu JS heap i liczby węzłów DOM.
## 23. Testy klawiatury i dostępności — lista kontrolna

| Test | Oczekiwany wynik |
| --- | --- |
| W+D+Spacja oraz ↑+←+Prawy Shift | Obaj gracze poruszają się po przekątnej i atakują; gdy sprzęt blokuje kombinację, kreator natychmiast pozwala remapować. |
| Przytrzymywanie ataku | Ataki powtarzają się na cooldownie, bez zależności od systemowego auto-repeat. |
| Równoczesny unik dwóch osób | Każdy gracz unika indywidualnie; żaden konflikt między ShiftLeft, ShiftRight i CtrlRight. |
| Wpisywanie w Epitafium | Kiedy tekst jest aktywny, przyciski ruchu i ataku nie poruszają bohaterami w świecie. |
| Brak mikrofonu / odmowa uprawnień | Karaoke pozostaje w pełni grywalne na klawiszach; nie wyświetla błędu game over. |
| Cichy mikrofon / szumy | Automatyczna kalibracja, tolerancja rytmu, możliwość zmiany trybu w trakcie. |
| Rozróżnianie barw | Obok oczu w trybie dostępności istnieje dodatkowy symbol / kształt. Ataki bossa posiadają geometryczne telegraphy. |
| Alt-Tab w czasie karaoke / Areny / Toma | Gra pauzuje i po powrocie prosi o kontynuację; timers nie wykonują kilkudziesięciu sekund w tle. |
| Słaby sprzęt — 30 FPS | Animacje mogą być rzadsze, ale ataki i ucieczki działają z tą samą prędkością i mają ten sam czas zapowiedzi. |
| Obie postacie daleko od siebie | Kamera mieści obie lub pokazuje wskaźnik; czytelność glifów nie ginie przez nieskończony zoom out. |
| Powrót z checkpointu | Nie znika ekwipunek, dług, nożyce, flaga zaufania, wybór grobu czy zapalony znicz. |
| 7 endingów | Każdy ma osobny warunek, świadomy wybór, scenę, epilog; nie da się przypadkiem uruchomić sekretnego. |

## 24. Audyt luk po dodaniu systemów

UWAGA  Najważniejsza logiczna pułapka: sekretne zakończenie wymaga karmy Aleksa i pluszaka Sandry — ich ustawienia są zgodne z brakiem wymiany. Wspólne wybranie Lili w quizie jest niezależne od wyposażenia.

| Luka / ryzyko | Rozwiązanie w v5 | Pozostaje do zweryfikowania |
| --- | --- | --- |
| Nie było zwykłych ataków graczy | Bazowy atak, specjal, unik, 0 HP, leczenie partnera, cooldowny i ataki auto-target. | Balans liczb na sprzęcie docelowym. |
| Nie było podstawowych ataków Toma | 7 wzorów regularnych plus 3 grobowe i harmonogram 2 faz. | Animacje i dopasowanie hitboxów do ASCII. |
| Za wiele klawiszy na laptopie | Minimalny zestaw 2–3 aktywnych akcji, trzymany atak, remap i test ghostingu. | Faktyczna współpraca dwóch osób na konkretnych klawiaturach. |
| Nierealny cel 60 FPS bez testów | P0: silnik świata 3D z ASCII shaderem na GPU, adaptacyjny render scale i glyph density, z fixed timestep i osobną ostrością HUD. | Brak rzeczywistych pomiarów; należy zweryfikować na laptopach z iGPU. |
| Niedookreślona minigra ETF | Proponowany limit czasu, wspólny próg, brak softlocka przy przegranej. | Ostateczna mechanika kupna/sprzedaży i liczba boostów Tom Clickera. |
| Kto używa widelca/goudy u Sandry? | Właściciel aktywuje zanim zoo rozdzieli postacie; brak wymiany. | Dokładna animacja pułapki. |
| Różnica snu i prawdziwej pętli | Ending Arena jest osobną alternatywną rzeczywistością i wraca do checkpointu. | Czy sen jest obiektywną prawdą, czy kolejną sztuczką dyni — decyzja fabularna autora. |
| Czas grania i tempo | Czasówka przeciwników, szybkie checkpointy, brak frustracji w karaoke. | Długość całej sesji gry zależy od przyszłego testu i dialogów. |
| Los Alexa (X) i Salsy | Pozostawiono bez szczegółów, zgodnie z życzeniem autora. | Ten fragment wymagany przed ostatecznym implementowaniem pętli. |
| Co z zakończeniem po każdej porażce? | Restart fazy / checkpoint, ending Areny, pożyczka po ETF i klątwa po zoo. | Potwierdzić skutki kolejnych porażek po dopracowaniu cutscenek. |

## 25. Kolejność wdrażania — tak, żeby później nie przepisywać wszystkiego

1. Etap A — fundament 3D: Three.js/WebGL 2, arena mesh 3D, dwie niezależne postacie na XZ, WASD + strzałki, obrotowa wspólna kamera, renderer 3D i shader ASCII, licznik FPS, test kombinacji klawiszy.
1. Etap B — rzeczywisty system walki 3D: HP, celowanie na płaszczyźnie XZ, aktywny hitbox i telegraph jako czerwony decał/rzut na teren 3D, unik, specjal, kolizje w 3D, 0 HP, checkpoint; jedna foka jako test.
1. Etap C — oprawa ASCII 3D i wydajność: postprocessing GPU, atlas znaków, instancing, cienie księżyca, deszcz, pula cząsteczek, pomiary CPU i GPU oraz test rzeczywistego laptopa.
1. Etap D — system scen i quizy: decyzje dwóch osób, flags, zapisy/checkpointy, Epitafium, karaoke z fallbackiem, wybór zwierzęcia.
1. Etap E — zoo, ETF, Arena: 5 fok i 5 żółwi, klątwa, pióra, gołąb, minigra rynku, meowing i ending Impreza.
1. Etap F — boss: 7 ataków normalnych, 3 grobowe, duchy, Lila, nożyce i echa, oryginał/klony, próby balansu.
1. Etap G — endingi: scenki 1–7, sekretna dynia, pełne epilogi, testy wszystkich kombinacji flag.
1. Etap H — test 2 osób: 30/60 FPS, klawiatury laptopów, słabe mikrofony, tryb oszczędzania baterii, 20-minutowy smoke test i korekta balansu.
## 26. Materiały źródłowe researchu (29.10.2026)

MDN — Optimizing canvas: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas
Prerender, integer coordinates, unikanie shadowBlur / zbędnego tekstu, praca na warstwach.

MDN — requestAnimationFrame: https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame
Animacja zsynchronizowana z odświeżaniem, niezależna od Hz, wstrzymanie w tle.

MDN — KeyboardEvent.code: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
Fizyczne kody WASD, odróżnianie klawiszy, ruch przez keydown/keyup.

Microsoft — Keyboard ghosting FAQ: https://www.microsoft.com/applied-sciences/projects/anti-ghosting-faq
Ryzyko niewykrytych kombinacji klawiszy, które różni się między klawiaturami.

MDN — Page Visibility API: https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
Pauzowanie ukrytej karty i unikanie błędów z timerami w tle.

MDN — getUserMedia: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
Wymóg uprawnień i bezpiecznego kontekstu dla mikrofonu.

MDN — OffscreenCanvas transfer: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/transferControlToOffscreen
Możliwość przeniesienia canvas do Workera, nie obowiązkowy mechanizm.

Chrome Developers — Performance panel: https://developer.chrome.com/docs/devtools/performance/overview
CPU profiling, analiza klatek i wąskich gardeł.

Chrome Developers — Rendering performance: https://developer.chrome.com/docs/devtools/rendering/performance
Podgląd FPS, dropped frames i GPU rendering stats.

MDN — AudioContext latency: https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/baseLatency
Opóźnienie dźwięku i brak gwarancji honorowania żądanego latencyHint.

Zastrzeżenie: research jest o właściwościach technologii, a nie pomiarem tej konkretnej gry. Żaden realny pomiar FPS ani ghostingu na laptopie użytkownika nie został wykonany.

# 27. ZMIANA OBOWIĄZUJĄCA: PRAWDZIWE 3D + ASCII

KANON: HALLOWEEN jest grą w prawdziwej przestrzeni 3D, a nie grą 2D. Wszystkie wcześniejsze sformułowania sugerujące renderowanie całego świata w Canvas 2D są historyczne i zastąpione niniejszym zapisem.

### 27.1 Zasady przestrzeni i kamery

- Osie świata: XZ = chodzenie i walka; Y = wysokość. Postacie mają przestrzenny model, kapsułę kolizji, kierunek patrzenia i animacje 3D stylizowane na ASCII.
- Kamera wspólna: skośnie z góry, obraca się filmowo w intro/wybranych scenach; w aktywnej walce domyślnie stabilna. Wybór top-down nie oznacza płaskiej mapy. Po rotacji przelicz wektor ruchu i utrzymaj czytelny, stały kierunek sterowania.
- Ataki obszarowe pokazują czerwone rzuty/decale na ZIEMI 3D (podłoga/wzniesienia); wielkość oznaczenia = prawdziwy rozmiar hitboxu. Nad głową przeciwnika wskaźnik nie zastępuje ground markerów.
- Na zwykłych ekranach 1366x768 testować czytelność gry i małe litery UI; tryb dwukamerowy tylko dla specjalnych scen. Nie zmuszać graczy do obracania kamery myszką.
- Kolizje mogą być uproszczone przez symulację poruszania na XZ i wysokość Y, ale świat i kamera są wciąż 3D; to technika optymalizacji, nie odejście od 3D.
### 27.2 Pipeline renderera — zalecany

- Scena 3D Three.js → WebGLRenderer (WebGL 2) → render target → shader/post-process ASCII na GPU → ostry HUD i podpisy poza shaderem.
- ASCII shader: atlas 8–16 znaków, wybór glifu wg jasności i opcjonalnie krawędzi, kolor z obrazu 3D, regulowany cell-size. Zadbaj o czytelne kontury i niezależne cienie.
- Nie wybierać addons/effects/AsciiEffect jako podstawowego efektu bez benchmarku: opiera się o DOM HTMLDivElement, a kolorowy wariant dokumentacja opisuje jako wolniejszy. Może służyć prototypowi/porównaniu, nie gwarantowanej drodze do 60 FPS.
- InstancedMesh dla powtarzalnych grobów, żółwi, drzew, piór; lekkie modele na odległość; light baking i jedna odpowiednio dobrana mapa cieni; ograniczona liczba dynamicznych świateł.
- Regulować glyph density i render target scale niezależnie, aby w trybie oszczędnym zachować tę samą kompozycję, modele fabularne, ostrzeżenia i HUD.
- Preload i precompile materiały Toma, pentagramu, deszczu oraz dyni przed scenami, aby ograniczyć zacięcia po pierwszym pojawieniu się.
## 28. SYSTEM WALKI 3D I BOSS — KONKRETNE REGUŁY

| System | Reguła implementacyjna |
| --- | --- |
| Celowanie | Atak skierowany w najbliższego wroga w przednim sektorze 100° na XZ i w promieniu zasięgu; gdy brak celu — cios w kierunku patrzenia. Nie targetuj przez kolizję ściany. |
| Zwykły atak | Tap lub trzymanie jednego przycisku wykonuje serię ciosów z cooldownem. Na początku animacji ustaw aktywny hitbox na 0,1–0,2 s; trafienie nie może rejestrować się wielokrotnie. |
| Unik | 0,22 s doskoku na XZ, na 0,18 s nietykalność; cooldown 1,8 s. Unik działa bez konieczności jednoczesnego przytrzymania kierunku; w bezruchu wykonuje go w kierunku patrzenia. |
| Telegraph | Rzut strefy zagrożenia na teren 3D zawsze pozostaje czytelny. Zielony/niebieski nie zastępuje czerwonego oznaczenia, także przy shaderze ASCII; w trybie dostępności obrys przerywany. |
| Łapa gniewu | Cel wybierany na początku: duże czerwone koło na ziemi, PO 1,8 s uderzenie. Od momentu 0,7 s do uderzenia koło nie podąża za graczem. Ruch wystarcza, by uciec. |
| Pentagram | 2,3 s ostrzeżenia, wolna fala przez 2–3 s. Co najmniej dwa bezpieczne przejścia. Skok nie jest potrzebny, zwykły bieg lub unik jest wystarczający. |
| Pozostałe regularne | Rząd żółwi 1,8 s ostrzeżenia; krzyże >=1,6 s; szarpnięcie >=1,8 s; dynie >=1,8 s; klony >=1,5 s. Nie nakładać dwóch ataków bez bezpiecznej drogi. |
| Trzy ataki grobowe | Gabryś: pazury Meimei z lukami; Weronika: kręgi z wyprowadzanym celem; Boris: świece wykresu. Znicz = jednorazowa pomoc ducha. Te ataki są dodatkiem do zwykłego zestawu. |
| Sekwencja faz | Faza 1: Aleks unika rzędów żółwi, Sandra uwalnia się z transu w rytmicznej minigrze; faza 2: Angry Tom 3D + regularne i grobowe ataki, echa z krzyży, Lila. |
| Pomoc i checkpoint | Przy 0 HP postać pada. Partner przytrzymuje interakcję 2 s by pomóc, jeśli oboje padną — checkpoint fazy. Pozostawione przedmioty i flagi historii zachowują się. |

## 29. TRUDNE PRZYPADKI — JAK NIE ZEPUĆ FABUŁY

- Nóż w plecy (ending 4): jest CEREMONIALNYM NOŻEM TOMA pobranym w cutscence zdrady i nie zajmuje slotu początkowego przedmiotu. Nie tworzyć ósmej opcji ekwipunku.
- Efekt widelca i goudy: właściciel aktywuje przed rozdzieleniem zoo. Jeśli oboje mają fork+gouda, zostaje jedna z pięciu fok, nie zero. Jeśli tylko jeden gracz ma obydwa? NIE, bo wybiera wyłącznie jeden przedmiot.
- Klątwa foki: Sandra musi pokonać foczą formę Aleksa (3 trafienia). Aleks gra jako foka, ale może niechcący uniemożliwiać koniec: wprowadzamy nieskończone próby i czytelną strefę trafienia. Po zakończeniu wraca człowiek, bez zmiany endingu.
- Karaoke: rytm/głośność i klawiszowy fallback, bez wymagania idealnego rozpoznania słów. 100 prób maksimum fabularne; po kilku porażkach ułatwienie. Tryb bez mikrofonu i cichy mikrofon NIE blokują trasy.
- Pióra: rozłóż 3 przy wyjściu Goon Roomu po uruchomieniu długu, 3 w zoo, 4 na drodze po cofnięciu czasu. Zasoby mają stabilne identyfikatory i nie odradzają się przy powrocie z checkpointu, jeśli już zostały podniesione.
- Słabe klawiatury: na jednych kombinacja WASD+strzałki+atak działa, na innych nie. Test wejścia i remapping są obowiązkowe; program nie naprawi hardwarowego ghostingu.
- Po wygraniu ETFi: grant bonus; przegrana → pożyczka i 10 piór. Trzeba jednoznacznie określić tryb handlu i cel. Poniżej wartości początkowe do prototypu.
- Nożyce: NIE są wybieranym przedmiotem na początku; dowolna osoba może podnieść je w domku, ale stan jest jedną wspólną flagą fabularną, bez mechaniki wymiany przedmiotów początkowych.
- Dawanie liścia między graczami pozostaje tylko zabawą — bez licznika agresji i bez wpływu na endingi.
- Rem z nagranym głosem: efekt lokalny, opcjonalny, bez serwera i bez blokowania gry przy odmowie dostępu do mikrofonu.
- Przemiana Lili: nieunikniona, Lila okazuje się demonicznym psem Toma. Karma pozwala ją oswoić, a nie uniknąć przemiany.
- Wspólna odpowiedź o zwierzęciu: wybierają niezależnie na dwóch ekranach, ale potwierdzają TYLKO identyczną odpowiedź, w innym razie nie idą dalej.
- Tom już istniał. Cmentarny Mściciel to jego klon. Nie wprowadzaj paradoksu przywołania Toma przez Sandrę z quizu.
- Nie dopisywać historii śmierci Alexa (przez X) ani Salsy. Zaprogramować jawny placeholder/scene hook, który autor później uzupełni.
## 30. MINIGRA ETF — PROTOTYPOWA MATEMATYKA (PROJEKT, NIE KANON)

- Początek: wspólnie wybrany ETF; domyślna rola Aleks = giełda, Sandra = Tom Clicker; przed startem mogą zamienić role na ekranie READY, bez zmiany własności przedmiotów.
- Czas: 90 sekund aktywnej minigry, stop przy pauzie/ukrytej karcie. Cel Tom Clickera: 4 miliardy punktów. Punktacja clickera: klik 1 mln; automatyczny generator 10 mln/s; boosty x2–x8 co 10–15 sekund, trwające po 5–8 sekund; automatyczne skalowanie zwiększa bonusy, jeśli clicker jest daleko od celu.
- Giełda: cena instrumentu aktualizuje się co 0,5 s przez deterministyczną falę z lekko losową zmianą; gracz kupuje/sprzedaje ilości 25% lub 100% posiadanej gotówki. Start 1000 monet; cel końcowy >= 1100 monet (min. 10% zysku). Nie polegać na prawdziwych kursach ani sieci.
- Sukces tylko gdy clicker ma >=4 mld ORAZ wartość portfela (gotówka + aktywa) >= 1100. Porażka którejkolwiek strony prowadzi do szamańskiego gołębia i pożyczki. Ułatwienia i wartości balansować po testach.
- Nie tworzyć symulacji giełdy bez odpowiedzi na to, po co gracz handluje; wartości liczbowe są tymczasowym placeholderem do testów UX.
## 31. DEFINICJA GOTOWOŚCI DO CODEXA

- Tak: można zacząć implementować etapami: silnik 3D, renderer ASCII, 2-osobowe sterowanie, walka, minigry i większość przejść fabularnych mają opis działania.
- Nie: NIE można uczciwie stwierdzić „100% gotowe do wytworzenia całej gry” bez repozytorium, uruchomionych testów, modeli, wybranych finalnych dialogów i ustalenia scen Alexa (X) oraz Salsy.
- Codex powinien NAJPIERW zinwentaryzować istniejące repo, wskazać stack i pliki, zapewnić build, testy i dostępne skrypty, a dopiero później implementować etapami. Nie wolno bez pytania nadpisywać działającego kodu ani przepisywać aplikacji, jeśli można ją rozszerzyć.
- Każdy etap musi kończyć się: kompilacją, lint/testami jeśli istnieją, uruchomieniem grywalnego wycinka, wskazaniem wykonanych i brakujących elementów, metrykami FPS (jeśli zmierzono), listą nowych plików.
- Test akceptacyjny prototypu: oboje chodzą i atakują równocześnie w rzeczywistej scenie 3D, kamera obraca się, znakowy efekt ASCII jest czytelny, czerwony telegraph łapy poprzedza hit, a powolny pentagram można ominąć samym ruchem.
- Pozostałe sceny i endingi implementować dopiero po działającym wycinku. Nie symulować sukcesu atrapą tekstu; można tworzyć jawnie oznaczone placeholdery dla scen zastrzeżonych przez autora.
## 32. LINKI DO DOKUMENTACJI 3D — RESEARCH

- Three.js WebGLRenderer (WebGL 2): https://threejs.org/docs/pages/WebGLRenderer.html
- Three.js InstancedMesh (mniej draw calls): https://threejs.org/docs/pages/InstancedMesh.html
- Three.js EffectComposer (postprocessing): https://threejs.org/docs/pages/EffectComposer.html
- Three.js AsciiEffect (uwaga: DOM HTMLDivElement): https://threejs.org/docs/pages/AsciiEffect.html
- Three.js responsive i rozdzielczość: https://threejs.org/manual/pages/responsive.html
- Silnik 3D i zalecane techniki to propozycja architektoniczna oparta o oficjalne dokumentacje, nie potwierdzony benchmark tej gry.