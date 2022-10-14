const output = document.querySelector("#postsFeed");
const API_BASE_URL = "https://nf-api.onrender.com";
const postsUrl = `${API_BASE_URL}/api/v1/social/posts/`;
const author = "?_author=true";

const username = localStorage.getItem("username");
const welcomeMsg = document.querySelector("#welcomeMsg");
welcomeMsg.innerHTML = `Welcome back ${username}!`;

/**
 * List posts to home.html
 */

let listPosts = (posts) => {
    output.innerHTML = "";

    let newPost = "";
    for (let post of posts) {    
        const postSettings = `
            <div class="dropdown position-absolute  m-1 top-0 end-0">
                <button class="btn btn-primary text-white dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Edit</button>
                <ul class="dropdown-menu">
                    <li class="deleteBtn btn" data-delete="${post.id}">Delete</li>
                    <li><a href="../updatePost.html?id=${post.id}" class="updateBtn btn" data-update="${post.id}">Update</a></li>
                </ul>
            </div>`

        let date = new Date(post.created);
        let localDate = date.toLocaleString("default", {day: "numeric", month: "long", hour: "2-digit", minute: "2-digit"});
  
        newPost += `
        <div class="position-relative card p-3 bg-secondary mt-3 d-flex">
            <a href="../singlePost.html?id=${post.id}" class="text-white">
                <h3 class="h5 pt-2 fw-bold text-capitalize">${post.title ? post.title : "Untitled Post"}</h3>
                <p>@${post.author.name}</p>
                <p class="">${post.body}</p>
                <img src="${post.media}" class="img-fluid" alt="">
                <p class="mt-2 opacity-50">${localDate}</p>
            </a>
            ${username === post.author.name ? postSettings : ""}
        </div>`
    }
    
    output.innerHTML = newPost;

    const deleteButtons = document.querySelectorAll(".deleteBtn");

    deleteButtons.forEach(button => {
        button.addEventListener("click", () => {
            const id = button.getAttribute("data-delete");
            if (confirm("Are you sure you want to delete this awesome post?") == true) {
                deletePost(postsUrl + id);
            }
        })
    })
}


/**
 * Get all posts from API
 */

let collection = [];

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
        collection = json;
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
    if (titleInput.value && bodyInput.value) {
        submitPost(postsUrl);
        titleInput.value = "";
        bodyInput.value = "";
        mediaInput.value = "";
    } else {
        const errorMsg = document.querySelector(".errorMsg");
        errorMsg.innerHTML = "Title and Message must be filled out"
    }
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

/** Sort */

const filterOption = document.querySelectorAll(".filterOption");

filterOption.forEach(option => {
    option.addEventListener("click", (e) => {
        const value = e.target.value;
        const sortedUrl = `${postsUrl}${author}&sort=created&sortOrder=${value}`;
        getPosts(sortedUrl);
    })
})

const searchInput = document.querySelector("#searchInput");

let filterPosts = () => {
    const filterQuery = searchInput.value;
    const filtered = collection.filter((post) => {
        const filterAuthor = post.author.name.toUpperCase().indexOf(filterQuery.toUpperCase().trim()) > -1;
        const filterTitle = post.title.toUpperCase().indexOf(filterQuery.toUpperCase().trim()) > -1;
        
        return filterAuthor || filterTitle;
    });

    listPosts(filtered)
}

searchInput.addEventListener("keyup", filterPosts);