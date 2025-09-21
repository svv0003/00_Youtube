$(function () {
  // localStorage 저장된 동영상 복원하기
  const savedVideos = JSON.parse(localStorage.getItem("savedVideos") || "[]");
  savedVideos.forEach((video) => $("#videoContainer").append(video.html));

  // placeholder 제거 및 입력값 초기화하기
  $("#youtubeLink").on("click", function () {
    $(this).removeAttr("placeholder").val("");
  });

  // input 포커스 아웃 시 placeholder 복원하기
  $("#youtubeLink").on("blur", function () {
    if (!$(this).val()) {
      $(this).attr("placeholder", "https://youtu.be/...");
    }
  });

  // 엔터 키 입력 시 embedVideo 호출하기
  $("#youtubeLink").on("keyup", function (e) {
    if (e.which === 13) {
      embedVideo();
    }
  });
});


function embedVideo() {
  // 입력된 유튜브 링크 불러오기
  const $input = $("#youtubeLink");
  const inputLink = $input.val().trim();

  // 입력했는지 확인하기
  if (!inputLink) {
    alert("주소를 입력하세요.");
    return;
  }

  // 유효한 유튜브 링크인지 확인하기
  if (
    !inputLink.includes("youtu.be/") &&
    !inputLink.includes("youtube.com/watch?v=")
  ) {
    alert("올바른 주소를 입력하세오.");
    return;
  }

  // 영상 ID와 쿼리 파라미터 추출하기
  let videoId = "";
  let queryParams = "";

  if (inputLink.includes("youtu.be/")) {
    const urlParts = inputLink.split("youtu.be/")[1];
    const [id, params = ""] = urlParts.split("?");
    videoId = id;
    queryParams = params ? `?${params}` : "";
  } else if (inputLink.includes("youtube.com/watch?v=")) {
    const urlParts = inputLink.split("v=")[1];
    const [id, params = ""] = urlParts.split("&");
    videoId = id;
    queryParams = params ? `?${params}` : "";
  }

  // embed URL 생성하기
  const embedURL = `https://www.youtube-nocookie.com/embed/${videoId}${queryParams}`;

  // 반응형 컨테이너와 iframe 생성하기
  const videoHtml = `
    <div class="video-responsive" id="tempVideo">
      <iframe
        src="${embedURL}"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
  `;


  // 기존 tempVideo 제거 (중복 방지)
  $("#tempVideo").remove();

  // videoContainer 맨 위에 삽입
  $("#videoContainer").prepend(videoHtml);
  $input.removeClass("error-placeholder").val("").attr("placeholder", "https://youtu.be/...");  
}




// 입력한 링크 지우기
function clearLink() {
  const $input = $("#youtubeLink");
  $input.removeClass("error-placeholder").val("").attr("placeholder", "https://youtu.be/...");
}



// 불러온 링크 저장하기
function saveLink() {

  // 검색한 링크가 있는지 확인하기
  const $tempVideo = $("#tempVideo");
  if ($tempVideo.length === 0) {
    alert("저장할 동영상이 없습니다.");
    return;
  }

  // localStorage에서 기존 동영상 가져오기
  const savedVideos = JSON.parse(localStorage.getItem("savedVideos") || "[]");

  // 중복 동영상 확인
  if (savedVideos.some(video => video.html.includes($tempVideo.find('iframe').attr('src')))) {
    alert("이미 저장된 동영상입니다.");
    return;
  }

  // 최대 저장 개수 제한
  if (savedVideos.length >= 10) {
    alert("최대 10개의 동영상만 저장할 수 있습니다.");
    return;
  }

  // 고유 ID 생성하기
  const videoId = `video-${Date.now()}`;

  // 저장된 동영상용 HTML (saved-video 클래스 및 video-wrapper 추가)
  const savedVideoHtml = `
    <div class="saved-video" id="${videoId}">
      <div class="video-wrapper">
        <iframe
          src="${$tempVideo.find('iframe').attr('src')}"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
      <button class="delete-button" onclick="deleteVideo('${videoId}')">Delete</button>
    </div>
  `;
  
  // tempVideo 제거 및 저장된 동영상 삽입하기
  $tempVideo.remove();
  $("#videoContainer").prepend(savedVideoHtml);

  // localStorage 저장하기
  savedVideos.push({ id: videoId, html: savedVideoHtml });
  localStorage.setItem("savedVideos", JSON.stringify(savedVideos));
}


// 저장된 링크 삭제하기
function deleteVideo(videoId) {
  // 해당 동영상 삭제하기
  $(`#${videoId}`).remove();

  // localStorage에서 해당 동영상 제거
  let savedVideos = JSON.parse(localStorage.getItem("savedVideos") || "[]");
  savedVideos = savedVideos.filter(video => video.id !== videoId);
  localStorage.setItem("savedVideos", JSON.stringify(savedVideos));
}

