"use strict";

function TemplateProcessor(template) {
	this.template = template;
}

TemplateProcessor.prototype.fillIn = function(dictionary) {
    let filledStr = '';

    for (let i = 0; i < this.template.length; i++) {
        const c = this.template[i];
        if (c !== '{') {
            filledStr += c;
        } else {
            i += 2; // Skip '{{'
            let property = ''; 
            // Tach property giua "{{}}"
            while (i < this.template.length && this.template[i] !== '}') {
                property += this.template[i++];
            }
            // Skip '}}' 
            i++;

            // Thay property tu dictionary 
            if (dictionary[property]) {
                filledStr += dictionary[property];
            }
        }
    }

    return filledStr;
       
};