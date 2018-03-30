// ==UserScript==
// @name         Generate Names
// @namespace    http://dsa.itemcards.com
// @version      0.1
// @description  Generate Names
// @author       Arthur Niedzwiecki
// @match        http://dsa.itemcards.com/*
// @grant        none
// ==/UserScript==

getNames = function (n, category){
    var names = [];
    for ( i = 0 ; i < n; i++) {
        var request = $.ajax({
            url: "xhr.php",
            async: false,
            type: "POST",
            dataType: "JSON",
            data: {action: 'fetchList', category: category},
        });
        request.done(function(response) {
            request.responseJSON.names.map(function(name){names.push(name);});
        });
    }
    return names;
};

downloadNames = function (n, category) {
    var names = getNames (n, category);
    names = names.reduce(function(e1, e2) {return e1 + "\n" + e2;});

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(names));
    element.setAttribute('download', names.txt);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};
