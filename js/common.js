
const pages = ['work', 'about', 'contact']

function insert_links(active_page, main_links_selector, back_slash_selector) {
	let links = $('<div class="links"></div>')

	for (page_idx in pages) {
		page = pages[page_idx]
		if (page_idx > 0) {
			links.append($('<div class="slash">/</div>'))
		}

		links.append($(`<a class="link link_${page}" href="${page}.html">${page}</a>`))
	}
	
	if (!!active_page) {
		links.find(`.link_${active_page}`).addClass('active')
	}

	$(main_links_selector).replaceWith(links)
	$(back_slash_selector).replaceWith($(`<div class="back_slash slash"><a href='../index.html'>/</a></div>`))
}




