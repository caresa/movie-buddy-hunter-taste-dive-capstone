//api endpoint
const BASE_URL = "https://tastedive.com/api/similar?"

//callback to api
function getData(type, searchTerm, callback) {
    $.ajax({
        dataType: "jsonp",
        url: BASE_URL,
        data: {
            q: searchTerm,
            info: 1,
            limit: 30,
            k: '310867-Suggesti-U8OHEM8L',
            type: type
        },
        success: callback
    });
};

function watchSubmit() {
    $('#js-start').submit(event => {
        event.preventDefault();

        const queryTarget = $(event.currentTarget).find('.js-search-term');
        const queryVal = queryTarget.val();

        const typeTarget = $('input:checked[type="radio"]');
        const typeVal = typeTarget.val();

        if (queryVal == "") {
            $('.js-warn').html(`Please enter a valid query`);
        } else {
            getData(typeVal, queryVal, function (data) {
                if (data.Similar.Results.length > 0) {
                    $('.js-results').html("");
                    for (var i in data.Similar.Results) {
                        $('js-results').append(data.Similar.Results[i].Name);
                        output = getResultMarkup(data.Similar.Results[i]);
                        $('.js-results').append(output);
                        $('.js-warn').html("");

                    }

                    /*
                    $('.readmore-contain').readmore({
                        speed: 10000,
                        moreLink: '<a href="#" class="more-link">read more</a>',
                        lessLink: '<a href="#" class="less-link">read less</a>',
                        collapsedHeight: 62,
                        //overflow: hidden;
                    });
                    */
                } else {
                    $('.js-warn').html(`Please enter a valid query`);
                }
            });
        }

    });
}

function getResultMarkup(data) {
    let output =
        `
    <div class="contain">
        <div class="js-video">
            <a class="js-result-name" href= "https://www.youtube.com/embed/${data.yID}" target="_blank"
            data-featherlight="iframe" data-featherlight-iframe-frameborder="0"
            data-featherlight-iframe-allow="autoplay; encrypted-media" data-featherlight-iframe-allowfullscreen="true"
            data-featherlight-iframe-style="display:block;border:none;height:85vh;width:85vw;">
            <iframe width="100%" height="150" src="https://www.youtube.com/embed/${data.yID}" frameborder="0" allow="autoplay;encrypted-media" allowfullscreen></iframe>
            </a>
        </div>
        <p class="js-name clearfix">${data.Name}</p>
        <div class="js-info">
            <span class="readmore-contain">${data.wTeaser}</span>
        </div>
    </div>
    `;

    return output;
}

$(document).ready(function () {
    watchSubmit();

    $('.js-results').on('mouseover', '.contain', function (e) {
        $(this).find('.readmore-contain').css({
            'overflow': 'scroll'
        });
    });

    $('.js-results').on('mouseout', '.contain', function (e) {
        $(this).find('.readmore-contain').css({
            'overflow': 'hidden'
        });
    });
});
