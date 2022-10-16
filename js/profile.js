const header = document.querySelector("#profileHeader");
const followers = document.querySelector("#profileFollowers");
const following = document.querySelector("#profileFollowing");
const posts = document.querySelector("#profilePosts");
const postsOutput = document.querySelector("#profilePosts");

let username = localStorage.getItem("username");

const API_BASE_URL = "https://nf-api.onrender.com";
const postsUrl = `${API_BASE_URL}/api/v1/social/posts/`;
const profileUrl = `${API_BASE_URL}/api/v1/social/profiles/${username}?_posts=true&_following=true&_followers=true`;

async function getProfile (url) {
    try{
        const token = localStorage.getItem("accessToken");
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const response = await fetch (url, options);
        const json = await response.json();
        listProfile(json);
        listPosts(json);
    }
    catch (error) {
        console.log(error);
    }
}
 
getProfile(profileUrl)

let listProfile = (profile) => {
    const placeholderImg = "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png";

    header.innerHTML = `
    <img src="${profile.avatar ? profile.avatar : placeholderImg}" alt="The profile picture of ${profile.name}" class="rounded-circle col-2">
    <h1 class="m-4 text-capitalize text-white">${profile.name}</h1>
    `;

    if (profile.followers.length >= 1) {
        for (let follower of profile.followers) {
            followers.innerHTML += `
            <li><img src="${follower.avatar}" class="m-2 rounded-circle" style="height: 2rem;" alt="${follower.name}s profile picture">${follower.name}</li>`;
        };
    } else {
        followers.innerHTML = "No followers..";
    };

    if (profile.following.length >= 1) {
        for (let follows of profile.following) {
            following.innerHTML += `
            <li><img src="${follows.avatar ? follows.avatar : placeholderImg}" class="m-2 rounded-circle" style="height: 2rem;" alt="${follows.name}s profile picture">${follows.name}</li>`;
        };
    } else {
        following.innerHTML = "Not following anyone..";
    };
};

let listPosts = (profile) => {
    postsOutput.innerHTML = "";

    let newPost = "";
    for (let post of profile.posts) {    
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
        <div class="position-relative card p-3 bg-secondary mb-3 d-flex">
            <a href="../singlePost.html?id=${post.id}" class="text-white">
                <h3 class="h5 pt-2 fw-bold text-capitalize">${post.title ? post.title : "Untitled Post"}</h3>
                <p>@${post.owner}</p>
                <p class="">${post.body}</p>
                <img src="${post.media}" class="img-fluid" alt="">
                <p class="mt-2 opacity-50">${localDate}</p>
            </a>
            ${postSettings}
        </div>`
    }
    
    
    if (profile.posts.length == 0) { 
        postsOutput.innerHTML = `
        <p class="card bg-secondary p-2 text-white">No posts yet.. Go to feed and write something awesome!</p>
        ` } else {
        postsOutput.innerHTML = newPost;
    }

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
        await fetch (url, options);
        document.location.reload();
    } catch (error) {
        console.log(error);
    }
}

