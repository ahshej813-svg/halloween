# NOCTURNE — zasady pracy dla Codexa

## O projekcie
Jednostronicowa, kinowa animacja grozy Halloween w **prawdziwym ASCII** dla Aleksa i Sandry. To jedna, nieprzerwana przestrzeń z perspektywą 3D: księżyc, chmury, drzewa, mgła, dynia, kamienna ścieżka i docelowo dojście do cmentarza przez dwie postacie.

## BEZWZGLĘDNE ZAŁOŻENIA
1. **Cały obraz świata jest rysowany widocznymi znakami ASCII (monospace)**. Nie zamieniać efektu końcowego na zwykły raster, Three.js bez ASCII ani płaskie animowane obrazki. Wolno renderować scenę pomocniczą do offscreen Canvas, ale każdy widoczny element musi przejść przez końcową warstwę znaków.
2. **Prawdziwe poczucie głębi 3D**: perspektywa, occlusion, skale zależne od odległości, oświetlenie i paralaksa. Elementy mają mieć sensowne położenie w przestrzeni, bez nachodzenia obiektów, które psuje kompozycję.
3. Styl ma być **klimatyczny, szczegółowy, czytelny i czysty**. Nie tworzyć dywanów z `W`, `#` lub chaotycznego szumu.
4. **Nie pokazywać żadnych nagłówków, tytułów, HUD-ów ani napisów typu „NOCTURNE / PROLOG” w animacji.** Minimalny kontroler replay na końcu jest akceptowalny.
5. Całość musi być **na jednej podstronie**, z nieprzerwanym przejściem z intro do drogi/cmentarza — bez przeładowania.
6. **Zachować istniejący kod i osiągnięcia**, a nie pisać od zera bez potrzeby. Zmiany iteracyjne, sprawdzane na podglądzie desktop + mobile.
7. Docelowa rozmowa idących postaci — **dwa głosy (męski i żeński)** — będzie opracowywana później. Nie dodawać dialogów, dopóki użytkownik ich nie dostarczy.

## Obecny stan
- `index.html` — ostatnia, aktualna wersja animacji: **NOCTURNE_ASCII_SCENA_FILMOWA.html**. Jest samodzielna; nie ma bundlera ani wymaganych paczek npm.
- Render: projekcja własnej sceny 3D na ukrytym Canvas 2D, następnie konwersja na znaki w `asciiFrame()`; animacja przez `requestAnimationFrame()`.
- Istnieją kamera, księżyc, dynia, drzewa, chmury, ścieżka, brama, nagrobki i dwie idące sylwetki.
- Ukryty kontroler `window.__NOCTURNE.renderAt(seconds)` umożliwia podgląd konkretnej sekundy, `benchmark(seconds)` umożliwia pomiar.
- `references/intro-desktop.png`, `references/cemetery-transition.png`, `references/intro-mobile.png` — kadry *istniejącej implementacji*, nie cele jakościowe (użytkownik chce jeszcze ładniejszy efekt).
- `docs/pierwotny-kontekst.md` — starsze ustalenia. Gdy kolidują z tym plikiem, pierwszeństwo mają **najnowsze założenia powyżej**.

## Najbliższy priorytet
Dopracować **pierwszą część** sceny: czytelny kraterowany księżyc, bardziej realistyczna, przestrzenna dynia z czytelną wyciętą twarzą; stylowe chmury, wysokie, bezlistne drzewa, kamienna droga, głębia i porządek w kadrze. Ścieżka musi logicznie prowadzić dalej do cmentarza, ale główne skupienie jest teraz na intro. Znacznie poprawić wygląd, zachowując 100% ASCII na ekranie.

## Zasady weryfikacji
- Uruchom lokalną stronę i obejrzyj animację w ruchu, nie tylko jeden screenshot.
- Sprawdź przynajmniej widok desktop ~1280×800 i telefon ~390×844.
- Sprawdź pierwsze ~20 s i dojście do cmentarza po ~35 s.
- Wypatruj kolizji księżyca z drzewami/chmurami, zlewania się sylwetek, migotania znaków, nieczytelności dyni, spadków FPS.
- Nie zmieniaj stylu ani fundamentalnego sposobu renderowania wbrew wymaganiom.


## Aktualizacja użytkownika 28.10.2026 — pierwszeństwo przed starszym stanem
Użytkownik poprosił o tymczasową przemowę dyni już teraz, jej śmiech i otwarcie twarzy z przejazdem kamery przez paszczę. To upoważnia do obecnej roboczej treści głosowej mimo starszego zakazu dodawania dialogów. Dynia stoi na środku drogi. Dodano strumień po prawej, większy cmentarz, nietoperze i wrony z cichym dźwiękiem. Zgodnie z późniejszą instrukcją użytkownika nie wykonywać testów telefonu. Dźwięk uruchamia pierwsze kliknięcie sceny lub Enter/spacja. Obraz nadal w całości ASCII. Aktualny stan i weryfikacja są w ZMIANY-I-TESTY.md.


