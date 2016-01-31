/**
 * Реализация полотна с анимацией ракеты на фоне звездного неба
 * Перемещение звезд с эффектом параллакса
 */
$(function () {

    // jquery объект полотна
    var $canvas = $('#canvas');
    // контекст полотна
    var context = $canvas.get(0).getContext('2d');

    // массив возможных размеров звезд
    var starSizes = [1, 2, 3, 4];
    // массив возможных цветов звезд
    var starColors = ['#DBD8A3', '#639DA7', '#ffffff', '#ED6245'];
    // массив для хранения сгенерированных звезд
    var stars = [];

    /**
     * Класс для описания объекта звезды
     * @param x Координата X
     * @param y Координата Y
     * @param size Размер звезды
     * @param color Цвет звезды
     * @constructor
     */
    function Star(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        // перемещение звезды на определенную позицию по оси Y
        this.move = function () {
            this.y += this.size * 2;
            return this.y;
        }
    }

    /**
     * Функция для получения случайного значения между min и max
     * @param min Минимально возможное значение
     * @param max Максимально возможное значение
     * @return {Number}
     */
    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Генерация звезд
     */
    function generateStar() {
        // тип звезды
        // эмуляция псевдослучайной выборки с неравномерным распределением
        // чем больше индекс массива, тем меньше шанс для его получения
        var type = starSizes[random(0, random(0, starSizes.length - 1))];
        // цвет звезды
        // псевдослучайное значение одного из элементов массива
        var color = starColors[random(0, starColors.length - 1)];
        // создание нового объекта звезды
        var star = new Star(random(0, 160 - type), 1, type, color);
        // и помещение его в массив
        stars.push(star);
    }

    /**
     * Запуск требуемых функций с определенным интервалом
     */
    window.setInterval(function () {
        // очищаем полотно в начале каждого draw call
        context.clearRect(0, 0, 160, 230);
        // генерируем очередную звезду (по одной в каждом кадре)
        generateStar();
        // обходим массив звезд
        for (var i = 0; i < stars.length; i++) {
            // текущий экземпляр звезды на данной итерации
            var s = stars[i];
            // перемещаем звезду и получаем ее новые координаты
            var row = s.move();
            // если звезда ушла за нижний кран полотна,
            // то удаляем ее
            if (row > 230 + s.size) {
                stars.splice(i, 1);
            }
            // в противном случае прорисовываем звезду на нужном месте полотна
            else {
                context.beginPath();
                context.arc(s.x, s.y, s.size, 0, 2 * Math.PI, false);
                context.fillStyle = s.color;
                context.fill();
            }
        }
        // вызываем операцию прорисовки звезд 24 раза в секунду
    }, 1000 / 24);

});