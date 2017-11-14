/*\
title: $:/core/modules/macros/HashStr.js
type: application/javascript
module-type: macro

Generate a numeric hash from a string
uses $:/core/modules/utils/utils.js
\*/

(function(){
   /*jslint node: true, browser: true */
   /*global $tw: false */
   "use strict";

/*
Information about this macro
*/
   exports.name = "HashStr";
   exports.params = [
      {name: "str"}
   ];

/*
Run the macro
*/
   exports.run = function(str) {
      var hash = $tw.utils.hashString(str);
      return hash;
   };
})();