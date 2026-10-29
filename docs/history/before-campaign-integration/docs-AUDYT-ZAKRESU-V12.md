# Zakres wykonawczy V12 — kontrola przed dalszą integracją

Źródło: docs/spec-v12. Najnowszy kanon i kontekst V12 mają pierwszeństwo przed scenariuszem V8, resolverem V10, mapą V11, dialogami V6 i specyfikacjami V5/V7. Archiwalne Wordy, diagramy i interaktywne drzewko są odniesieniem historycznym, nie osobnymi dodatkowymi poleceniami. Dokumentacja nie jest dowodem działającej funkcji.

## Cały zakres gry

1. Z00–Z01: dwa prywatne artefakty, split screen, pełny prolog dyni w 3D ASCII.
2. Z02–Z06 / akt I: droga i ciało, trzy groby z najnowszymi napisami, osobny znicz, miły/niemiły ton, trzy wyzwiska Gabrysia i późniejsze riposty. Wybór kolejności ratunku, nożyce, śmierć nieznajomego i wskazówka. Widoczny Mściciel-klon, wskrzeszenia, wspólny marsz przed bramę, pięć ofiar.
3. Trzy wejścia do Goon Room: poświęcony zmarły → burza i katastrofa; Sandra → karaoke i wskrzeszenie; Aleks → pojedynek, pochówek, Epitafium i pamięć krzywdy. Stare zakończenia aktu I są nieaktualne.
4. Z07 / akt II: dwa fotele, trzy pytania. Zaufanie indywidualne; zwierzę wspólne. Chrupek: opcjonalny buff i szczekanie. Lila: towarzyszka, potem demoniczny pies Toma. Arena: 5 minut aktywnej gry, 60 sekund i 3 miauknięcia na osobę. ETF i Tom Clicker równocześnie; przegrana → pożyczka. Quiz Igi usuwa błędne odpowiedzi. Mówiące drzwi; Sesja Weroniki opcjonalna.
5. Z08 / akt III: dwie kamery i jedna symulacja. 5 fok Aleksa i 5 witanych żółwi Sandry. Widelec -1, gouda -3, co najmniej jedna foka. Porażka Aleksa: focza klątwa, nie śmierć; Sandra zdejmuje ją 3 trafieniami. Porażka Sandry: 60 sekund ASCII TikToka; obie konsekwencje muszą działać razem.
6. Dług: 10 piór, 3 w Goon Roomie, 3 w zoo, 4 na powrotnej drodze. Stałe ID, brak duplikacji po reload. Alternatywna powtarzalna walka z gołębiem.
7. Z09–Z10 / akt IV: powrót czasu, droga bez ciała i człowieka na krzyżu, bez przedwczesnego spotkania Alexa X i Salsy. Ujawnienie oryginalnego Toma, klony różniące się oczami, kartka pomaga.
8. Z11: Sandra wychodzi z transu strzałkami, Aleks unika żółwi. Potem Angry Tom, echa uwalniane nożycami, Lila oswajana świadomie karmą, pomoc duchów, stan znicza i ofiary.
9. Walka: atak, unik, specjal, hitboxy XZ, sektor celowania, cooldowny, combo, indywidualne HP i pancerz, powalenie, pomoc partnerowi, retry fazy. Siedem zwykłych ataków Toma: rząd żółwi, łapa gniewu, krzyżowy promień, pentagram, szarpnięcie czasu, deszcz dyni, przemarsz klonów. Trzy grobowe: Meimei Apokalipsa, Klątwa Wiedźmy, Krypto Krach. Ostrzeżenia poprzedzają ciosy; są czerwone, geometryczne i czytelne także poza shaderem.
10. Nowe moby i sprzęt: cień korzeni, opętana wrona, mogiłowy cień, kościana ręka, żółw marionetka, echo pętli, dłużny gołąb. Osobne sloty artefaktu, broni i pancerza; nożyce są wspólnym rekwizytem. Układ i balans nowych mobów/sprzętu są robocze.

## Siedem automatycznych zakończeń

1. Nieskończona noc: Tom pokonany, dynia wyjaśnia mechanizm, 45 sekund ostatniej ucieczki, Sandra przy drodze, ranny Aleks na krzyżu. Dopiero potem Alex X i Salsa, nowy obieg i epilog.
2. Impreza Halloween: porażka Areny, gołębie i omdlenie, wspólne przebudzenie w SZPITALU po wypadku po imprezie, ten sam sen. Powrót przed quiz zwierzęcy.
3. Sandra Toma: pluszak, nieufność/pochówek, zdrada i korona; pętla nadal kontrolowana przez dynię.
4. Nóż w plecy: wcześniejszy pozorowany rozejm Sandry i poparcie Aleksa; ceremonialny nóż Toma, nie przedmiot startowy; reset.
5. Lila przeciw panu: oswojona Lila ratuje parę kosztem własnej wolności. Dwie Lile w scenie po napisach.
6. Dwa cienie: zdrada i rozdzielone losy; szczegół pustego świata oraz automatyczny priorytet E3/E4/E6 pozostają oznaczonymi propozycjami.
7. Ostatni świt: karma Aleksa, pluszak Sandry, wzajemne zaufanie, Lila, nożyce, co najmniej dwa echa. Trzy kooperacyjne układy symboli/pierścieni; wolność całej trójki, bez ukrytego resetu.

Nie ma końcowego menu „wybierz ending”. Starsze zapisy o menu i pobudce na imprezie są nadpisane. Każdy ending wymaga fizycznej sceny, dialogów, epilogu i właściwego stanu pętli.

## Wymagania przekrojowe

- Jedna klawiatura: WASD i strzałki, działające równoczesne akcje, remap i diagnostyka ghostingu; nie udawać fizycznego testu sprzętu samymi syntetycznymi zdarzeniami.
- Mikrofon opcjonalny, kalibracja i równoważna klawiatura, lokalne nagranie Rema wyłącznie za świadomą zgodą. Brak backendu i wysyłania nagrań.
- Checkpointy przed minigrami i fazami, wersjonowanie, migracje, oddzielny metapostęp endingów; reset pamięci postaci dopiero przy nowym obiegu.
- Prywatnych artefaktów nie przekazywać. Liście to żart bez wpływu na reputację i endingi. Brak opcjonalnego wyposażenia nie blokuje kampanii.
- Profile Auto/Low/Balanced/High, ostre UI, niezależna rozdzielczość świata i glifów, stabilna logika w sekundach. Cel 60/30 FPS nie jest wynikiem pomiaru.
- Testy: każdy akt, gałęzie, wszystkie endingi i kolizje flag, zapis/reload, pauza/tło, niedobór sprzętu, odmowa mikrofonu, 1366×768 i 1920×1080, stress i dłuższa sesja. Nie testować telefonu.

## Stan integracji

Aktualnie działający i przetestowany zakres opisuje STATUS.md. Rozszerzenie dalszej kampanii powstaje w pliku roboczym work/journey-v12.js w głównym workspace; samo istnienie tego kodu nie oznacza integracji ani przetestowania. Przed ogłoszeniem gotowości trzeba połączyć je z index.html, uzupełnić bank dialogów, przetestować wszystkie przejścia, sceny i mechaniki oraz zamknąć braki. Nie podawać testów samego resolvera jako dowodu grywalności siedmiu endingów.
