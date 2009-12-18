"export package main";

/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1
 *
 * The contents of this file are subject to the Mozilla Public License
 * Version 1.1 (the "License"); you may not use this file except in
 * compliance with the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied.
 * See the License for the specific language governing rights and
 * limitations under the License.
 *
 * The Original Code is Bespin.
 *
 * The Initial Developer of the Original Code is Mozilla.
 * Portions created by the Initial Developer are Copyright (C) 2009
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Bespin Team (bespin@mozilla.com)
 *
 * ***** END LICENSE BLOCK ***** */

var EditorController = require("bespin:editor/controller").EditorController;
var app = require("view").app;
var catalog = require("bespin:plugins").catalog;

main = function() {
    catalog.loadMetadata("/server/plugin/register/defaults",
        function(sender, response) {
            if (response.isError) {
                throw "failed to load plugin metadata: " +
                    response.errorObject;
            }

            tiki.async('EditorApp').then(function() {
                var mainPane = app.get('mainPage').get('mainPane');
                catalog.getObject('applicationcontroller').create({
                    mainPane: mainPane
                });
                mainPane.append();
            });
        });
};

