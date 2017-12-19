const client_id = '468325f74f7a935a2d348c5df3ec378623ac3b60'
const client_secret = '2NaLP/x65VuV18NxWhtrvMdgrJgEcew5GXcdWXYVH8fJIh6ghdajlsSQBCPgAqBEYUwrxq1y/Q7nOZSSZwTAOM1xEgwE3AGeOjKekxRvyrkUXmbXEJO4amoe8/kmQ2dN'
const auth_header = "basic " + btoa(client_id + ":" + client_secret) 

const auth_url = 'https://api.vimeo.com/oauth/authorize/client'
const album_url = 'https://api.vimeo.com/users/pinkslipfilms/albums/4902071/videos'

window.videos = []

function init() {
	auth()

	$(document).keyup(function(e) {
		console.log(e.keyCode)
    if (e.keyCode == 27) { // escape key maps to keycode `27`
			cleanup_player_modal()
		}
	});
}

function auth() {
	$.ajax({
	  type: 'POST',
	  url: auth_url,
	  headers: {
			Authorization: auth_header
	  },
	  data: {
		  grant_type: "client_credentials"
	  },
	  success: function(data) {
			window.access_token = data.access_token
			load_videos(1)
	  }
	})
}

function load_videos(page, previous) {
  $.ajax({
		type: 'GET',
		url: album_url,
		data: {
			access_token: window.access_token,
			page: page
		},
		success: function(data) {
			video_arr = (previous || []).concat(data.data)
			
			if (data.per_page * data.page < data.total) {
				load_videos(page+1, video_arr)
			} else {
				insert_videos(video_arr)
			}
		}
  })
}

function insert_videos(video_arr) {
	let videos = $('<div class="videos"></div>')
	for (vid_idx in video_arr) {
		videos.append(build_video(video_arr[vid_idx]))
	}

	$('.work').prepend(videos)	
	$('.loader').hide()
}

function build_video(vid) {
	window.videos.push(vid)

	my_object = $('<div class="video"></div>')

	// my_object.append($(`<a href="${vid.link}"><img src="${vid.pictures.sizes[2].link}" /></a>`))
	my_object.append($(`<a onClick="player_modal(${window.videos.length - 1})"><img src="${vid.pictures.sizes[2].link}" /></a>`))

	return my_object
}

function player_modal(vid_idx) {
	player_frame = $(window.videos[vid_idx].embed.html)
	$('.player_modal').append(player_frame).removeClass('hidden')
	$('.player_close').removeClass('hidden')
}

function cleanup_player_modal() {
	$('.player_modal').empty().addClass('hidden')
	$('.player_close').addClass('hidden')
}