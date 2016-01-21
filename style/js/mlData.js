(function($) {'use strict';

    if (!$) return console.error('You Must Import JQuery First!');

    var serverUrl = '/ml-official-server/';
    var urls = {
        article: serverUrl+'article',
        cooperation: serverUrl+'cooperation',
        spotlight: serverUrl+'cooperation/spotlight',
        gallery: serverUrl+'gallery',
        question: serverUrl+'question',
        staff: serverUrl+'staff',
        successCase: serverUrl+'successCase',
        image: serverUrl+'image/'
    };

    function article(arg0, arg1, arg2) {
        var callback, page, size, id;
        var url = urls.article;
        if (arg0 instanceof Function) {
            callback = arg0;
            return $.getJSON(url, callback);
        }
        if (arg1 instanceof Function) {
            callback = arg1;
            id = arg0;
            return $.getJSON(url, { id: id }, callback);
        }
        if (arg2 instanceof Function) {
            callback = arg2;
            size = arg1;
            page = arg0;
            return $.getJSON(url, { page: page, size: size }, callback);
        }
        throw new TypeError();
    }
    function cooperation(callback) {
        return $.getJSON(urls.cooperation, callback);
    }
    function spotlight(callback) {
        return $.getJSON(urls.spotlight, callback);
    }
    function gallery(callback) {
        return $.getJSON(urls.gallery, callback);
    }
    function question(callback) {
        return $.getJSON(urls.question, callback);
    }
    function staff(callback) {
        return $.getJSON(urls.staff, callback);
    }
    function successCase(callback) {
        return $.getJSON(urls.successCase, callback);
    }
    function imageUrl(imageId) {
        if (typeof imageId == 'number')
            return urls.image+imageId;
        if (imageId instanceof Object)
            return urls.image+imageId.id;
        return '';
    }
    function imageHtml(image) {
        var src = imageUrl(image);
        if (src) return '<img src="'+src+'" />';
        else return '&nbsp;';
    }

    window.mlData = {
        urls: urls,
        article: article,
        cooperation: cooperation,
        spotlight: spotlight,
        gallery: gallery,
        question: question,
        staff: staff,
        successCase: successCase,
        imageUrl: imageUrl,
        imageHtml: imageHtml
    };
    return;

})(window.jQuery);

(function() {'use strict';

    function format(template, params) {
        var str = template;
        for (var key in params) {
            if (!params.hasOwnProperty(key)) continue;
            var val = params[key];
            if (!val && val !== '') continue;
            var regex = new RegExp('(?!\\\\)\\{'+key+'(?!\\\\)\\}','gm');
            str = str.replace(regex, val);
        }
        str = str.replace(/\\\{/gm, '{');
        str = str.replace(/\\\}/gm, '}');
        str = str.replace(/\\\\/gm, '\\');
        return str;
    }

    return String.format = format;
})();