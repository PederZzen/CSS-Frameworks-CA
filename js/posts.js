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
        // const deleteBtn = `<button class="deleteBtn btn" data-delete="${post.id}">Delete</button>`;            
        // const updateBtn = `<button class="updateBtn btn" data-update="${post.id}">Update</button>`;            
        const postSettings = `
            <div class="dropdown position-absolute  m-1 top-0 end-0">
                <button class="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Edit</button>
                <ul class="dropdown-menu">
                    <li><button class="deleteBtn btn" data-delete="${post.id}">Delete</button></li>
                    <li><button class="updateBtn btn" data-update="${post.id}">Update</button></li>
                </ul>
            </div>`
  
        newPost += `
        <div class="card p-3 mt-3 d-flex position-relative>
            <img src="#" class="" alt="">
            <a href="../singlePost.html?id=${post.id}">
                <h3 class="h5 pt-2 fw-bold text-capitalize">${post.title}</h3>
            <a/>
            <a href="#">@${post.author.name}</a>
            <p class="mt-2">${post.body}</p>
            <img src="${post.media}" class="" alt="">
            ${username === post.author.name ? postSettings : ""}
        </div>`;
    }
    output.innerHTML = newPost;

    const deleteButtons = document.querySelectorAll(".deleteBtn");

    deleteButtons.forEach(button => {
        button.addEventListener("click", () => {
            const id = button.getAttribute("data-delete");
            console.log(id);

            deletePost(postsUrl + id);
        })
    })

    const updateButtons = document.querySelectorAll(".updateBtn");

    updateButtons.forEach(button => {
        button.addEventListener("click", () => {
            const id = button.getAttribute("data-update");
            console.log(id);
        })
    })
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
        document.location.reload();
    } catch (error) {
        console.log(error);
    }
}

/** Update Post */

async function updatePost (url) {
    try {
        const token = localStorage.getItem("accessToken");
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
        const response = await fetch (url, options);
        console.log(response);
        const json = await response.json();
        console.log(json);
        document.location.reload();
    } catch (error) {
        console.log(error);
    }
}