const loadData = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );
  const data = await response.json();
  //   console.log(data.data);

  const allTabs = document.querySelector(".all-tabs");
  data.data.forEach((element) => {
    // sort by view button
    // const sortByViewButton = document.querySelector('#sort-by-view-button')

    const div = document.createElement("div");
    div.innerHTML = `
    <a onclick="showData('${element.category_id}')" href="#">${element.category}</a>
    `;
    allTabs.appendChild(div);
  });
};
loadData();

const showData = async (categoryId) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await response.json();
  // console.log(typeof data.data);

  if (Object.keys(data.data).length === 0) {
    const allData = document.querySelector(".all-cards");
    allData.innerHTML = "";
    const errorSection = document.querySelector("#error-section");
    errorSection.innerHTML = "";
    const div = document.createElement("div");
    div.classList.add("error");
    div.innerHTML = `
    <img class="error-img" src="./img/Icon.png" alt="" />
    <div class="error-text">
      <h1>Oops!! Sorry, There is no<br />content her</h1>
    </div>
    `;
    errorSection.appendChild(div);
  } else {
    const allData = document.querySelector(".all-cards");
    allData.innerHTML = "";
    const errorSection = document.querySelector("#error-section");
    errorSection.innerHTML = "";
    data.data.forEach((video) => {
      // this code is for time in video
      const sec = Number(video.others.posted_date);
      const min = Math.floor(sec / 60);
      const hour = Math.floor(min / 60);
      const hourTitle = hour > 1 ? "hrs" : "hr";

      const div = document.createElement("div");
      div.classList.add("card");
      const p = document.createElement("p");
      p.classList.add("overlay");
      if (video.others.posted_date.length > 1) {
        p.innerHTML = `${hour}${hourTitle} ${min - hour * 60}min ago`;
      } else {
        p.classList.add("none");
      }

      // main
      const divImg = document.createElement("div");
      divImg.classList.add("card-img");
      const image = document.createElement("img");
      image.src = `${video.thumbnail}`;

      // main
      const cardProfileText = document.createElement("div");
      cardProfileText.classList.add("card-profile-text");
      cardProfileText.innerHTML = `
              <div class="profile">
                <img
                  src="${video.authors[0].profile_picture}"
                  alt=""
                />
              </div>
              <div class="text">
                <p class="title">${video.title}</p>
                <div class="name-varified">
                  <p class="name">${video.authors[0].profile_name}</p>
                  <span class="material-symbols-outlined"> ${
                    video.authors[0].verified ? "new_releases" : " "
                  }  </span>
                </div>
                <p class="view">${video.others.views} views</p>
              </div>
            
      `;

      div.appendChild(divImg);
      divImg.appendChild(image);
      divImg.appendChild(p);
      div.appendChild(cardProfileText);

      allData.appendChild(div);
      // console.log(div);
    });
    // super important
    const sortByViewButton = document.querySelector("#sort-by-view-button");

    // console.log(allData.childElementCount);
    const sortByView = async () => {
      const response = await fetch(
        `https://openapi.programming-hero.com/api/videos/categories`
      );
      const data = await response.json();
      const dataArray = data.data;
      // console.log(dataArray[0].category_id);

      // first data
      const firstResponse = await fetch(
        `https://openapi.programming-hero.com/api/videos/category/${dataArray[0].category_id}`
      );
      const firstData = await firstResponse.json();
      const allDataArray = firstData.data;

      // secode data
      const secondResponse = await fetch(
        `https://openapi.programming-hero.com/api/videos/category/${dataArray[1].category_id}`
      );
      const secondData = await secondResponse.json();
      const musicDataArray = secondData.data;

      // third data
      const thirdResponse = await fetch(
        `https://openapi.programming-hero.com/api/videos/category/${dataArray[2].category_id}`
      );
      const thridData = await thirdResponse.json();
      const comedyDataArray = thridData.data;

      // replace K with number - function
      function replacek(array) {
        for (let i = 0; i < array.length; i++) {
          const element = array[i];
          if (element.others.views.endsWith("K")) {
            element.others.views = element.others.views.replace("K", " ");
            element.others.views = Number(element.others.views) * 1000;
          }
        }
        return array;
      }
      // Array with a interger number
      const firstNewArray = replacek(allDataArray);
      const secondNewArray = replacek(musicDataArray);
      const thirdNewArray = replacek(comedyDataArray); // total view is bigger than second array

      // total view count - function
      let viewCount = 0;
      function viewTotal(arrOfInterger) {
        for (let i = 0; i < arrOfInterger.length; i++) {
          const element = arrOfInterger[i];
          viewCount += element.others.views;
        }
        return viewCount;
      }
      const secondViewTotal = viewTotal(secondNewArray);
      const thirdViewTotal = viewTotal(thirdNewArray);

      function sortedByView(intergerArray) {
        return (sortarr = intergerArray.sort(
          (a, b) => b.others.views - a.others.views
        ));
      }

      // sorted arry by their views (final result)
      var firstSortedByView = sortedByView(firstNewArray);
      const secondSortedByView = sortedByView(secondNewArray);
      const thirdSortedByView = sortedByView(thirdNewArray);

      if (allData.childElementCount === 12) {
        sortByViewButton.addEventListener("click", function () {
          console.log(firstSortedByView);
          const allData = document.querySelector(".all-cards");
          allData.innerHTML = "";
          const errorSection = document.querySelector("#error-section");
          errorSection.innerHTML = "";
          firstSortedByView.forEach((video) => {
            // this code is for time in video
            const sec = Number(video.others.posted_date);
            const min = Math.floor(sec / 60);
            const hour = Math.floor(min / 60);
            const hourTitle = hour > 1 ? "hrs" : "hr";

            const div = document.createElement("div");
            div.classList.add("card");
            const p = document.createElement("p");
            p.classList.add("overlay");
            if (video.others.posted_date.length > 1) {
              p.innerHTML = `${hour}${hourTitle} ${min - hour * 60}min ago`;
            } else {
              p.classList.add("none");
            }

            // main
            const divImg = document.createElement("div");
            divImg.classList.add("card-img");
            const image = document.createElement("img");
            image.src = `${video.thumbnail}`;

            // main
            const cardProfileText = document.createElement("div");
            cardProfileText.classList.add("card-profile-text");
            cardProfileText.innerHTML = `
              <div class="profile">
                <img
                  src="${video.authors[0].profile_picture}"
                  alt=""
                />
              </div>
              <div class="text">
                <p class="title">${video.title}</p>
                <div class="name-varified">
                  <p class="name">${video.authors[0].profile_name}</p>
                  <span class="material-symbols-outlined"> ${
                    video.authors[0].verified ? "new_releases" : " "
                  }  </span>
                </div>
                <p class="view">${video.others.views / 1000}K views</p>
              </div>
            
      `;

            div.appendChild(divImg);
            divImg.appendChild(image);
            divImg.appendChild(p);
            div.appendChild(cardProfileText);

            allData.appendChild(div);
            // console.log(div);
          });
        });
      } else if (secondSortedByView.length === 6) {
        sortByViewButton.addEventListener("click", function () {
          console.log(secondSortedByView);

          const allData = document.querySelector(".all-cards");
          allData.innerHTML = "";
          const errorSection = document.querySelector("#error-section");
          errorSection.innerHTML = "";
          secondSortedByView.forEach((video) => {
            // this code is for time in video
            const sec = Number(video.others.posted_date);
            const min = Math.floor(sec / 60);
            const hour = Math.floor(min / 60);
            const hourTitle = hour > 1 ? "hrs" : "hr";

            const div = document.createElement("div");
            div.classList.add("card");
            const p = document.createElement("p");
            p.classList.add("overlay");
            if (video.others.posted_date.length > 1) {
              p.innerHTML = `${hour}${hourTitle} ${min - hour * 60}min ago`;
            } else {
              p.classList.add("none");
            }

            // main
            const divImg = document.createElement("div");
            divImg.classList.add("card-img");
            const image = document.createElement("img");
            image.src = `${video.thumbnail}`;

            // main
            const cardProfileText = document.createElement("div");
            cardProfileText.classList.add("card-profile-text");
            cardProfileText.innerHTML = `
               <div class="profile">
                 <img
                   src="${video.authors[0].profile_picture}"
                   alt=""
                 />
               </div>
               <div class="text">
                 <p class="title">${video.title}</p>
                 <div class="name-varified">
                   <p class="name">${video.authors[0].profile_name}</p>
                   <span class="material-symbols-outlined"> ${
                     video.authors[0].verified ? "new_releases" : " "
                   }  </span>
                 </div>
                 <p class="view">${video.others.views / 1000}K views</p>
               </div>
             
       `;

            div.appendChild(divImg);
            divImg.appendChild(image);
            divImg.appendChild(p);
            div.appendChild(cardProfileText);

            allData.appendChild(div);
            // console.log(div);
          });
        });
      } else {
        sortByViewButton.addEventListener("click", function () {
          console.log(thirdSortedByView);
  
          const allData = document.querySelector(".all-cards");
          allData.innerHTML = "";
          const errorSection = document.querySelector("#error-section");
          errorSection.innerHTML = "";
          thirdSortedByView.forEach((video) => {
            // this code is for time in video
            const sec = Number(video.others.posted_date);
            const min = Math.floor(sec / 60);
            const hour = Math.floor(min / 60);
            const hourTitle = hour > 1 ? "hrs" : "hr";
  
            const div = document.createElement("div");
            div.classList.add("card");
            const p = document.createElement("p");
            p.classList.add("overlay");
            if (video.others.posted_date.length > 1) {
              p.innerHTML = `${hour}${hourTitle} ${min - hour * 60}min ago`;
            } else {
              p.classList.add("none");
            }
  
            // main
            const divImg = document.createElement("div");
            divImg.classList.add("card-img");
            const image = document.createElement("img");
            image.src = `${video.thumbnail}`;
  
            // main
            const cardProfileText = document.createElement("div");
            cardProfileText.classList.add("card-profile-text");
            cardProfileText.innerHTML = `
            <div class="profile">
              <img
                src="${video.authors[0].profile_picture}"
                alt=""
              />
            </div>
            <div class="text">
              <p class="title">${video.title}</p>
              <div class="name-varified">
                <p class="name">${video.authors[0].profile_name}</p>
                <span class="material-symbols-outlined"> ${
                  video.authors[0].verified ? "new_releases" : " "
                }  </span>
              </div>
              <p class="view">${video.others.views / 1000}K views</p>
            </div>
          
    `;
  
            div.appendChild(divImg);
            divImg.appendChild(image);
            divImg.appendChild(p);
            div.appendChild(cardProfileText);
  
            allData.appendChild(div);
            // console.log(div);
          });
        });
      }
    };
    sortByView();
  }
};
showData("1000");

