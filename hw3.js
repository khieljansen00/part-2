/*
File: hw3.js
GUI Assignment: jQuery Validation Plugin
Khiel Jansen Mantilla, UMass Lowell Computer Science
finished by Khiel Jansen on June 8, 2024 at 9:00 PM

The validate function checks the input for any wrong issues such as incomplete input or wrong input. The messages part in the validate function outputs a message. Not all rules are complemented with a message because some rules call a validator.addMethod that does output a message. If the input is correct, submitHandler does execute the generation of the table.

Sources used: w3schools and jquery documentation.

For part 2, I add a slider for multiplier and multiplicand and I also add on functions of which enable two way binding from both the slider and the input text input value.
I create a new tab for every a table of which the table belongs to its very own tab. The tabs are created and the user can click on the tabs and show for himself the table.
*/


$(document).ready(function() {

    // this is validator methods for validating the input
    $.validator.addMethod("wholeNumber", function(value, element) {
        return /^-?\d+$/.test(value);
    }, "Enter a whole number");
    $.validator.addMethod("withinLimit", function(value, element) {
        return value >= -100 && value <= 100;
    }, "Enter a value between -100 and 100. inclusive");
    $.validator.addMethod("lessthan", function(value, element, param) {
        var num1 = parseInt(value);
        var num2 = parseInt($(param).val());
        return num1 < num2;
    }, "Starting value has to be less than end value");
    
    // this is slider of which is two way bind to the input. i can select the input with the slider.
    $("#multiplier-slider").slider({
        range: true,
        min: -100,
        max: 100,
        values: [15, 23],
        slide: function(event, ui) {
            $("#multiplier0").val(ui.values[0]);
            $("#multiplier1").val(ui.values[1]);
        }
    });
    
    $("#multiplier0").on("input", function() {
        let value = $(this).val();
        $("#multiplier-slider").slider("values", 0, value);
    });
    
    $("#multiplier1").on("input", function() {
        let value = $(this).val();
        $("#multiplier-slider").slider("values", 1, value);
    });
    
    $("#multiplicand-slider").slider({
        range: true,
        min: -100,
        max: 100,
        values: [-55, -50],
        slide: function(event, ui) {
            $("#multiplicand0").val(ui.values[0]);
            $("#multiplicand1").val(ui.values[1]);
        }
    });
    
    $("#multiplicand0").on("input", function() {
        let value = $(this).val();
        $("#multiplicand-slider").slider("values", 0, value);
    });
    
    $("#multiplicand1").on("input", function() {
        let value = $(this).val();
        $("#multiplicand-slider").slider("values", 1, value);
    });
    
    // enable jquery tab to this div element of each the id
    $("#tablecontainer").tabs();

    // for the function validate, there are three parts. rules, messages, and submit handler.
    // the rules that are to be validate are whether the text fields are not empty, whether the value is a number, whether there is a decimal point or not, whether it is within the limits of -100 or 100,
    // and the starting value has to be less than the end value.
    // the jquery validation works and i do create validator methods that I set as true or param true in the rules part.
    $("#multiplication-form").validate({
        rules: {
            multiplier0: {
                required: true,
                number: true,
                wholeNumber: true,
                withinLimit: true,
                lessthan: "#multiplier1"
            },
            multiplier1: {
                required: true,
                number: true,
                wholeNumber: true,
                withinLimit: true
            },
            multiplicand0: {
                required: true,
                number: true,
                wholeNumber: true,
                withinLimit: true,
                lessthan: "#multiplicand1"
            },
            multiplicand1: {
                required: true,
                number: true,
                wholeNumber: true,
                withinLimit: true
            }
        },
        messages: {
            multiplier0: {
                required: "Please enter the value",
                number: "It has to be the number"
            },
            multiplier1: {
                required: "Please enter the value",
                number: "It has to be the number"
            },
            multiplicand0: {
                required: "Please enter the value",
                number: "It has to be the number"
            },
            multiplicand1: {
                required: "Please enter the value",
                number: "It has to be the number"
            }
        },
        submitHandler: function(form) {
            event.preventDefault();
            // if the code gets to this function that means that the values are validated.
            const num1 = parseInt($('#multiplier0').val(), 10);
            const num2 = parseInt($('#multiplier1').val(), 10);
            const num3 = parseInt($('#multiplicand0').val(), 10);
            const num4 = parseInt($('#multiplicand1').val(), 10);
            
            let table = createtable(num1, num2, num3, num4);
            
            // my process for inserting the table into a new tab of each
            // i first must create a id name for the tab i shall make for the new table
            // then create a div element that has the table 
            // then create a li element with the a tag href of which is the unique id
            // then append solely to div #tablecontainer
            var tabpresent = $("#tablecontainer ul li").length + 1;
            var id = "tabs-" + tabpresent;
            var divtable = "<div id='" + id + "'>" + table.outerHTML + "</div>";
            var tab = "<li><a href='#" + id + "'>" + num1 + " " + num2 + " " + num3 + " " + num4 + "</a></li>";

            $("#tablecontainer").append(divtable);
            $("#tablecontainer ul").append(tab);

            $("#tablecontainer").tabs("refresh");
        }
    });
    
});



function createtable(x0, x1, y0, y1) {
    let table = document.createElement("table");

    var row0 = document.createElement("tr");
    row0.appendChild(document.createElement("th"));
    for (let x = x0; x <= x1; x++) {
        var c0 = document.createElement("th");
        c0.textContent = x;
        row0.appendChild(c0);
        //console.log(x);
    }
    table.appendChild(row0);

    for (let y = y0; y <= y1; y++) {
        var row1 = document.createElement("tr");
        var h0 = document.createElement("th");
        h0.textContent = y;
        row1.appendChild(h0);
        for (let x = x0; x <= x1; x++) {
        var c0 = document.createElement("td");
        let number = x*y;
        c0.textContent = number;
        row1.appendChild(c0);
        }
        table.appendChild(row1);
    }

    return table;
}
