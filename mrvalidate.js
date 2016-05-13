// The MIT License (MIT)

// Copyright (c) 2015 Glass Umbrella. Created by Matt Randle.

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

;
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['knockout'], factory);
    } else {
        factory(ko);
    }
}(function(ko) {
    ko.applyValidationErrorsToModel = function(model, errors) {
        ko.clearValidationErrorsToModel(model);
        for (var e in errors) {
            if (model[e]) {
                if (ko.isObservable(model[e].hasError)) {
                    model[e].hasError(true);
                }

                if (ko.isObservable(model[e].errorMessage)) {
                    model[e].errorMessage(errors[e]);
                }
            }
        }
    };

    ko.clearValidationErrorsToModel = function(model) {
        _.each(model, function(property) {
            if (ko.isObservable(property)) {
                if (property.hasError !== undefined) {
                    property.hasError(false);
                    property.errorMessage("");
                }
            }
        });
    };

    ko.subscribable.fn.makeValidatable = function() {
        var exports = this;

        exports.hasError = ko.observable(false);
        exports.errorMessage = ko.observable();

        exports.subscribe(function() {
            if (exports.hasError !== undefined) {
                exports.hasError(false);
                exports.errorMessage("");
            }
        });

        return exports;
    };
}));