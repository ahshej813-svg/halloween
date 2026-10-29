# HALLOWEEN — SPECYFIKACJA NADRZĘDNA v7 (29.10.2026)

> Dokument wykonawczy dla Codexa. **NIE JEST dowodem audytu ani ukończenia gry.** Aktualny kod gry nie był dostępny autorowi tej paczki. Wytyczne opisują cele i decyzje; Codex ma dopasować je do rzeczywistego repozytorium po jego otwarciu.

## 0. Źródła, pierwszeństwo, status decyzji

Czytaj materiały w tej kolejności: (1) niniejszy dokument v7 — najnowsze zasady i rozstrzygnięcia; (2) `DOKUMENTACJA/HALLOWEEN_DODATEK_v6_ASCII_MSCICIEL_DIALOGI.md` — szczegółowe dialogi i korekty; (3) `DOKUMENTACJA/HALLOWEEN_SPEC_v5_Codex.md` — pełna fabuła, systemy, walka, optymalizacja; (4) `DOKUMENTACJA/HALLOWEEN_biblia_v5_3D_Codex.docx` — diagramy i układ scen, uzupełnienie tekstu; (5) `ARCHIWUM/pierwsze_ustalenia.docx` — historyczne cytaty, tylko jeśli nie są sprzeczne z nowszymi wersjami. W przypadku konfliktu wygrywa nowsza decyzja autora, nie wcześniejszy dokument. Gdy ten dokument czegoś nie rozstrzyga, odpowiednia sekcja v6 lub v5 jest wiążącą bazą **projektową**.

`KANON` = decyzja wyraźnie potwierdzona przez autora. `ZALECENIE WYKONAWCZE` = rozsądny domyślny projekt do zaimplementowania i przetestowania, nie udawać autorskiej akceptacji. `BLOKER FABULARNY` = treści autor celowo zastrzegł dla siebie, nie dopisywać arbitralnie. Dialogi i liczby opisane jako **PROPOZYCJA** w v5/v6 pozostają propozycjami — można wdrożyć jako łatwo edytowalne dane robocze, ale nie deklarować ich jako zatwierdzonych cytatów.

### Słownik bez dwuznaczności

- Tytuł gry: **Halloween**; nie używać poprzedniej nazwy jako tytułu interfejsu, projektu ani ekranu startowego.
- **Aleks** (przez „ks”) i **Sandra** = jedyni główni grywalni bohaterowie. **Alex** (przez „x”) i **Salsa** = odrębna para z wątku pętli. Nie mieszać imion.
- **Gabryś, Borys, Weronika** — w UI, dialogach i nowych plikach używaj Borys. Stare `Boris` oznacza tę samą postać i stan — zrób migrację/alias stanów, jeśli stary kod istnieje.
- **Goon Room**, nie „Gun Room”. Fraza „Gabryś jest spoko” pozostaje dokładnie taka.
- **Mściciel widziany na cmentarzu = klon Toma**. Tom oryginalny istniał wcześniej; jego przywołanie imieniem nie tworzy go z niczego.
- Gra to przestrzeń **3D** z warstwą stylizowanego, szczegółowego **ASCII**. Renderowanie sceny 3D do tekstury i następnie konwersja na GPU na znaki to **technika postprocessingu**, a nie gra 2D. Interfejs i napisy mają pozostać ostre i poza shaderem ASCII.
- Gra lokalna na **jednym ekranie** i **jednej klawiaturze laptopa**; niezależny ruch Aleksa WASD, Sandry strzałkami. Dwa osobne wejścia dialogowe. Nie wymagaj dwóch klawiatur, myszy ani pada.

## 1. Najwyższy priorytet — istniejąca scena aktu I i czytelność obrazu

### 1.1 Awaria widoczności Mściciela

**KANON:** Gracze mają spotkać Mściciela **na cmentarzu**, zobaczyć go wyraźnie zanim nakaże przejść **przed bramę**. Musi to być przestrzenny model 3D czytelny przy ciemnym świetle księżyca (sylwetka/kontur, zaplanowany kadr), ze skryptowaną kwestią i reakcją obojga. Następnie cała grupa przechodzi przed bramę, gdzie następuje wybór ofiary. Wyzwalacz nie może przeskoczyć wejścia na podstawie samej pozycji gracza za cmentarzem.

