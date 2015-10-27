var request = require('request'),
    cheerio = require('cheerio'),
    fields = require('./lib/fields'),
    utils = require('./lib/utils');

var Item = function () {};

Item.prototype.setProp = function(key, value) {
    this[key] = value;
};

var getOpenGraph = function(options, callback) {
    var cb = callback || utils.createPromiseCallback();

    request(options, function(err, response, body) {
        if(!err && response.statusCode === 200) {
            var $ = cheerio.load(body),
                title = $('head title'),
                meta = $('head').find('meta[property*="og:"], meta[property*="fb:"], meta[property*="twitter:"]'),
                openGraph = {};

            meta.each(function(idx) {
                var key = $(this).attr('property');
                var value = $(this).attr('content');
                var data = fields[key];
                var groupItem;
                
                if (!data) return;

                if (!data.group) {
                    openGraph[data.fieldName] = value;
                } else if (data.type === 'item') {
                    openGraph[data.group] = new Item();
                    openGraph[data.group].setProp(data.fieldName, value);
                } else if (data.type === 'array') {
                    if (Array.isArray(openGraph[data.group])) {
                        groupItem = openGraph[data.group][openGraph[data.group].length - 1];
                    } else {
                        groupItem = openGraph[data.group];
                    }
                    groupItem = openGraph[data.group] || {};
                    groupItem[data.fieldName] = openGraph[data.group][data.fieldName] || [];
                    groupItem[data.fieldName].push(value);
                } else {
                    if (Array.isArray(openGraph[data.group])) {
                        groupItem = openGraph[data.group][openGraph[data.group].length - 1];
                    } else if (data.type === 'arrayItem' || !groupItem) {
                        groupItem = new Item();
                        openGraph[data.group] = openGraph[data.group] || [];
                        openGraph[data.group].push(groupItem);
                    }

                    groupItem.setProp(data.fieldName, value);
                }
            });

            if (!openGraph.title) {
                openGraph.title = title.text();
            }

            cb(null, openGraph);
        } else {
            cb(err);
        }
    });

    return cb.promise;
};

module.exports = getOpenGraph;
