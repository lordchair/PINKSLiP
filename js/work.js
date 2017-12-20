const client_id = '468325f74f7a935a2d348c5df3ec378623ac3b60'
const client_secret = '2NaLP/x65VuV18NxWhtrvMdgrJgEcew5GXcdWXYVH8fJIh6ghdajlsSQBCPgAqBEYUwrxq1y/Q7nOZSSZwTAOM1xEgwE3AGeOjKekxRvyrkUXmbXEJO4amoe8/kmQ2dN'
const auth_header = "basic " + btoa(client_id + ":" + client_secret) 

const auth_url = 'https://api.vimeo.com/oauth/authorize/client'
const album_url = 'https://api.vimeo.com/users/pinkslipfilms/albums/4902071/videos'

window.videos = []

function load_vimeo_content() {
  vimeo_auth(function(data) {
    window.access_token = data.access_token
    load_videos()
  })

  $(document).keyup(function(e) {
    console.log(e.keyCode)
    if (e.keyCode == 27) { // escape key maps to keycode `27`
      cleanup_player_modal()
    }
  });
}

function vimeo_auth(callback) {
  $.ajax({
    type: 'POST',
    url: auth_url,
    headers: {
      Authorization: auth_header
    },
    data: {
      grant_type: "client_credentials"
    },
    success: callback
  })
}

function load_videos(page, previous) {
  $.ajax({
    type: 'GET',
    url: album_url,
    data: {
      access_token: window.access_token,
      page: page || 1
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

  my_object.append($(`<div class="video_info"><div class="video_title">${vid.name}</div></div>`))

  // my_object.append($(`<a href="${vid.link}"><img src="${vid.pictures.sizes[2].link}" /></a>`))
  my_object.append($(`<a onClick="on_video_click(arguments[0], ${window.videos.length - 1})"><img src="${vid.pictures.sizes[2].link}" /></a>`))

  return my_object
}

function on_video_click(e, vid_idx) {
  const video = window.videos[vid_idx]

  if (e.shiftKey) {
    window.location.href = video.link
  } else {
    player_modal(video)
  }
}

function player_modal(video) {
  player_frame = $(video.embed.html)
  $('.player_modal').append(player_frame).removeClass('hidden')
  $('.player_close').removeClass('hidden')
}

function cleanup_player_modal() {
  $('.player_modal').empty().addClass('hidden')
  $('.player_close').addClass('hidden')
}