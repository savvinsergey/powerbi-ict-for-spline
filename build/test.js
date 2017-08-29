/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */
// External
/// <reference path="./../node_modules/@types/jasmine/index.d.ts" />
/// <reference path="./../node_modules/@types/jasmine-jquery/index.d.ts" />
// Testrunner
/// <reference path="./../node_modules/webdriver-client-test-runner/src/webdriver-client-test-runner/typedefs/exports.d.ts" />
var config = require('../configuration/embedded-reports-urls.config.json');
var powerbi;
(function (powerbi) {
    var extensibility;
    (function (extensibility) {
        var visual;
        (function (visual) {
            var test;
            (function (test) {
                var imageComparison;
                (function (imageComparison) {
                    var existTimeout = 15000, pause = 2500, defaultElement = "div.visual", defaultFrameElement = "svg";
                    config.forEach(function (item) {
                        describe(item.name || "Name is not specified", function () {
                            var _loop_1 = function (env) {
                                it(env, function (done) {
                                    var url = item.environments && item.environments[env];
                                    var isUrl = /^https\:\/\/(app|dxt|msit|powerbi-df)\.(powerbi|analysis-df\.windows)\.(com|net)\/view/.test(url);
                                    expect(isUrl).toBe(true);
                                    browser
                                        .timeouts("script", 60000)
                                        .timeouts("implicit", 60000)
                                        .timeouts("page load", 60000);
                                    browser
                                        .url(url)
                                        .waitForExist((item.element && item.element.await) || defaultElement, item.existTimeout || existTimeout)
                                        .then(function () {
                                        var framePromise = new Promise(function (resolve) {
                                            if (!item.element || (item.element && !item.element.frame)) {
                                                return resolve();
                                            }
                                            browser
                                                .element("iframe.visual-sandbox")
                                                .then(function (res) { return browser.frame(res.value); })
                                                .waitForExist((item.element && item.element.frame) || defaultFrameElement, item.existTimeout || existTimeout)
                                                .frameParent()
                                                .then(function () {
                                                resolve();
                                            });
                                        });
                                        framePromise
                                            .then(function () {
                                            browser
                                                .pause(item.pause || pause)
                                                .assertAreaScreenshotMatch({
                                                name: "visual",
                                                ignore: 'antialiasing',
                                                elem: (item.element && item.element.snapshot) || defaultElement,
                                            })
                                                .call(done);
                                        });
                                    });
                                });
                            };
                            for (var env in item.environments) {
                                _loop_1(env);
                            }
                        });
                    });
                })(imageComparison = test.imageComparison || (test.imageComparison = {}));
            })(test = visual.test || (visual.test = {}));
        })(visual = extensibility.visual || (extensibility.visual = {}));
    })(extensibility = powerbi.extensibility || (powerbi.extensibility = {}));
})(powerbi || (powerbi = {}));
