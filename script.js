let player;
let playPauseBtn = document.getElementById('playPauseBtn');
let muteBtn = document.getElementById('muteBtn');
let fullScreenBtn = document.getElementById('fullScreenBtn');
let shareBtn = document.getElementById('shareBtn');

// Video URLs you provided
const videoUrls = [
    "https://www.youtube.com/embed/IExBivh96AE?enablejsapi=1&autohide=1&rel=0",
    "https://www.youtube.com/embed/1ii-UaisDJ8?enablejsapi=1&autohide=1&rel=0",
    "https://www.youtube.com/embed/w3A9r4v6Ui0?enablejsapi=1&autohide=1&rel=0",
    "https://www.youtube.com/embed/9VbT3EErWxU?enablejsapi=1&autohide=1&rel=0",
    "https://www.youtube.com/embed/trvhnFM1SQY?enablejsapi=1&autohide=1&rel=0",
    "https://www.youtube.com/embed/JePw3GnwJi4?enablejsapi=1&autohide=1&rel=0",
    "https://www.youtube.com/embed/aPuwAzH8iJI?enablejsapi=1&autohide=1&rel=0",
    "https://www.youtube.com/embed/-5Yeph6BS0M?enablejsapi=1&autohide=1&rel=0",
    "https://www.youtube.com/embed/Qe_0x5Jj5z8?enablejsapi=1&autohide=1&rel=0",
    "https://www.youtube.com/embed/1b13TKYbVZc?enablejsapi=1&autohide=1&rel=0"
];

// Set up the YouTube player with the first video by default
function onYouTubeIframeAPIReady() {
    player = new YT.Player('videoPlayer1', {
        videoId: videoUrls[0].split('/').pop().split('?')[0], // Extract video ID from URL
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// When the player is ready
function onPlayerReady(event) {
    console.log("Player is ready.");
    playPauseBtn.addEventListener('click', togglePlayPause);
    muteBtn.addEventListener('click', toggleMute);
    fullScreenBtn.addEventListener('click', toggleFullScreen);
    shareBtn.addEventListener('click', shareVideo);
}

// Play/Pause the video
function togglePlayPause() {
    if (player.getPlayerState() === YT.PlayerState.PLAYING) {
        player.pauseVideo();
        playPauseBtn.innerText = 'Play';
    } else {
        player.playVideo();
        playPauseBtn.innerText = 'Pause';
    }
}

// Mute/Unmute the video
function toggleMute() {
    if (player.isMuted()) {
        player.unMute();
        muteBtn.innerText = 'Mute';
    } else {
        player.mute();
        muteBtn.innerText = 'Unmute';
    }
}

// Toggle Full Screen
function toggleFullScreen() {
    let iframe = document.getElementById('videoPlayer1');
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) { // Firefox
        iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) { // Chrome, Safari and Opera
        iframe.webkitRequestFullscreen();
    }
}

// Share the video URL
function shareVideo() {
    const videoUrl = player.getVideoUrl();
    const shareLink = document.createElement('a');
    shareLink.href = videoUrl;
    shareLink.innerText = 'Share this video';
    document.body.appendChild(shareLink);
    shareLink.style.display = 'block';
    shareLink.style.marginTop = '10px';
}

// Function to load a new video when clicked
function loadVideo(index) {
    player.loadVideoById(videoUrls[index].split('/').pop().split('?')[0]);
}

// Event listener for each video thumbnail (You can add these dynamically or manually)
document.querySelectorAll('.video-thumbnail').forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => loadVideo(index));
});
