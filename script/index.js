
const showLoader = () =>{
    document.getElementById("loader").classList.remove("hidden");
    document.getElementById("video-container").classList.add("hidden");
}
const hideLoader = () =>{
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("video-container").classList.remove("hidden");
}


function removeActiveClass () {
    const activeButtons = document.getElementsByClassName("active")

    for(let btn of activeButtons) {
        btn.classList.remove("active")
    }
}

function loadCategories () {
    //fetch off data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    //convert promise to json
    .then((res)=>res.json())
    //send data to display
    .then((data)=>displayCategories(data.categories))
}

//video container 
function loadVideos (searchText = "") {
    showLoader();
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then(res => res.json())
    .then(data=> {
        removeActiveClass();
        document.getElementById("btn-all").classList.add("active")
        displayVideos(data.videos)
    })
}

const loadCategoriesVideos = (id) => {
    showLoader()
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
    console.log(url)

    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        removeActiveClass();
        const clikedButton = document.getElementById(`btn-${id}`);
        clikedButton.classList.add("active");
        displayVideos(data.category);
    });
    
};

const loadVideoDetails = (videoID) =>{
    console.log(videoID);
    const url =`https://openapi.programming-hero.com/api/phero-tube/video/${videoID}`
    fetch(url)
    .then((res) => res.json())
    .then((data) =>displayVideosDetails(data.video))
};
const displayVideosDetails = (video) => {
    console.log(video);
    document.getElementById("video_details").showModal();
    const detailsContainer = document.getElementById("details-container")
    
    detailsContainer.innerHTML =`
    <div class="card bg-base-100 image-full w-96 shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.authors[0].profile_name} </p>
    <p>Wow Beatiful Song</p>
    <div class="card-actions justify-end">
    </div>
  </div>
</div>`
}
    

   
    

function displayCategories (categories) {
    
    //get the container
    const categoryContainer = document.getElementById("category-container")
    
    //loop operation on array of object
    for(let cat of categories) {
        console.log(cat)

        //category elementer
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML=`
        <button id="btn-${cat.category_id}" onclick="loadCategoriesVideos(${cat.category_id})"
         class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>`
         
         //append the element
        categoryContainer.append(categoryDiv);
        
    }
}
// {
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }

const  displayVideos = (videos)=> {
const videoContainer = document.getElementById("video-container")
videoContainer.innerHTML= "";
if(videos.length ==0) {
    videoContainer.innerHTML = `
       <div class="py-20 col-span-full flex flex-col justify-center items-center text-center">
            <img class="w-[140px] h-[140px] mb-5" src="Icon.png" alt="">
            <h1 class="text-2xl font-bold">Oops!! Sorry, There is no<br>content here</h1>
        </div>`;
        hideLoader()
        return;
}

videos.forEach((video)=> {
    console.log(video);

    const videoCard = document.createElement("div");

    videoCard.innerHTML=`
        <div class="card bg-base-100">
            <figure class="relative">
              <img class="w-full h-[250px] object-cover"
                src="${video.thumbnail}"
                alt="Shoes" />
                <SPan class="absolute bottom-2 right-2 text-white bg-black px-2 rounded text-sm">3hrs 56 min ago</SPan>
            </figure>
            <div class="flex gap-3 px-0 py-5">
                <div class="profile">
                    <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2">
                          <img src="${video.authors[0].profile_picture}" />
                        </div>
                      </div>
                </div>
                <div class="Intro">
                    <h2 class="text-sm font-semibold">${video.title}</h2>
                    <p class="text-sm text-gray-400 flex gap-1">
                    ${video.authors[0].profile_name}
                    ${video.authors[0].verified == true ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="">`  : 'not verified'}
                    </p>
                    <p class="text-sm text-gray-400">${video.others.views}</p>
                </div>
            </div>
            <button onclick=loadVideoDetails('${video.video_id}') class="btn btn-block">Show Details</button>
        </div>
        `;

    //apend
    videoContainer.append(videoCard)
});
hideLoader()
}
document.getElementById("search-input").addEventListener("keyup", (event)=>{
    const input = event.target.value;
    console.log(input);
    loadVideos(input);
})
loadCategories();


