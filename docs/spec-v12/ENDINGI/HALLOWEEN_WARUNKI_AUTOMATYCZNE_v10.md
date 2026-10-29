# Halloween — automatyczne zakończenia (v10)

## Najważniejsza korekta względem v9

**Nie istnieje menu wyboru zakończenia.** Po zakończeniu walki gra analizuje wyłącznie przedmioty przypisane Aleksowi i Sandrze, ich odpowiedzi oraz decyzje i wyniki minigier zapisane w trakcie fabuły. Odpala **jeden** pasujący ending i jego sceny. Gracze mogą dokonywać normalnych decyzji fabularnych (np. zgodzić się na plan podstępu), ale nie wybierają napisu „ENDING 4” ani opcji „zakończ tak”.

**Kanon:** siedem koncepcji zakończeń i wymienione wcześniej wymagane przedmioty, wspólny wybór zwierzęcia, ending 2 (szpital i wspólny sen) oraz zakończenie 1 (Sandra przy drodze, Aleks na krzyżu; Alex X i Salsa dopiero potem). **PROPOZYCJA wymagająca zatwierdzenia:** poniższa kolejność kolizji i szczegółowa reguła automatycznego uruchamiania endingów 3, 4 i 6. Ending 6: pusty świat jest nadal niezatwierdzonym rozwinięciem.

## Warunki

| Ending | Automatyczny warunek i rezultat |
|---|---|
| **2. Impreza Halloween** | Wspólny wybór Areny i niezaliczenie jej wyzwania: gołębie, omdlenie, **obudzenie w szpitalu po wypadku samochodowym po imprezie; oboje pamiętają ten sam sen**. Po napisach checkpoint przed wyborem zwierzęcia. |
| **3. Sandra Toma** | Sandra wybrała pluszaka **oraz** nie ufała Aleksowi w quizie **lub** pamięta, że Aleks ją pochował. Uściślenie: `sandraHasPlush && (!sandraTrustsAleks || sandraBuriedByAleks)`. Po pokonaniu Toma z tych powodów przechodzi na jego stronę. |
| **6. Dwa cienie** | Oboje nie ufają sobie **lub** istnieje nierozliczona uraza po pochówku, a nie uruchomiła się wcześniej gałąź „Sandra Toma”. W scenie zdrady jeden bohater zostawia drugiego i wpada do pustej kopii świata. **Wciąż propozycja**. |
| **4. Nóż w plecy** | Sandra ma pluszaka, **przed finałem** podczas zwykłej rozmowy z Tomem proponuje pozorny rozejm, Aleks popiera plan. Te normalne decyzje zapisują `truceProposed && aleksBackedTruce`. Po pokonaniu Toma układ i nóż pojawiają się automatycznie, bez menu endingów. |
| **7. Ostatni świt** | Aleks ma karmę, Sandra ma pluszaka, oboje ufają sobie, wspólnie wybrali Lilę, oswoili ją karmą, zachowali nożyce, uratowali przynajmniej dwa echa i nie spełnili wcześniej kończącej grę ścieżki zdrady lub podstępu. Sekretna walka z dynią zaczyna się automatycznie. |
| **5. Lila przeciw panu** | Para wspólnie wybrała Lilę i **którykolwiek z nich** ma karmę, którą oswoili Lilę przed bossem. Jeśli nie uruchomiła się nadrzędna gałąź, Lila ratuje parę, poświęcając swoją wolność. |
| **1. Nieskończona noc** | Fallback, gdy żaden wcześniejszy warunek nie pasuje: po zwycięstwie nad Tomem dynia zamyka pętlę; Sandra ginie przy drodze, Aleks zostaje na krzyżu, **dopiero potem** pojawiają się Alex (X) i Salsa. |

## Priorytet dla nakładających się warunków (PROPOZYCJA)

1. Porażka Areny → ending 2, niezależnie od wyposażenia (jedyny ending przed finałem).
2. Pluszak Sandry + nieufność lub krzywda po pochówku → ending 3.
3. Wzajemna nieufność lub nierozwiązana uraza po pochówku → ending 6.
4. Pluszak + uzgodniony wcześniej podstępny rozejm → ending 4.
5. Wszystkie sekretne warunki → ending 7.
6. Lila oswojona karmą → ending 5.
7. W przeciwnym razie → ending 1.

