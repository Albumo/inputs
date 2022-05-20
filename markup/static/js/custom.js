//select
$(document).ready(function () {
    function customSelect(el){
        var options = [],
            option = $(el).children('option'),
            customSelect;

        $(el).hide(); // hide select

        // Create custom select
        $(option).each(function(){
            options.push($(this).html());
        });

        $(el).after('<ul class="select__custom-select" data-selected-value="' + options[0] + '">');
        customSelect = $(el).siblings('.select__custom-select');
        $(customSelect).append('<li class="select__selected-option"><span>' + options[0] + '</span>');
        $(customSelect).children('.select__selected-option').append('<ul class="select__options">');

        for(var i = 1; i < options.length; i++) {
            $(customSelect).find('.select__options').append('<li data-value=' + options[i] + '>' + options[i] + '</li>');
        }

        // Click action & synchronization with origin select for submitting form
        $(customSelect).click(function(){
            $(this).toggleClass('open');
            $('.select__options',this).toggleClass('open');
        });

        $(customSelect).find('.select__options li').click(function(){
            var selection = $(this).text();
            var dataValue = $(this).attr('data-value');
            var selected = $(customSelect).find('.select__selected-option span').text(selection);
            for(var i = 1; i < option.length; i++) {
                if($(option[i]).text() === selected.text()) {
                    $(option[i]).attr('select__selected', 'true');
                    $(option[i]).siblings().removeAttr('select__selected');
                }
            }

            $(customSelect).attr('data-selected-value',dataValue);
        });
    }
    customSelect('#slct');

});


//Progress
function loading() {
    document.querySelectorAll(".progress__bar").forEach(function(current) {
        let startWidth = 0;
        const endWidth = current.dataset.size;

        const interval = setInterval(frame, 20);

        function frame() {
            if (startWidth >= endWidth) {
                clearInterval(interval);
            } else {
                startWidth++;
                current.style.width = `${endWidth}%`;
                current.firstElementChild.innerText = `${startWidth}%`;
            }
        }
    });
}

setTimeout(loading, 1000);