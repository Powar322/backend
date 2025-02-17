SQL

Создание таблицы тест-кейсов
create table test_cases (
  id int,
  test_case_id text,
  name text,
  description text,
  PRIMARY KEY (id)
)

Создание таблицы с шагами тест-кейсов
create table test_case_steps (
  id int,
  test_case_id int,
  number_of_step int,
  step text,
  PRIMARY KEY (id)
  FOREIGN key (test_case_id) REFERENCES test_cases(test_case_id)
)

Создание таблиц с коллекцией тест-кейсов
create table collections (
  id int,
  name text,
  description text,
  project text,
  PRIMARY KEY (id)
)

Создание связочной таблицы
create table collection_test_con (
  id int,
  collection_id int,
  test_case_id int,
  FOREIGN key (collection_id) REFERENCES collections(id),
  FOREIGN key (test_case_id) REFERENCES test_cases(id)
)

Получить все коллекции
SELECT * from collections

Селект тест-кейсов по id коллекции
SELECT test_cases.test_case_id, test_cases.name, test_cases.description from test_cases 
LEFT JOIN collection_test_con
ON test_cases.id = collection_test_con.test_case_id
WHERE collection_test_con.collection_id = 0

Селект всех шагов теста по id теста плюс сортировка по номеру шага
SELECT test_case_steps.id, test_case_steps.number_of_step, test_case_steps.step from test_case_steps
LEFT JOIN test_cases
On test_cases.id = test_case_steps.test_case_id
WHERE test_cases.id = 0
GROUP by number_of_step