// sort by view
const header = document.querySelector("#header");
const headerDiv = document.createElement("div");
headerDiv.classList.add("main");
headerDiv.innerHTML = `
  <div class="logo">
    <img src="./img/logo.png" alt="" />
  </div>
  <div class="sort-btn">
    <button onclick="" id="sort-by-view-button" type="button">Sort by view</button>
  </div>
  <div class="blog-btn">
    <a href="./html/blog.html">
      <button type="button">Blog</button>
    </a>
  </div>
`;
header.appendChild(headerDiv);

/*
const sortByView = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );
  const data = await response.json();
  const dataArray = data.data;
  // console.log(dataArray[0].category_id);

  // first data
  const firstResponse = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${dataArray[0].category_id}`
  );
  const firstData = await firstResponse.json();
  const allDataArray = firstData.data;

  // secode data
  const secondResponse = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${dataArray[1].category_id}`
  );
  const secondData = await secondResponse.json();
  const musicDataArray = secondData.data;

  // third data
  const thirdResponse = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${dataArray[2].category_id}`
  );
  const thridData = await thirdResponse.json();
  const comedyDataArray = thridData.data;

  // replace K with number - function
  function replacek(array) {
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      if (element.others.views.endsWith("K")) {
        element.others.views = element.others.views.replace("K", " ");
        element.others.views = Number(element.others.views) * 1000;
      }
    }
    return array;
  }
  // Array with a interger number
  const firstNewArray = replacek(allDataArray);
  const secondNewArray = replacek(musicDataArray);
  const thirdNewArray = replacek(comedyDataArray); // total view is bigger than second array

  // total view count - function
  let viewCount = 0;
  function viewTotal(arrOfInterger) {
    for (let i = 0; i < arrOfInterger.length; i++) {
      const element = arrOfInterger[i];
      viewCount += element.others.views;
    }
    return viewCount;
  }
  const secondViewTotal = viewTotal(secondNewArray);
  const thirdViewTotal = viewTotal(thirdNewArray);
  // console.log(secondViewTotal);
  // console.log(thirdViewTotal);
  //890100 (8L)
  //1255900 (12L)

  // sorted by view of array - function
  // console.log(firstNewArray);
  function sortedByView(intergerArray) {
    return (sortarr = intergerArray.sort(
      (a, b) => b.others.views - a.others.views
    ));
  }

  // sorted arry by their views (final result)
  var firstSortedByView = sortedByView(firstNewArray);
  const secondSortedByView = sortedByView(secondNewArray);
  const thirdSortedByView = sortedByView(thirdNewArray);
  // console.log(firstSortedByView);
  // console.log(secondSortedByView);
  // console.log(thirdSortedByView);
};
sortByView();
*/