**KROKI DIAGNOSTYCZNE:** odtwórz błąd ze starego buildu; sprawdź spawn, położenie, wysokość modelu, skalę, occlusion/frustum culling, warstwy renderera, kamerę, przejrzystość znaków ASCII, depth-test, światło, sekwencję eventów oraz to, czy trigger poprzedza wejście kamery. Pokazuj i potwierdzaj scenę przed odblokowaniem przejścia do bramy. Po fixie nagraj/porównaj screenshoty tego samego miejsca w trybie ASCII ON/OFF (OFF tylko diagnostycznie). Bez dostępnego kodu **nie twierdzić, że ustalono przyczynę**.

**ZABEZPIECZENIE:** jeśli część animacji nie dojdzie do końca, state machine wznawia scenę w poprawnym kroku, a nie otwiera od razu menu ofiar. Przy ponownym wejściu unikaj duplikowania Mściciela.

### 1.2 Czytelność ASCII w całej grze

**KANON CELU:** styl szczegółowego horroru 3D ASCII ma zostać, w tym kamienna droga, groby, głęboka noc, krew, drzewa, wrony, pogoda i modele. Nie zastępować słabej czytelności usunięciem szczegółów czy płaskimi planszami.

**ZALECENIE WYKONAWCZE:** renderer 3D istniejącego stacku; w przypadku projektu bez działającego renderera można rozważyć Three.js WebGL2 + postprocess atlasu glifów w pojedynczym GPU pass. Osobne ostre UI, teksty i czerwone strefy ostrzegawcze; znakowy raster o stałej siatce/kwantyzacji, bez drżenia glifów przy ruchu kamery, zmienny kontrast i jasność lokalna, czytelny kontur ważnych postaci. Stylowe, ale rozróżnialne glify dla bliskich modeli. Nie wymagać rozpoznania koloru jako jedynego źródła informacji.

**WYDANOŚĆ:** tryby AUTO/LOW/BALANCED/HIGH, podgląd FPS i czasy klatek, separacja logiki od renderingu, ograniczenie DPR, dynamiczne skalowanie *wewnętrznego render targetu* i cząstek oddalonych bez zmniejszania rozdzielczości UI, LOD/instancing powtarzalnych modeli (tylko zysk potwierdzony pomiarem), batch/atlas tekstur i glifów, pooling efektów i eventy poza ekranem aktualizowane rzadziej. Benchmarkuj burzę, zoo w podziale, najcięższą falę gołębi i bossa. 60 FPS cel; 30 FPS akceptowalne minimum na słabszym laptopie — oba **do zmierzenia**, nie gwarantowane.

## 2. Gra ma być pełnym, grywalnym doświadczeniem

Główna droga: wybór 1 osobistego przedmiotu na gracza → dynia/prolog → droga i ciało → cmentarz, wybór grobu + opcjonalny znicz → ratunek przed grobem albo po nim (Sandra namawia, decyduje Aleks) → domek, nożyce, umierający nieznajomy → widoczny Mściciel-klon → powstanie Gabrysia, Borysa, Weroniki → wyjście **przed** bramę, wybór 1 z 5 ofiar → 3 osobne ścieżki wejścia do Goon Roomu (ofiara z grobu; Sandra: karaoke; Aleks: pojedynek+Epitafium) → quiz 1 zaufanie → quiz 2 **wspólne zatwierdzenie** zwierzęcia → quiz 3 inkubator → mówiące drzwi → zoo (5 fok, 5 żółwi, konsekwencje porażek) → powrót w czasie przy dyni → odrębna para Alex/Salsa i kontekst ciała/krzyża → ujawnienie Toma → faza 1 trans Sandry/rzędy żółwi → faza 2 Angry Tom, echa, klony i ataki → świadomy wybór jednego z odblokowanych endingów → pełna scena i epilog.

