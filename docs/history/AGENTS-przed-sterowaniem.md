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

## Bieżąca fabuła

Dynia na środku ścieżki ostrzega „Aleks! Sandra! Za późno… On nadchodzi… To… to nadchodzi! Biegnij!”, śmieje się i otwiera twarz. Po przejściu Aleks i Sandra dostrzegają ciało i ptaki. Wybierają Gabrysia (Gabriela), Weronikę albo Borisa; Boris jest człowiekiem i zastępuje Chrupka. Zachowaj odrębne miejsca, bryły, opisy oraz dokładne cytaty z `destinations`. Nadruk Gabrysia pochodzi z dostarczonego `meimei (1).jfif`.

Przed bramą krótko pojawia się chowająca się postać. Człowiek na krzyżu ostrzega „Uciekajcie…”. Wybór: pomoc albo najpierw grób. Domek zawiera ciała, krew i nożyce. Wzięcie nożyc skutkuje uwolnieniem: więzy znikają, ręce opadają, człowiek zostaje opuszczony. Ucieczka prowadzi do wybranego grobu, jeśli nie był odwiedzony, i późniejszej próby pomocy bez narzędzia.

Mściciel ma pistolet, zmarli powstają z grobów, konfrontacja przenosi się przed cmentarz. Pięć finałowych wyborów: Gabryś, Weronika, Boris, Sandra, sam Aleks. Wybór siebie kończy się kostką, „Tom. Tom. Tom.” i atakiem wron na Mściciela. Pozostałe kończą się upadkiem wskazanej osoby i kwestią o trzech klapsach. Zachowuj kwestie podane przez użytkownika, również wulgaryzmy. Przerywniki płyną samodzielnie; rozmowy i decyzje czekają na gracza. R zeruje cały akt.

## Implementacja i kontrola

Samodzielny HTML bez obowiązkowych paczek lub bundlera. Projekcja, bryły, renderer ASCII, dialogi, dźwięki i stan aktu znajdują się w tym pliku. Stała geometria nagrobków jest buforowana; nie przywracaj kosztownej konwersji wielu kolorów w każdym wierszu. Cel to 30 kl./s, nie deklaruj 60 FPS bez pomiaru.

`window.__NOCTURNE` to ukryte API kontroli: seek/renderAt/rawAt/benchmark, performance/resetPerformance, gameState/audioState, resume i advanceAct. Przyspieszanie przerywników służy wyłącznie testom.

Sprawdzaj składnię, błędy renderera, dwie rozdzielczości desktopowe, rzeczywiste odstępy klatek, trzy nagrobki i UTF-8, audio, reset i rozgałęzienia. Test macierzy obejmuje 3 cele × 2 kolejności × 2 decyzje domku × 5 finałów = 60 przebiegów. Odróżniaj testy stanów z przyspieszonymi przerywnikami od oglądania animacji w czasie rzeczywistym. Wyniki zapisuj w `diagnostics/`, kadry w `previews/`; aktualizuj `ZMIANY-I-TESTY.md` bez dopisywania sprzecznych „najnowszych” akapitów.
