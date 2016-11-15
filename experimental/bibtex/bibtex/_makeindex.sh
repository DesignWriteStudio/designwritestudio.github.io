#!/bin/sh

ls | egrep '(jpg|png|csv|json|ods|bib|html)' |
perl -e 'print "<html><body><ul>"; while(<>) { chop $_; print "<li><a href=\"./$_\">$_</a></li>";} print "</ul></body></html>"' > index.html