- Te sceny nie są wyłącznie opisami w menu: muszą być **renderowane, grywalne, z triggerami, kolizjami, dialogami, kamerą, wyborem i skutkiem**. Tymczasowe modele proceduralne 3D ASCII są akceptowalne jako assety, ale nie zastępuj całej gry pustymi ekranami i tekstem.
- Wstępne zdarzenia dzieją się **w jednym obiegu**, pamięć bohaterów jest resetowana dopiero podczas pełnego restartu wywołanego dynią. Wybrane flagi/ending unlock można zapisywać osobno jako meta-progres, lecz nie przypisuj bohaterom pamięci z poprzedniego resetu.
- **BLOKER FABULARNY:** autor zastrzegł dokładne wydarzenia, przez które Alex (X) i Salsa stają się ciałem przy drodze i człowiekiem na krzyżu. NIE wymyślaj dla nich metod śmierci, dialogów o przyczynie ani nowych wariantów. Zaimplementuj przestrzenną lokację, interaktywne przejście i jawny `author_pending` scene hook, zapewniający grywalne dotarcie do następnego rozdziału. Oznacz to jako **nieukończoną fabułę**, nie jako „pełne lore ukończone”.
- Nie dodawaj nowego żywego NPC dla scen Weroniki; jej matematyczne nawiązania mogą mieć tablicę/projekcję w korytarzu (opcjonalna mini-scenka z v6). 

## 3. Dialogi, wybory i presja czasu

**KANON:** Dialogi pary między wydarzeniami są integralną częścią gry. Krótkie, złośliwe i zabawne, ale uruchamiane tylko raz w odpowiednim kontekście, z reakcjami uwzględniającymi grób, ofiarę, zaufanie, pochówek, znicz i poprzednie decyzje. Oddzielne napisy/hud od ASCII świata; można dodać dźwięki liter, lecz NIE generuj ani nie imituj bez zgody głosów rzeczywistych Aleksa, Sandry czy innych osób. Custom głos Rema można nagrać opcjonalnie lokalnie.

- Przy grobach intencje `[Powiedz coś miłego]` / `[Powiedz coś niemiłego]`, nie pokazuj pełnej wypowiedzi przed wyborem. Dla Gabrysia po złośliwej intencji submenu `dziwko / szmato / suko`, późniejsza riposta wykorzystuje wybrany wariant.
- **Gabryś, nowy nagrobek:** „Jakbyś umarł, Aleks zapomniałby o tobie po trzech sekundach.” Po złośliwej odpowiedzi Aleks wypowiada „I co, Gabryś? Przeżyłem dłużej od ciebie, a ja o tobie, {wyzwisko}, nie zapomniałem.” Miły wariant, riposty Gabrysia — wersje robocze z v6. Osobna późniejsza możliwość pogodzenia: Aleks mówi, że Chrupek lepszy od Lili i Areny, **Sandra musi to potwierdzić**.
- **Borys, nowy nagrobek:** „Młody, piękny milioner. Niestety milion go nie uratował przed śmiercią.” Sandra może skomentować milionową rentę, Aleks odpowiada „Co kurwa?”; precyzyjne sformułowanie renty jest niezatwierdzonym brzmieniem mowy → zapisz w edytowalnych danych. ETF i Tom Clicker = jego motyw.
- **Weronika, nowy nagrobek:** „Męczyła się na studiach i nawet nie zdążyła ich skończyć. Beka XD.” Złośliwa opcja: Aleks „Kurwa, i tak by tego roku nie zdała. Ha, ha, ha!”, Sandra „No, rel.”; miła opcja i późniejsze riposty w v6. Motyw studiów, poprawki i irytującego matematyka. Mini-epizod „Sesja poprawkowa” wyłącznie jako opcjonalny element, **nie** zastępuje żadnego z 3 pytań quizu.
- Wybór samego Aleksa: po jego deklaracji Sandra reaguje „Ty szmato!”, Aleks może odparować „Nie patrz się, kurwa!”, Sandra ma realny udział, potem pojedynek, pochowanie, trzywersowe Epitafium. Bez suchego przeskakiwania scen.
- Timer dramatycznych wyborów np. 12 sekund, starts **po zakończeniu kwestii**, pokazany dużym czytelnym licznikiem, narastające efekty dźwiękowe. Po upływie czasu **NIE losuj ofiary**, nie wymuszaj trwałej krzywdy: zatrzymaj na opcji „milczenie / wybierz ponownie” z presją fabularną albo ponów krótką sekwencję. Ustawienie presji czasu dostępne w menu. Nie ograniczać czytania epitafiów i dłuższych tekstów.
- Treści z v6 (dialogi między scenami) to bank roboczy; nie uruchamiaj każdej kwestii po kolei, tylko na triggerach. Lokalizacja po polsku; wszystkie kwestie i warianty jako edytowalne dane w repo.

