/*\
title: $:/plugins/inmysocks/MathyThing/action-increment.js
type: application/javascript
module-type: widget

Action widget that increments a number in a field.

\*/

(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Widget = require("$:/core/modules/widgets/widget.js").widget;

var IncrementWidget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
IncrementWidget.prototype = new Widget();

/*
Render this widget into the DOM
*/
IncrementWidget.prototype.render = function(parent,nextSibling) {
	this.computeAttributes();
	this.execute();
};

/*
Compute the internal state of the widget
*/
IncrementWidget.prototype.execute = function() {
	this.actionTiddler = this.getAttribute("$tiddler",this.getVariable("currentTiddler"));
	this.actionField = this.getAttribute("$field","inc_field");
	this.actionIndex = this.getAttribute("$index");
	this.padLength = this.getAttribute("$length","0");
	this.prefixValue = this.getAttribute("$prefix")
	this.initialValue = this.getAttribute("$initial","0")

	var incVal = this.getAttribute("$increment",1);
	var tiddler = this.wiki.getTiddler(this.actionTiddler);
	var fieldString = tiddler.getFieldString(this.actionField);

	//If there is no value in the field create the initial value, with a prefix and zero padding if needed.
	if(fieldString) {
	} else if(this.prefixValue) {
		if(this.padLength) {
			fieldString = this.prefixValue+$tw.utils.pad(this.initialValue,this.padLength);
		} else {
			fieldString = this.prefixValue+this.initialValue;
		}
	} else if(this.padLength) {
			fieldString = $tw.utils.pad(this.initialValue,this.padLength);
	} else {
			fieldString = this.initialValue;
	}
	
	//Get the current numeric value in the field by removing the prefix if one is given.
	if(this.prefixValue) {
		var currentValue = fieldString.slice(this.prefixValue.length,fieldString.length);
	} else {
		var currentValue = fieldString;
	}

	//If either the existing value or the increment value are not numbers leave the field alone, otherwise increment the value.
	if(!isNaN(parseFloat(currentValue)) && isFinite(currentValue) && !isNaN(parseFloat(incVal)) && isFinite(incVal)) { 
		var output = Number(currentValue) + Number(incVal);
		if(this.padLength) {
			this.actionValue = $tw.utils.pad(output,this.padLength)
		} else {
			this.actionValue = output;
		} 
		if(this.prefixValue) {
			this.actionValue = String(this.prefixValue)+String(this.actionValue);
		}
	} else {
		this.actionValue = String(currentValue);
	}
};

/*
Refresh the widget by ensuring our attributes are up to date
*/
IncrementWidget.prototype.refresh = function(changedTiddlers) {
	var changedAttributes = this.computeAttributes();
	if(changedAttributes["$tiddler"] || changedAttributes["$field"] || changedAttributes["$index"] || changedAttributes["$increment"] || changedAttributes["$length"]) {
		this.refreshSelf();
		return true;
	}
	return this.refreshChildren(changedTiddlers);
};

/*
Invoke the action associated with this widget
*/
IncrementWidget.prototype.invokeAction = function(triggeringWidget,event) {
	if(typeof this.actionValue === "string") {
		this.wiki.setText(this.actionTiddler,this.actionField,this.actionIndex,this.actionValue);		
	}
	return true; // Action was invoked
};

exports["action-increment"] = IncrementWidget;

})();