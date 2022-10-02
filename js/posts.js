const output = document.querySelector("#postsFeed");
const API_BASE_URL = "https://nf-api.onrender.com";
const postsUrl = `${API_BASE_URL}/api/v1/social/posts`;

let listPosts = (posts) => {
    let newPost = "";
    for (let post of posts) {
        console.log(post);
        newPost += `
        <a href="#" class="d-flex">
            <img src="" class="" alt="">
            <h3 class="h5 p-2"></h3>                            
        </a>
        <p class="mt-3">${post.title}</p>`
    }
    output.innerHTML = newPost;
}

async function getPosts (url) {
    try {
        const token = localStorage.getItem("accessToken");
        // console.log(token);
        const fetchOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
        const response = await fetch (url, fetchOptions);
        // console.log(response);
        const json = await response.json();
        // console.log(json);
        listPosts(json);
    } catch (error) {
        console.log(error);
    }
}

getPosts(postsUrl)