## 4. Mechaniki i przedmioty — bez regresji

**KANON:** 1 prywatny przedmiot na osobę (Aleks: Rem, gaźnik, karma, widelec, gouda, długopis; Sandra: to samo + pluszak Tom). **Brak przekazywania** między osobami. Nożyce znalezione w domku to *wspólny fabularny rekwizyt*; nie koliduje z limitem osobistych przedmiotów. Widelec zmniejsza liczbę fok z pięciu o 1; gouda o 3; oboje mając różne przedmioty mogą obniżyć liczbę do jednej. Trzywersowe Epitafium i karaoke bez softlocków. Prawdziwa Lila jest demonicznym psem Toma; jeśli wcześniej wybrana i gracz ma karmę, można ją przed walką oswoić i walczy po stronie pary. Chrupek: po wyborze jego ciało spada w Goon Roomie, można je zjeść dla HP/dmg, lecz bohaterowie losowo szczekają (mogą ujawniać pozycję).

- Quiz 1: Aleks i Sandra osobno deklarują zaufanie; skutki emocjonalne i warunki zdrady. Pochowany może się zemścić nawet jeśli wcześniej ufał. Liść między bohaterami = **czysty żart, bez licznika agresji, bez skutków endingowych**.
- Quiz 2: **jedno zwierzę uzgodnione przez oboje**; każda osoba wskazuje/akceptuje, rozbieżność blokuje tylko potwierdzenie do czasu uzgodnienia. `Arena` = co 5 minut aktywnej gry 1 minuta na 3 miauknięcia; przy porażce gołębie → ending „Impreza Halloween”, potem checkpoint przed tym pytaniem. `ETF` = giełda+Tom Clicker; porażka wymusza pożyczkę gołębia.
- Dług gołębia: **10 łatwo widocznych, subtelnie świecących piór** w stałych miejscach (3 Goon Room/wyjście, 3 zoo, 4 droga po cofnięciu). Zebranie 10 → gołąb odbiera, dług spłacony. Niezebranie → dodatkowa krótka walka lub spłata przed bossem. Nie blokować trwałe kampanii.
- Zoo: 5 fok dla Aleksa, 5 żółwi dla Sandry. Niepowodzenie Aleksa = czasowa focza klątwa, wolniejszy ruch; tabliczka w grze objaśnia, że **Sandra musi pokonać foczą formę Aleksa**, po czym ludzki Aleks wyskakuje, focza skóra zostaje. Niepowodzenie Sandry = dzień w zoo trwa 60 s; Aleks przez ten czas scrolluje ASCII TikToka. Oba skutki mogą współistnieć i mieć obsługiwane wejścia sterowania.
- Goon Room: bez długopisu quiz można zaznaczyć krwią z karą -3% obrażeń dla konkretnej postaci. Rem może mieć lokalnie nagrany własny dźwięk. Kartka gaźnik podpowiada o klonie i pomaga wskazać właściwego Toma po oczach.
- Widoczny klon-Mściciel jest częścią fabuły i może zginąć w katastrofie, ale oryginalny Tom przeżywa i wraca na finał; nie tworzyć „nieśmiertelnego klona” bez źródła.

## 5. Walka 3D, boss, minigry — doprecyzowanie implementacji

**ZALECENIE WYKONAWCZE:** Oprzyj dokładne wartości HP/obrażeń, kontrolki i czasy początkowo na tabelach v5, potem wyreguluj po uruchomieniu i testach. Żadna mechanika nie wymaga ultraprecyzyjnego refleksu. Auto-aim w sektorze kierunku patrzenia, jedna akcja ataku na gracza, unik z czytelnym cooldownem, współpraca przy combo, możliwość podniesienia drugiego gracza. Na typowej laptopowej klawiaturze wykonaj test ghostingu rzeczywistych kombinacji obojga; udostępnij remap. Fizyka 3D i kolizje w świecie, niezależne od FPS.

