const output = document.querySelector("#postOutput");
const queryString = document.location.search;
const searchParams = new URLSearchParams(queryString);
const id = searchParams.get("id");
console.log(id);

const API_BASE_URL = "https://nf-api.onrender.com";
const postUrl = `${API_BASE_URL}/api/v1/social/posts/${id}?_author=true&_comments=true&_reactions=true`;

let listPost = (post) => {
    console.log(post);
    document.title = "The Real fakebook | " + post.title;

    let date = new Date(post.updated);
    let localDate = date.toLocaleString("default", {day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit"});

    output.innerHTML = `   
    <h1 class="text-capitalize font-bold">${post.title}</h1>
    <h2>${post.author.name}</h2>
    <p class="mt-3">${post.body}</p>
    <img src="${post.media}" class="img-fluid">
    <p class="mt-2">${localDate}</p>
 `

}

async function getPost (url) {
    try {
        const token = localStorage.getItem("accessToken");
        // console.log(token);
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const response = await fetch (url, options);
        // console.log(response);
        const json = await response.json();
        // console.log(json);
        listPost(json);
    } catch (error) {
        console.log(error);
    }
}

getPost(postUrl);