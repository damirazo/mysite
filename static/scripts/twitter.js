/**
 * Выборка последней записи через Twitter API и отображение ее в виджете на сайте
 */
$(function () {

    /**
     * Преобразование текстовых ссылок в HTML ссылки
     * See to: http://stackoverflow.com/questions/37684/how-to-replace-plain-urls-with-links
     * @param text Текст, в котором требуется заменить ссылки
     * @return {*}
     */
    function replaceURLWithHTMLLinks(text) {
        var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return text.replace(exp, "<a href='$1'>$1</a>");
    }

    /**
     * Получение последнего твита из твиттера
     */
    $.getJSON(
        'http://api.twitter.com/1/statuses/user_timeline.json?callback=?',
        {
            screen_name:'damirazo',
            count:'1'
        },
        function (json) {
            if (json.length > 0 && json[0] != undefined) {
                var lastTweet = json[0];
                var text = replaceURLWithHTMLLinks(lastTweet.text);
                var created_at = lastTweet.created_at;
                var date = new Date();
                date.setTime(Date.parse(created_at));
                $('#twitter').html(text);
                var $datetime = $(document.createElement('div'));
                $datetime.attr('id', 'twitter-datetime');
                $datetime.text(date.toLocaleString());
                $('#twitter').append($datetime);
            }
        }, 'json');

});