## Nowsza aktualizacja użytkownika — dialogi i wybory
Usunięto rzeczkę na prośbę użytkownika. Dodano pomarańczowe latarnie, ciało z żerującymi ptakami i rozróżnione sylwetki Aleksa oraz niższej Sandry. Użytkownik wyraźnie zażądał rozmów, dwóch głosów, napisów oraz opcji dialogowych, więc wcześniejsze ograniczenie dotyczące napisów nie obejmuje obecnego panelu rozmowy. Wyborami są Gabriel, Weronika i Chrupek (pies, z odmiennym grobem). Wybrany cel zmienia fabułę, trasę, nagrobek i interakcję końcową. Nie wycofywać tych funkcji z powodu starszych założeń. Świat nadal w całości ASCII; panel dialogowy to czytelny HTML. Zasada niewykonywania testów telefonu pozostaje w mocy. Szczegóły: ZMIANY-I-TESTY.md.


## Najnowsza korekta — mrok i odkrycie na drodze
Panel rozmowy ma teraz terminalowy klimat ASCII i położenie bliżej środka. Oświetlenie przygaszone, dodane kierunkowe cienie sylwetek na gruncie. Po dyni cmentarz jest wciąż odległy. Najpierw para odkrywa zakrwawione ciało, żerujące ptaki i ruch w krzakach, potem wybiera odwiedzany grób. Zachować poprawkę audio: pierwsze włączenie dźwięku nie może pomijać aktualnej kwestii Sandry. Szczegóły i testy w ZMIANY-I-TESTY.md.


## Martwa roślinność
Na prośbę użytkownika dodano faktyczne, wyraźne krzewy, suchą trawę, pniaki i powalone konary. Zachować ich stałe położenie, cienie oraz rezerwację ścieżki i widoczności miejsc pamięci. Wszystkie dekoracje nadal przechodzą przez renderer ASCII.


## Widoczność ciała — korekta ze screena
Priorytetem jest odsłonięcie ciała i czerwonej krwi. Krzaki zmniejszone i pomijane przy ciele; ciało bliżej, ślad krwi prowadzi skrajem drogi w kierunku cmentarza. Dodano dalsze plany drzew i delikatny ruch całego terenu. Zachować wolną drogę i czytelność obu postaci.


## Jasny księżyc i uszkodzona ścieżka
Użytkownik chce jasnego, estetycznego księżyca, widocznych drzew w tle i umiarkowanie zniszczonej ścieżki o nieregularnych kamieniach. Wzmocniono jasność tarczy oraz czytelność dalszych gałęzi w końcowym ASCII. Zachować nierówne spoiny i lokalne ubytki nawierzchni oraz subtelny ruch między pniami.


## Najnowsza decyzja — wyłącznie światło księżyca
Użytkownik usunął pomarańczowe oświetlenie. Latarnie są wygaszone, nie emitują światła; brak błysków i ciepłego blasku dyni. Cienie mają jeden kierunek księżycowy. Na środku cmentarza dodano krzyż z ciężko rannym, zawieszonym człowiekiem, który unosi głowę i mówi „Uciekajcie…”. Zachować scenę w ASCII, bez dosłownych detali okaleczeń. Ostrzeżenie jest nowym, jednorazowym zdarzeniem przed dojściem do wybranego grobu.


## Najnowsza aktualizacja — Boris, Gabryś, Weronika i bryły
Boris jest człowiekiem (użytkownik potwierdził) i zastępuje Chrupka. Gabriel zmieniony na Gabrysia. Każdy ma inne miejsce, model, opis i cytat podany przez użytkownika. Gabryś ma nadruk ASCII z meimei (1).jfif z Pobranych oraz cytat o Aleksie i 3 sekundach. Weronika i Boris mają swoje cytaty z wulgaryzmami — to treść użytkownika. Wprowadzono modele bryłowe z normalnymi i cieniowaniem, odmienną geometrię nagrobków i anatomicznie podzieloną postać na krzyżu, bez dosłownych detali okaleczeń. Zachować UTF-8, polskie znaki i widok zbliżenia napisu. Wiatr ma narastać podczas marszu i poruszać martwą oraz żywą roślinnością. Aktualny stan: ZMIANY-I-TESTY.md.


## Najnowsza korekta — płynność i perspektywa
Końcowa konwersja świata do ASCII jest teraz shaderem WebGL2 z atlasem znaków; w razie braku GPU pozostaje znakowy fallback Canvas. To nadal 100% widocznych glifów, nie zwykły raster 3D. Kamera po intro ma wysokość ludzkiego oka i wspólną trasę z parą. Przy krzyżu poprawiono tułów, normalne, rozstaw nóg i detale twarzy oraz dodano małą plamę krwi. Przed wejściem, 43–50 s fabuły, z lewej strony krótko ukazuje się człowiek i chowa za drzewem. Zachować LOD, mgłę dystansową i proporcje fontu/siatki; nie przywracać kosztownego rysowania każdego koloru w każdym wierszu. Pomiary i ograniczenia są w ZMIANY-I-TESTY.md.


## Najnowszy akt fabularny
Użytkownik dodał pełną gałąź domku, próbę ratunku, Mściciela z pistoletem, powstanie trzech zmarłych i pięć finałowych wyborów. To autoryzuje nowe sceny, kwestie i opcje. Zachować państwo wyborów act, reset całości przez R i postoje na decyzje; przerywniki mają upływać samodzielnie. Wybór siebie kończy się interwencją Sandry i wron, a nie śmiercią Aleksa. Pozostałe wybory kończą się upadkiem wskazanej osoby i podaną kwestią o karze. Przemoc pozostaje niedosłowna, bez odsłoniętej anatomii. Szczegóły i ograniczenia testów: ZMIANY-I-TESTY.md.
