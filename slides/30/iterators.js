/*
  В ECMAScript 6 добавлена концепция итерируемых (iterable) объектов,
  содержимое которых можно перебрать в цикле. Например, перебираемым объектом
  является массив или строка, но итераторы позволяют сделать перебираемыми другие объекты.

  С итерируемыми объектами работает …spread и добавлен новый синтаксис цикла for…of
*/

let arr = [1, 2, 3]; // массив — пример итерируемого объекта

for (let value of arr) {
  console.log(value); // 1, затем 2, затем 3
}

/*
  В отличие от массивов, «перебираемые» объекты могут не иметь length.
  Как мы увидим далее, итераторы дают возможность сделать «перебираемыми» любые объекты.
*/

/*
  Для возможности использовать объект в for..of и ...spread
  нужно создать в нём свойство с названием Symbol.iterator (системный символ).

  При вызове метода Symbol.iterator перебираемый объект должен возвращать
  объект («итератор»), который умеет осуществлять перебор.

  По стандарту у такого объекта должен быть метод next(),
  который при каждом вызове возвращает очередное значение и окончен ли перебор.
  Здесь мы можем видеть сходство с генераторами в плане получения значений.
*/

let range = {
  from: 1,
  to: 5
}

// сделаем объект range итерируемым
range[Symbol.iterator] = function() {
  let current = this.from;
  let last = this.to;
  // метод должен вернуть объект с методом next()
  return {
    next() {
      if (current <= last) {
        return {
          done: false,
          value: current++
        };
      } else {
        return {
          done: true
        };
      }
    }
  }
};

for (let num of range) {
  console.log(num); // 1, затем 2, 3, 4, 5
}

// Так же возможно вернуть this в качестве итератора, если объект содержит его
  ...
  [Symbol.iterator]() {
    return this;
  },
  next(){
    return {
      ...
    }
  },
  ...

/*
  Как мы видим, возможны и бесконечные итераторы.
  Например, пример выше при range.to = Infinity будет таковым.
  Или можно сделать итератор, генерирующий бесконечную
  последовательность псевдослучайных чисел. Тоже полезно.

  Разумеется, цикл for..of по такому итератору тоже будет бесконечным,
  нужно его прерывать, например, через break.
*/