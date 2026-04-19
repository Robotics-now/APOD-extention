const API_KEY = "MwgFtgBkxQATZEBxt4r5loQ9ZvozBAuvZLnFyq9f"; 
const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

async function fetchAPOD() {
  const imgElement = document.getElementById('apod-img');
  const videoElement = document.getElementById('apod-video');
  const titleElement = document.getElementById('apod-title');

  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    titleElement.innerText = data.title;

    if (data.media_type === "image") {
      videoElement.style.display = "none";
      imgElement.style.display = "block";
      imgElement.src = data.url;
    } 
    else if (data.media_type === "video") {
      imgElement.style.display = "none";
      videoElement.style.display = "block";
      // Convert YouTube watch link to embed link if necessary
      let videoUrl = data.url;
      if (videoUrl.includes("youtube.com/watch?v=")) {
          videoUrl = videoUrl.replace("watch?v=", "embed/");
      }
      videoElement.src = videoUrl;
    }
  } catch (error) {
    titleElement.innerText = "Check Connection to Mission Control";
  }
}

document.getElementById('apod-link').addEventListener('click', (e) => {
  e.preventDefault();
  chrome.tabs.create({ url: "https://nasa-apod-api.streamlit.app/" });
});

fetchAPOD();