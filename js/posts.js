const output = document.querySelector("#postsFeed");
const API_BASE_URL = "https://nf-api.onrender.com";
const postsUrl = `${API_BASE_URL}/api/v1/social/posts/`;
const author = "?_author=true"

/**
 * List posts to home.html
 */

let listPosts = (posts) => {
    const username = localStorage.getItem("username");
    const welcomeMsg = document.querySelector("#welcomeMsg");
    welcomeMsg.innerHTML = `Welcome back ${username}!`

    let newPost = "";
    for (let post of posts) {
        // console.log(post);
        const deleteBtn = `<button class="deleteBtn position-absolute bottom-0 end-0 m-2 btn btn-dark" data-delete="${post.id}">Delete</button>`;            
  
        newPost += `
        <div class="card p-3 mt-3 d-flex position-relative>
            <img src="#" class="" alt="">
            <a href="../singlePost.html?id=${post.id}">
                <h3 class="h5 pt-2 fw-bold text-capitalize">${post.title}</h3>
            <a/>
            <a href="#">@${post.author.name}</a>
            <p class="mt-2">${post.body}</p>
            <img src="${post.media}" class="" alt="">
            ${username === post.author.name ? deleteBtn : ""}
        </div>`;
    }
    output.innerHTML = newPost;

    const deleteButtons = document.querySelectorAll(".deleteBtn");
    console.log(deleteButtons);

    for (let button of deleteButtons) {
        console.log(button);
    }
}

/**
 * Get all posts from API
 */

async function getPosts (url) {
    try {
        const token = localStorage.getItem("accessToken");
        // console.log(token);
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
        const response = await fetch (url, options);
        // console.log(response);
        const json = await response.json();
        // console.log(json);
        listPosts(json);
    } catch (error) {
        console.log(error);
    }
}

getPosts(postsUrl + author);

const postBtn = document.querySelector("#postButton");
const titleInput = document.querySelector("#titleInput");
const bodyInput = document.querySelector("#bodyInput");
const mediaInput = document.querySelector("#mediaInput");

/**
 * Creates a new post
 */

async function submitPost (url) {
    const title = titleInput.value;
    const bodyValue = bodyInput.value;
    
    const entry = {
        title,
        body: bodyValue,
    };
    
    if (mediaInput.value != "") {
        const media = mediaInput.value;
        entry["media"] = media;
    } 

    console.log(entry);

    try {
        const token = localStorage.getItem("accessToken");
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(entry)
        }
        await fetch (url, options); // Er dette greit??
        // console.log(response);
        // const json = await response.json();
        // console.log(json);
        document.location.reload();
    } catch (error) {
        console.log(error);
    }
}

postBtn.addEventListener("click", () => {
    submitPost(postsUrl);
    titleInput.value = "";
    bodyInput.value = "";
    mediaInput.value = "";
});

/**
 * Deletes a post
 */

async function deletePost (url) {
    try {
        const token = localStorage.getItem("accessToken");
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
        const response = await fetch (url, options);
        console.log(response);
        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.log(error);
    }
}


