/**
 * Обертка для шаблонизатора
 * Реализация фоновой загрузки данных и сборки страниц из имеющегося каркаса
 */
$(function () {

    // Загрузка по умолчанию страницы резюме
    load_page('resume');

    /**
     * Обработка клика по ссылке
     */
    $('.link-container a').on('click', function (event) {
        // Перехватываем дефолтное поведение
        event.preventDefault();
        // Сохраняем ссылку на ссылку, по которой был клик
        // Защита от "проблемы контекста и this"
        var $self = $(this);
        // Сохраняем URL ссылки
        var url = $self.attr('href');
        // Сохраняем дата-атрибут ссылки с идентификатором страницы
        var page = $self.data('page');
        // Выполняем загрузку страницы
        load_page(page);
        // Замещаем элемент истории
        history.pushState({page_id: page}, null, url);
    });

    /**
     * Перехват события обращения к истории
     */
    $(window).on('popstate', function(event) {
        if (history.state) {
            load_page(event.originalEvent.state.page_id);
        }
    });

    /**
     * Выполняем загрузку страницы
     * @param page
     */
    function load_page(page) {
        // Объект элемента, содержащего HTML код объекта
        var $page = $('#page-' + page);
        //  Проверяем наличия кода для требуемой страницы
        if ($page.length == 1) {
            // HTML код нужной страницы
            // TODO: В конечной реализации будет код для шаблонизатора Mustache и его рендеринг после получения данных
            var page_html = $page.html();
            // Контейнер страницы
            var $page_container = $('#page');
            // TODO: Тестовая функциональность, в релизе получение данных будет с сервера
            // В тестовом режиме просто замещаем HTML код страницы требуемым
            $page_container.html(page_html);
        }
        else {
            // TODO: Реализовать нормальный обработчик ошибок
            alert('Error! Page "' + page + '" does not exists!');
        }
    }

});