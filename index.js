$(function () {
  $("#youtubeLink").keyup(function (e) {
    if (e.which === 13) {
      embedVideo();
    }
  });
});

function embedVideo() {
  // 입력된 유튜브 링크 가져오기
  const inputLink = document.getElementById('youtubeLink').value.trim();

  // 입력했는지 확인
  if (!inputLink) {
    alert("주소를 입력하세요.")
    return;
  }

  // 유효한 유튜브 링크인지 확인
  if (!inputLink.includes('youtu.be/') && !inputLink.includes('youtube.com/watch?v=')) {
    alert("올바른 주소를 입력하세오.")
    return;
  }

  // 영상 ID와 쿼리 파라미터 추출
  let videoId = '';
  let queryParams = '';

  if (inputLink.includes('youtu.be/')) {
    const urlParts = inputLink.split('youtu.be/')[1];
    const [id, params = ''] = urlParts.split('?');
    videoId = id;
    queryParams = params ? `?${params}` : '';
  } else if (inputLink.includes('youtube.com/watch?v=')) {
    const urlParts = inputLink.split('v=')[1];
    const [id, params = ''] = urlParts.split('&');
    videoId = id;
    queryParams = params ? `?${params}` : '';
  }

  // embed URL 생성
  const embedURL = `https://www.youtube.com/embed/${videoId}${queryParams}`;

  // 반응형 컨테이너와 iframe 생성
  const videoHtml = `
    <div class="video-responsive">
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

  // videoContainer에 삽입
  document.getElementById('videoContainer').innerHTML = videoHtml;
  $("#youtubeLink").removeClass("error-placeholder");
}