- Faza 1 Toma: Sandra wyrywa się z transu minigrą strzałek, Aleks unika rzędów żółwi. Faza 2: Angry Tom — arena 3D z czerwonym pentagramem i krzyżami, echa, 7 zwykłych ataków z v5 oraz jeden grobowy zależny od odwiedzonego grobu.
- Łapa gniewu: wyraźny **czerwony obszar na podłożu 3D przed ciosem**, przytrzymany ~1,8 s, pod nim kształt/wzór także dla osób z problemem rozróżniania barw; dopiero potem łapa uderza. Nie może przemieszczać się z graczem po ustaleniu pozycji.
- Pentagram: wyraźna zapowiedź ~2,3 s; fala powoli przechodzi przez arenę, zwykłym ruchem można dostać się do bezpiecznej luki. Alternatywnie unik. Nie wymaga skoku ani refleksu w jednej klatce.
- Rząd żółwi zostawia zawsze **co najmniej jeden bezpieczny korytarz dla dwóch postaci**. Pozostałe: krzyżowy promień, szarpnięcie czasu, deszcz dyni, przemarsz klonów mają widoczne telegraphy i niesprzeczne hitboxy (v5).
- Grób Gabrysia → Meimei Apokalipsa (kot i 3 pazury), Weroniki → Klątwa Wiedźmy (3 kręgi), Borysa → Krypto Krach (wykres). Zapalenie znicza powoduje, że duch przy tym ataku **raz osłania** graczy. Pozostałe duchy podczas finału krzyczą żarty po chińsku (jeśli brakuje ustalonych fraz, przygotuj bezpieczne, poprawne językowo krótkie sample z możliwością edycji; NIE wstawiaj fałszywych losowych znaków jako rzekomo chińskich słów).
- Nożyce służą do uwolnienia ech; echa wbiegają w Toma i eksplodują, zadając obrażenia. Brak nożyc = trudniejsza, ale możliwa walka.
- Minigra klonów: oryginał różni się **kolorem oczu**, kartka gaźnik daje podpowiedź. Stałe miejsce tej minigry ustal dla jednej implementacji (zalecane przed wejściem do fazy 2), nie odpalaj jej podwójnie. Niewłaściwy wybór to kara w walce, nie hard game over.
- Epitafium, karaoke, życzliwość/złośliwość, ETF (robocze liczby), zoo, Sesja Weroniki, gołąb i finał dyni — zaimplementuj jako osobne, testowalne moduły, z klarowną definicją wygranej, przegranej, restartu i checkpointu. Karaoke mikrofonowe mierzy **rytm/głośność**, nie rozpoznaje słów; tryb bez mikrofonu równorzędny, bez zgody na mikrofon żaden dialog nie blokuje gry. Oryginalny głos Rema nagrywany wyłącznie po świadomej zgodzie.

## 6. 7 zakończeń i priorytet wyborów

Zachowaj warunki i pełne szkice cutscenek z v5 (rozdz. 9–11). Żadne zakończenie poza przegraną Areny nie powinno uruchomić się przypadkowo bez świadomej końcowej decyzji. Warunki blokowane przez przedmiot pokaż w UI bez spoilerowania całej fabuły. Wszystkie endingi mają: warunek, zmianę stanu, scenę, dialog, epilog, restart/checkpoint zgodny z v5. Normalny ending „Nieskończona noc” pokazuje, że dynia zawsze prawdziwie ostrzegała i jednocześnie kierowała w pułapkę; reset pamięci; napis „Możesz wybrać każdą drogę. Ale nie możesz wybrać, dokąd prowadzi.” Dopiero rozbicie zasad dyni pozwala zakończyć pętlę.

Sekretny „Ostatni świt” wymaga: Aleks **ma karmę**, Sandra **ma pluszaka**, oboje **ufają**, **wspólnie wybrali Lilę**, oswoili ją, zabrali **nożyce**, uwolnili **co najmniej dwa echa** i wybierają finałowy rytuał z dynią. Dwa ostatnie warunki dot. liczby ech i dokładnego sposobu rozwiązania to **proponowany balans v5**, a nie dosłownie zatwierdzone zdanie autora. W finale współpracują przy symbolach/pierścieniach; wygrana daje prawdziwy świt oraz wolność Aleksa, Sandry i Lili. Ending 5 ratuje parę kosztem Lili; epilog z **dwiema Lilami** i jedną z czerwonymi oczami.

