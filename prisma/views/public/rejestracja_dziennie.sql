SELECT
  row_number() OVER () AS id,
  date_trunc(
    'day' :: text,
    (konta.data_rejestracji) :: timestamp WITH time zone
  ) AS data_start,
  date_trunc(
    'day' :: text,
    ((konta.data_rejestracji + 1)) :: timestamp WITH time zone
  ) AS data_koniec,
  date_part('day' :: text, konta.data_rejestracji) AS dzien,
  date_part('month' :: text, konta.data_rejestracji) AS miesiac,
  date_part('year' :: text, konta.data_rejestracji) AS rok,
  count(konta.id_konta) AS count
FROM
  konta
GROUP BY
  (
    date_trunc(
      'day' :: text,
      (konta.data_rejestracji) :: timestamp WITH time zone
    )
  ),
  (
    date_trunc(
      'day' :: text,
      ((konta.data_rejestracji + 1)) :: timestamp WITH time zone
    )
  ),
  (date_part('day' :: text, konta.data_rejestracji)),
  (date_part('month' :: text, konta.data_rejestracji)),
  (date_part('year' :: text, konta.data_rejestracji))
ORDER BY
  (date_part('day' :: text, konta.data_rejestracji));