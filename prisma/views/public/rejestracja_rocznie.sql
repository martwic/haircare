SELECT
  row_number() OVER () AS id,
  date_trunc(
    'year' :: text,
    (konta.data_rejestracji) :: timestamp WITH time zone
  ) AS data_start,
  date_trunc(
    'year' :: text,
    (
      ((konta.data_rejestracji + '1 year' :: INTERVAL)) :: date
    ) :: timestamp WITH time zone
  ) AS data_koniec,
  date_part('year' :: text, konta.data_rejestracji) AS rok,
  count(konta.id_konta) AS count
FROM
  konta
GROUP BY
  (
    date_trunc(
      'year' :: text,
      (konta.data_rejestracji) :: timestamp WITH time zone
    )
  ),
  (
    date_trunc(
      'year' :: text,
      (
        ((konta.data_rejestracji + '1 year' :: INTERVAL)) :: date
      ) :: timestamp WITH time zone
    )
  ),
  (date_part('year' :: text, konta.data_rejestracji))
ORDER BY
  (date_part('year' :: text, konta.data_rejestracji));