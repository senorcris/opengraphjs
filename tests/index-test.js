var openGraph = require('../index'),
    expect = require('expect.js'),
    nock = require('nock');

global.Promise = require('bluebird');

describe('Open Graph', function () {
    before(function () {
        nock('http://ogp.me').get('/').replyWithFile(200, __dirname + '/fixtures/ogp_org.html');
        nock('http://ogp.me').get('/promise').replyWithFile(200, __dirname + '/fixtures/ogp_org.html');
        nock('http://ogp.me').get('/optional').replyWithFile(200, __dirname + '/fixtures/ogp_org_optional.html');
        nock('http://ogp.me').get('/structured').replyWithFile(200, __dirname + '/fixtures/ogp_org_structured.html');
        nock('http://ogp.me').get('/arrays').replyWithFile(200, __dirname + '/fixtures/ogp_org_arrays.html');
    });
    
    it('should get basic metadata', function (done) {
        openGraph({
            url: "http://ogp.me/"
        }, function (err, data) {
            expect(data.title).to.be('Open Graph protocol');
            expect(data.type).to.be('website');
            expect(data.image[0]).to.eql({ 
                url: 'http://ogp.me/logo.png',
                type: 'image/png',
                width: '300',
                height: '300' 
            });
            expect(data.url).to.be('http://ogp.me/');
            done();
        });
    });

    it('should get basic metadata using a promise', function (done) {
        openGraph({
            url: "http://ogp.me/promise"
        }).then(function (data) {
            expect(data).to.be.an.object;
            expect(data.title).to.be('Open Graph protocol');
            expect(data.type).to.be('website');
            expect(data.image[0]).to.eql({ 
                url: 'http://ogp.me/logo.png',
                type: 'image/png',
                width: '300',
                height: '300' 
            });
            expect(data.url).to.be('http://ogp.me/');
        }).done(done);
    });

    it('should get optional metadata', function (done) {
        openGraph({
            url: "http://ogp.me/optional"
        }, function (err, data) {
            expect(data.audio[0].url).to.be("http://example.com/bond/theme.mp3");
            expect(data.description).to.be("Sean Connery found fame and fortune as the suave, sophisticated British agent, James Bond.");
            expect(data.determiner).to.be("the");
            expect(data.locale.name).to.be("en_GB");
            expect(data.locale.alternate).to.contain("fr_FR", "es_ES");
            expect(data.siteName).to.be("IMDb");
            expect(data.video[0].url).to.be("http://example.com/bond/trailer.swf");
            done();
        });
    });

    it('should get structured data as objects', function (done) {
        openGraph({
            url: "http://ogp.me/structured"
        }, function (err, data) {
            expect(data.image[0].url).to.be("http://example.com/ogp_two.jpg");
            expect(data.image[0].secureUrl).to.be("https://secure.example.com/ogp.jpg");
            expect(data.image[0].type).to.be("image/jpeg");
            expect(data.image[0].width).to.be("400");
            expect(data.image[0].height).to.be("300");

            expect(data.video[0].url).to.be("http://example.com/movie.swf");
            expect(data.video[0].secureUrl).to.be("https://secure.example.com/movie.swf");
            expect(data.video[0].type).to.be("application/x-shockwave-flash");
            expect(data.video[0].width).to.be("400");
            expect(data.video[0].height).to.be("300");

            expect(data.audio[0].url).to.be("http://example.com/sound.mp3");
            expect(data.audio[0].secureUrl).to.be("https://secure.example.com/sound.mp3");
            expect(data.audio[0].type).to.be("audio/mpeg");

            done();
        });
    });

    it('should get structured data as an array of objects', function (done) {
        openGraph({
            url: "http://ogp.me/arrays"
        }, function (err, data) {
            expect(data.image[0].url).to.be("http://example.com/ogp_one.jpg");

            expect(data.image[1].url).to.be("http://example.com/ogp_two.jpg");
            expect(data.image[1].secureUrl).to.be("https://secure.example.com/ogp.jpg");
            expect(data.image[1].type).to.be("image/jpeg");
            expect(data.image[1].width).to.be("400");
            expect(data.image[1].height).to.be("300");

            expect(data.image[2].url).to.be("http://example.com/ogp_3.jpg");
            expect(data.image[3].url).to.be("http://example.com/ogp_4.jpg");
            expect(data.image[4].url).to.be("http://example.com/ogp_5.jpg");

            expect(data.video[0].url).to.be("http://example.com/movie.swf");
            expect(data.video[0].secureUrl).to.be("https://secure.example.com/movie.swf");
            expect(data.video[0].type).to.be("application/x-shockwave-flash");
            expect(data.video[0].width).to.be("400");
            expect(data.video[0].height).to.be("300");

            expect(data.video[1].url).to.be("http://example.com/movie1.swf");
            expect(data.video[1].secureUrl).to.be("https://secure.example.com/movie1.swf");
            expect(data.video[1].type).to.be("application/x-shockwave-flash");
            expect(data.video[1].width).to.be("400");
            expect(data.video[1].height).to.be("300");

            expect(data.audio[0].url).to.be("http://example.com/sound.mp3");
            expect(data.audio[0].secureUrl).to.be("https://secure.example.com/sound.mp3");
            expect(data.audio[0].type).to.be("audio/mpeg");

            expect(data.audio[1].url).to.be("http://example.com/sound2.mp3");
            expect(data.audio[1].secureUrl).to.be("https://secure.example.com/sound2.mp3");
            expect(data.audio[1].type).to.be("audio/mpeg");

            expect(data.audio[2].url).to.be("http://example.com/sound3.mp3");

            done();
        });
    });
});
