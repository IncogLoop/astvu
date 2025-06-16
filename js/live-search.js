jQuery(document).ready(function ($) {
    const $input = $('.search-field');
    const $results = $('#search-results');

    $input.on('input', function () {
        const query = $(this).val();

        if (query.length < 2) {
            $results.empty().addClass('d-none');
            return;
        }

        $.ajax({
            url: liveSearch.ajax_url,
            type: 'POST',
            data: {
                action: 'live_search',
                keyword: query
            },
            success: function (data) {
                $results.empty();

                if (data.length) {
					data.forEach(item => {
						const keyword = $input.val().toLowerCase();
						const title = item.title;
						const matchIndex = title.toLowerCase().indexOf(keyword);

						let highlightedTitle = title;

						if (matchIndex !== -1) {
							const beforeMatch = title.substring(0, matchIndex);
							const matchText = title.substring(matchIndex, matchIndex + keyword.length);
							const afterMatch = title.substring(matchIndex + keyword.length);

							highlightedTitle = `${beforeMatch}<strong>${matchText}</strong>${afterMatch}`;
						}

						const thumb = item.thumbnail
							? `<img src="${item.thumbnail}" alt="" />`
							: `<div style="width:44px;height:44px;background:#e0e0e0;border-radius:8px;"></div>`;

						$results.append(`
							<a href="${item.link}" class="list-group-item">
								${thumb}
								<span>${highlightedTitle}</span>
							</a>
						`);
					});
                    $results.removeClass('d-none');
                } else {
                    $results.append(`<div class="list-group-item">No results</div>`).removeClass('d-none');
                }
            }
        });
    });

    // Hide when clicked outside
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.search-container').length) {
            $results.addClass('d-none');
        }
    });
});
