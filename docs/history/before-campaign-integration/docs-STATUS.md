# Halloween — stan rzeczywisty po przyjęciu V12

## Źródło i audyt

Pakiet V12 dostarczony przez użytkownika jest zachowany w spec-v12. Zawiera dokumentację i mapy, nie nowy silnik. Działający projekt: index.html, własna projekcja geometrii 3D na Canvas i końcowy WebGL2 ASCII z fallbackiem Canvas. Brak bundlera i wymaganych zależności gry; Playwright/Edge służą testom. Dodano wersjonowany zapis checkpointów eksploracji i quizu w localStorage. Audio: lokalna synteza i głosy systemowe.

## Wykonane teraz

- Zaimportowano wszystkie pliki V12 i wskazano pierwszeństwo kanonu.
- Tytuł Halloween, Goon Room, Borys; zachowane wewnętrzne identyfikatory dla zgodności.
- Quiz 1 nadal niezależny. Quiz 2 wymaga uzgodnienia jednego zwierzęcia; rozbieżność nie zamyka edycji, więc nie tworzy softlocka. Wspólna odpowiedź zapisana jako quiz.animal.

## Działające wcześniej, wymagające dalszej adaptacji

Prolog, ekwipunek, dwie sterowane postacie, kamera, groby, domek/nożyce, krzyż, Mściciel, wybór ofiary, burza z Tomem i katakumby z dwoma krzesłami. To NIE jest pełna implementacja V12. Starsze testy sprawdzały starszy zakres; te wymagające niezależnych zwierząt są obecnie historyczne i trzeba je zmienić.

## Nieukończone

- Ton grobów i pełne flagi pamięci; ranny i wskazówka zostały dostosowane (patrz aktualizacja poniżej).
- Dwie gałęzie: pojedynek/pochówek/Epitafium oraz Karaoke z fallbackiem. Stare finały siebie i Sandry wymagają zastąpienia zgodnie z V12.
- Skutki zwierząt, Arena, ETF/clicker, Szaman i 10 piór; quiz 3 i przejście dalej.
- Zoo, 5 fok/5 żółwi, klątwa/odczarowanie i minuta TikToka; powrót czasowy.
- Pełny system walki, przeciwnicy, broń/pancerz, revive i boss Tom 7+3 ataków; duchy, klony i echa.
- Automatyczny resolver 7 zakończeń, cutscenki i epilogi. Nie dodawać menu endingów.
- Dalsze checkpointy przyszłych modułów, meta-unlock zakończeń i migracje przyszłych formatów; remap/ghosting, profile jakości, dalsza optymalizacja i pełne testy kanonu.

Nie deklarować ukończenia całości. Cel pozostaje aktywny. Nie testować telefonu.

## Aktualne dowody

- tests/v12-shared-quiz.cjs: 16/16 par zwierząt, niezgodność pozostaje edytowalna, uzgodnienie klawiaturą, stare kliknięcie odrzucone, reset animal do null; desktop 1366×768, błędy JS: 0.
- Optymalizacja drzew: stały kolor i cień obliczane raz na drzewo, zamiast na każdą gałąź. Obraz kontrolny jest identyczny bitowo przed/po (SHA256). Mediany czasu samego rastra 16,3 ms przed, 20,4 ms i 13,1 ms po pokazują zmienność pomiarów — brak dowodu stabilnego wzrostu FPS. Wyniki w diagnostics/v12-render-profile.json.
- node --check przeszedł. Serwer podaje aktualne bajty index.html.

## Zapis i ratunek — kolejny wykonany etap

- Wersja 1 checkpointu w localStorage, jeden atomowy rekord. Zapis na granicach celów, przy otwarciu/zamknięciu quizu i przy zamykaniu strony, tylko w stabilnym stanie. Cutscenki i callbacki nie są serializowane. Wybór WZNÓW w menu działa myszą i Tab/Enter. Pełny R kasuje zapis bieżącej pętli.
- Odtwarzane pozycje, ekwipunek właścicieli, nożyce, flagi świata, kamera, sala/wnętrze i niezależny atrament/odpowiedzi quizu. Uszkodzony lub nieobsługiwany rekord ignorowany bez blokady nowej gry. Brak wsparcia meta-endingów na tym etapie.
- Nieznajomy po przecięciu więzów opada do pozycji leżącej pod krzyżem, przestaje oddychać i umiera mimo pomocy. Wariant pomoc najpierw + nożyce daje wskazówkę „Nie ufajcie temu, który wygląda jak on”. Zapisywane strangerDead oraz rescueHint; inne warianty nie dają wskazówki.
- Mściciel zaczyna od „Odwróćcie się”, dostaje osobne zbliżenie kamery w ambush oraz jaśniejsze księżycowe cieniowanie stroju. Marsz do bramy odbywa się później. Kadr previews/v12-avenger-introduction.png obejrzano; postać i broń widoczne pośrodku cmentarza przed eskortą.
- tests/v12-checkpoints.cjs: sześć grup testów (wznowienie świata klawiaturą, częściowe zaufanie, różny atrament, uzgodnienie po reload, kompletny quiz i ruch, reset i błędne rekordy); błędy JS 0.
- tests/v12-act1.cjs: 12/12 tras (3 groby × 2 kolejności × 2 decyzje nożyc) przez rzeczywisty system wejścia i przyspieszoną symulację. Sprawdza śmierć nieznajomego, wskazówkę i nieprzerwane dojście do eskorty.
- tests/v12-avenger.cjs: dodatkowy przebieg do pokazania Mściciela przed eskortą, zapis kadru i kontrola JS.

Dalszy priorytet: gałęzie siebie/Sandry i minigry wskrzeszenia, następnie pełne skutki zwierząt i quiz 3. Cała V12 nadal nie jest ukończona.
