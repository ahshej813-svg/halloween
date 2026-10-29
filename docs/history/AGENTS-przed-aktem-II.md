# NOCTURNE — aktualne zasady kontynuacji

## Zakres i pierwszeństwo

Kontynuuj istniejący `index.html`, nie twórz projektu od zera. Najnowsze bezpośrednie polecenia użytkownika mają pierwszeństwo. `docs/history/`, starsze podglądy i `docs/pierwotny-kontekst.md` dokumentują historię; nie stanowią dodatkowych zadań ani aktualnych poleceń. Poniższy stan porządkuje wcześniejsze, częściowo sprzeczne aktualizacje.

## Niezmienne założenia

1. Cały widoczny świat przechodzi przez końcowy renderer znakowy. Dozwolone są ukryte rastry pomocnicze, projekcja brył i WebGL2 z atlasem glifów. Nie pokazuj gładkiego rastra zamiast ASCII.
2. Zachowuj perspektywę, głębię, zależną od dystansu mgłę, cieniowanie i kompozycję. Kamienna, nieregularna ścieżka prowadzi do cmentarza. Rezerwuj widoczność postaci, krwi i tablic nagrobnych.
3. Całość działa na jednej stronie bez przeładowywania między scenami. Bez tytułów, HUD-u i dodatkowych napisów w świecie. Zamówione dialogi, wybory, napisy grobów i końcowy replay są częścią gry.
4. Dokument i teksty zapisuj jako UTF-8. Polskie litery w dialogach i inskrypcjach muszą pozostać czytelne. ASCII nadruku nie zastępuj innym obrazem.
5. Oświetlenie księżycowe, wygaszone latarnie, ciemnoczerwona krew. Brak rzeczki. Drzewa, niewielkie krzaki, trawy i wiatr; wiatr narasta podczas marszu. Okresowe nietoperze i wrony z cichym dźwiękiem.
6. Aleks jest wyższy, Sandra niższa, z długimi włosami i szalikiem. Zachowaj rozróżnienie w kolejnych scenach i dwa głosy. Włączenie audio nie może pomijać pierwszej wypowiedzi Sandry.
7. Przemoc pozostaje niedosłowna: ubrania, powierzchniowe ślady krwi, sylwetki i upadki, bez odsłoniętej anatomii.
8. Weryfikuj na komputerze, również w ruchu. **Nie testuj telefonu** — użytkownik odwołał wcześniejszą prośbę o taki test.

## Bieżąca logika i sterowanie

Po przejściu przez dynię kończy się automatyczny marsz. WASD steruje wyłącznie Aleksem, strzałki wyłącznie Sandrą. E/Enter uruchamia interakcję, gdy oboje są blisko celu. Zachować kolizje, normalizację ruchu po skosie, wspólną kamerę, limit oddalenia z komunikatem i blokadę ruchu w dialogach. Blur, ukryta karta i restart muszą czyścić wciśnięte klawisze. Podczas rozmowy strzałki obsługują wybory, nie Sandrę.

`play.objective` określa cel eksploracji, `play.stage` tryb sceny. Przejścia zależą od położenia i świadomej interakcji. Nie przywracaj postępu fabuły przez seek/time ani samoczynnego chodzenia pary. Zegar prologu i krótkie przerywniki mogą pozostać filmowe. `act.scene` przełącza tylko świat i wnętrze domku. Zmiana przestrzeni przez drzwi jest dozwolona dopiero po dojściu obojga.

Zachować wybory Gabryś (Gabriel), Weronika i Boris — człowiek. Nadruk Gabrysia pochodzi z dostarczonego meimei (1).jfif. Teksty grobów są w destinations; nie zastępować cytatów ani nadruku. Obejrzenie tablicy nie oznacza jeszcze wizyty i nie może unieważnić przycisku znicza. Sesja interakcji ma osobny licznik od tokenu syntezy mowy.

Obie kolejności, pomoc / grób, muszą domknąć wizytę i próbę ratunku przed Mścicielem. Domek znajduje się przy prawej stronie drogi przed bramą. Przedmiot można zabrać tylko przy stole. Po wybraniu nożyc albo ucieczki trzeba samodzielnie dojść do wyjścia. Jeśli grób już odwiedzono, nie polecać odwiedzać go ponownie. Bez nożyc człowiek pozostaje związany; z nożycami więzy znikają, ręce i ciało opadają. Nie cofać wizualnie ratunku po odejściu od krzyża.

Zmarli powstają przy swoich rzeczywistych grobach. Mściciel musi pojawić się na wolnym terenie. NPC idą ścieżką omijającą stałe przeszkody. Werdykt przed bramą wymaga obecności pary oraz dojścia wszystkich NPC do ich celów; pusta trasa nie wystarcza, jeśli NPC nadal stoi w innym miejscu.

Pięć finałów: Gabryś, Weronika, Boris, Sandra, sam Aleks. Wybór siebie uruchamia kostkę, „Tom. Tom. Tom.” i wrony; później para musi sama odejść drogą od cmentarza. Inne wybory kończą się upadkiem wybranej osoby i podaną kwestią o trzech klapsach. Zachować użytkownikowe dialogi, w tym wulgaryzmy. R zeruje stan, przedmiot, NPC, zakończenie i klawisze; licznik sesji interakcji pozostaje monotoniczny, aby odrzucać stare kliknięcia.

## Render i weryfikacja

Samodzielny HTML bez obowiązkowych paczek. Projekcja i końcowy renderer znakowy nadal należą do istniejącego projektu. Kamera śledzi pozycję i punkt patrzenia wspólnie, aby nie odwracała się podczas zmiany ujęcia. Bryły przecinające płaszczyznę bliską należy przycinać, nie usuwać całymi ścianami. W domku postacie i meble przechodzą przez wspólne sortowanie głębokości. Wybrane trzy groby zachowują pełne modele; LOD dotyczy dalszych dekoracji. Cel to 30 kl./s, nie obiecuj 60 FPS bez pomiaru.

Ukryte API __NOCTURNE: startPlay, playState, pathTo i simulate są przeznaczone do kontroli logiki i wejścia, nie jako autopilot gry. Pozostają renderAt/rawAt/benchmark, performance/resetPerformance, gameState/audioState, seek/resume i advanceAct. Przyspieszanie symulacji służy wyłącznie testom.

Testuj 60 kombinacji (3 cele × 2 kolejności × 2 decyzje domku × 5 finałów), fizyczne klawisze obu postaci, pauzę i reset, inspekcję grobu, przybliżenie do interakcji, NPC za bramą oraz ucieczkę końcową. Oddzielaj przyspieszone testy stanów od rzeczywistego czasu renderowania i głosów. Wyniki bieżące: diagnostics/coop-*.json. Instrukcja: tests/README.md. **Nie testuj telefonu.**
