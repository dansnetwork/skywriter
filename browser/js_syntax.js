require.def(['require', 'exports', 'module',
    'skywriter/plugins',
    '/standard_syntax'
], function(require, exports, module,
    plugins,
    standard_syntax
) {

/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Skywriter.
 *
 * The Initial Developer of the Original Code is
 * Mozilla.
 * Portions created by the Initial Developer are Copyright (C) 2009
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Skywriter Team (skywriter@mozilla.com)
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

"define metadata";
({
    "description": "JavaScript syntax highlighter",
    "dependencies": { "standard_syntax": "0.0.0" },
    "environments": { "worker": true }
});
"end";

exports.init = function() {
    var catalog = plugins.catalog;
    catalog.connect("syntax", module.id, { "name": "js", "pointer": "#JSSyntax", "fileexts": [ "js", "json" ] });
};

exports.deinit = function() {
    catalog.disconnectAll(module.id);
};

var StandardSyntax = standard_syntax.StandardSyntax;

var states = {
    start: [
        {
            regex:  /^var(?=\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*=\s*require\s*\(\s*['"]([^'"]*)['"]\s*\)\s*[;,])/,
            tag:    'keyword',
            symbol: '$1:$2'
        },
        {
            regex:  /^(?:break|case|catch|continue|default|delete|do|else|false|finally|for|function|if|in|instanceof|let|new|null|return|switch|this|throw|true|try|typeof|var|void|while|with)(?![a-zA-Z0-9_])/,
            tag:    'keyword'
        },
        {
            regex:  /^[A-Za-z_][A-Za-z0-9_]*/,
            tag:    'plain'
        },
        {
            regex:  /^[^'"\/ \tA-Za-z0-9_]+/,
            tag:    'plain'
        },
        {
            regex:  /^[ \t]+/,
            tag:    'plain'
        },
        {
            regex:  /^'(?=.)/,
            tag:    'string',
            then:   'qstring'
        },
        {
            regex:  /^"(?=.)/,
            tag:    'string',
            then:   'qqstring'
        },
        {
            regex:  /^\/\/.*/,
            tag:    'comment'
        },
        {
            regex:  /^\/\*/,
            tag:    'comment',
            then:   'comment'
        },
        {
            regex:  /^./,
            tag:    'plain'
        }
    ],

    qstring: [
        {
            regex:  /^(?:\\.|[^'\\])*'?/,
            tag:    'string',
            then:   'start'
        }
    ],

    qqstring: [
        {
            regex:  /^(?:\\.|[^"\\])*"?/,
            tag:    'string',
            then:   'start'
        }
    ],

    comment: [
        {
            regex:  /^[^*\/]+/,
            tag:    'comment'
        },
        {
            regex:  /^\*\//,
            tag:    'comment',
            then:   'start'
        },
        {
            regex:  /^[*\/]/,
            tag:    'comment'
        }
    ]
};

exports.JSSyntax = new StandardSyntax(states);

});