## 7. Wymagania dla kodu, bezpieczeństwa danych, sprzętu i UI

- Nie wdrażaj backendu, logowania, kont użytkowników ani płatności — offline/local-first. Zależności tylko potrzebne, bez zewnętrznego telemetrowania rozmowy lub nagrań.
- Obsłuż brak internetu po wczytaniu (cache/pack assetów lokalnych, jeśli architektura na to pozwala), brak mikrofonu i odmowę dostępu, wyłączony dźwięk, ekran 1366×768 i 1920×1080. Wszystkie napisy czytelne, HUD nieskalowany do pikselowej siatki ASCII.
- Zapis do `localStorage` lub IndexedDB zależnie od rozmiaru; wersjonowanie save, migracja aliasów z poprzednich wersji (`Boris`→`Borys`), atomowy checkpoint na granicach etapów, brak softlocków i odtwarzanie bez dublowania cutscenek. Osobny zapis meta-unlock zakończeń i bieżącej pętli.
- Pracuj na istniejącym stacku, jeśli nie szkodzi celom. Nie przepisywać bez twardej przyczyny. Jeśli kod istnieje, najpierw testy/screenshoty/stany „przed”, potem zmiana i regresja.
- Sterowanie z `KeyboardEvent.code`, z obsługą `keydown/keyup`, focus/blur, preventDefault tylko w obszarze gry; rozróżniaj `ShiftLeft/ShiftRight`. Ustawienia rebindingu, test wieloklawiszowości i wskaźnik konfliktów. Nie łam klawiatury przez odpalanie zbędnych skrótów systemowych.
- Wyłączyć zbędne animacje podczas pauzy i gdy karta jest w tle, zachować stabilny delta-time i nie wykonywać „catch-up spiral” przy powrocie z tła. Sceny 3D tak zaprojektowane, żeby gracz nie tracił sylwetki przy przybliżeniach ani przy zbyt ciemnych fragmentach.

## 8. Blokady i uczciwy status „gotowe”

Nie uznawaj zadania za skończone po uruchomieniu samego prologu. Wymagane: od początku do napisów przez co najmniej jeden pełny ending; 7 endingów dostępnych wg warunków (można przyspieszać ścieżki testowymi snapshotami tylko w testach); testy ruchu dwóch osób, nagrobków, odrodzeń, dialogów, pauzy, zapisu, powtórek i softlocków; sceny krytyczne renderują się w 3D ASCII (Mściciel wcześniej niż brama). Raport musi wymienić testy realnie uruchomione, urządzenia i FPS faktycznie zmierzone, ścieżki plików i istotne ograniczenia. **Niedokończona sekcja Alexa i Salsy pozostaje blockerem autorskim.** Nie udawaj, że to już kompletna, zaakceptowana fabuła.

Zalecany układ końcowy: `docs/PLAN_REALIZACJI.md`, `docs/STATUS.md`, `tests/` scenariusze e2e/states, debug menu tylko deweloperskie, `npm run build`, `npm run test`, `npm run lint`, `npm run e2e` lub odpowiadające istniejącemu stackowi.

## 9. Zewnętrzne, potwierdzone podstawy techniczne

- https://threejs.org/docs/pages/EffectComposer — wieloetapowy postprocess (dla WebGLRenderer).
- https://threejs.org/docs/pages/WebGLRenderer — render target i kontrola pixel ratio.
- https://threejs.org/manual/pages/post-processing.html — renderuj rzeczywiste 3D do tekstury, potem zastosuj efekt.
- https://developers.openai.com/blog/run-long-horizon-tasks-with-codex — długie projekty jako kamienie milowe, plan, walidacja.
- https://developers.openai.com/cookbook/examples/codex/iterating-development-workflows-with-codex — instrukcje w AGENTS.md, PLANS.md.

Nie przypisuj żadnej z tych stron benchmarków konkretnej gry; wymagane testy lokalne.