To **propozycja**, nie automatycznie zatwierdzona zmiana fabularna. Szczególnie trzeba potwierdzić, czy wzajemny brak zaufania sam wystarcza do endingu 6 oraz czy nieufność Sandry z pluszakiem zawsze wymusza zdradę. Bez tego nie można uczciwie uznać automatycznej logiki za bezdyskusyjny kanon.

## Flagi, które Codex ma zapisywać

```ts
type HalloweenEndingState = {
  aleksItem: 'rem' | 'gaznik' | 'karma' | 'widelec' | 'gouda' | 'dlugopis';
  sandraItem: 'rem' | 'gaznik' | 'karma' | 'widelec' | 'gouda' | 'dlugopis' | 'pluszak';
  animal: 'arena' | 'lila' | 'chrupek' | 'etf';
  arenaFailed: boolean;
  aleksTrustsSandra: boolean;
  sandraTrustsAleks: boolean;
  sandraBuriedByAleks: boolean;
  unresolvedBurialGrudge: boolean;
  lilaTamed: boolean;
  scissorsKept: boolean;
  echoesRescued: number;
  truceProposed: boolean;
  aleksBackedTruce: boolean;
};
```

Przedmioty są prywatne i nie wolno ich wymieniać. Nożyce są przedmiotem znalezionym w świecie, a nie osobnym wyborem startowym. Żadnego `endingChoice` ani `showEndingMenu`.

```ts
function resolveEnding(s: HalloweenEndingState): 1|2|3|4|5|6|7 {
  if (s.animal === 'arena' && s.arenaFailed) return 2;
  if (s.sandraItem === 'pluszak' && (!s.sandraTrustsAleks || s.sandraBuriedByAleks)) return 3;
  if ((!s.aleksTrustsSandra && !s.sandraTrustsAleks) || s.unresolvedBurialGrudge) return 6;
  if (s.sandraItem === 'pluszak' && s.truceProposed && s.aleksBackedTruce) return 4;
  if (s.aleksItem === 'karma' && s.sandraItem === 'pluszak' &&
      s.aleksTrustsSandra && s.sandraTrustsAleks && s.animal === 'lila' &&
      s.lilaTamed && s.scissorsKept && s.echoesRescued >= 2) return 7;
  if (s.animal === 'lila' && s.lilaTamed) return 5;
  return 1;
}
```

**Uwaga implementacyjna:** resolver uruchamia się przy porażce Areny, albo dopiero po pokonaniu Toma. Zapisz odpowiednio moment uruchomienia; nie uruchamiaj go na środku gry po zmianie każdej flagi. Jeśli scena podstępu jest przed finalnym ciosem, ustaw najpierw jej flagi, a sam ending rozstrzygnij na ustalonym etapie. Każde zakończenie wyświetla własny napis *dopiero po* zakończeniu właściwej cutscenki.

## Przykładowe testy osiągalności

| Scenariusz | Oczekiwany ending |
|---|---|
| Wspólna Arena + porażka | 2 — Szpital |
| Sandra: pluszak, nie ufa Aleksowi; wybrany Chrupek | 3 — Sandra Toma |
| Oboje nie ufają, Sandra bez pluszaka | 6 — Dwa cienie |
| Sandra: pluszak, oboje ufają, podczas rozmowy rozejm, Aleks potwierdza, wybrany Chrupek | 4 — Nóż w plecy |
| Aleks: karma, Sandra: pluszak, oboje ufają, Lila, karmienie, nożyce, ≥2 echa, bez rozejmu | 7 — Ostatni świt |
| Wspólna Lila, karma u dowolnego gracza, karmienie, bez sekretu/zdrady | 5 — Lila przeciw panu |
| Brak pozostałych przesłanek, np. oboje ufają, Chrupek i brak pluszaka | 1 — Nieskończona noc |

## Czego nie zmieniamy

- Trzy ataki Toma zależne od odwiedzonego grobu, wzmocnienie ducha zniczem, własne nagrobki i reakcje to konsekwencje wewnątrz gry — same w sobie nie wybierają zakończenia.
- Aleks (przez KS) i Sandra **nie spotykają** Alexa (przez X) i Salsy po zoo. Nowa para pojawia się dopiero po tragicznym finale jedynki.
- Ending 2 pokazuje szpital i wspólny sen, a wypadek nastąpił przed wybudzeniem.
- Nie dodawać ekranu „który ending wybierasz”.
