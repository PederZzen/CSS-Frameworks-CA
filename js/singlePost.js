const output = document.querySelector("#postOutput");
const queryString = document.location.search;
const searchParams = new URLSearchParams(queryString);
const id = searchParams.get("id");
const username = localStorage.getItem("username");

const API_BASE_URL = "https://nf-api.onrender.com";
const postsUrl = `${API_BASE_URL}/api/v1/social/posts/${id}?_author=true&_comments=true&_reactions=true`;

let listPost = (post) => {
    document.title = "The Real fakebook | " + post.title;
    const postSettings = `
    <div class="dropdown position-absolute  m-1 top-0 end-0">
        <button class="btn btn-primary text-white dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Edit</button>
        <ul class="dropdown-menu">
            <li class="deleteBtn btn" data-delete="${post.id}">Delete</li>
            <li><a href="../updatePost.html?id=${post.id}" class="updateBtn btn" data-update="${post.id}">Update</a></li>
        </ul>
    </div>`

    let date = new Date(post.updated);
    let localDate = date.toLocaleString("default", {day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit"});

    output.innerHTML = `   
    <h1 class="text-capitalize h2">${post.title}</h1>
    <h2 class="h4">@${post.author.name}</h2>
    <p class="mt-3">${post.body}</p>
    <img src="${post.media}" class="img-fluid align-self">
    <p class="mt-2">${localDate}</p>
    ${username === post.author.name ? postSettings  : ""}
 `
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

async function getPost (url) {
    try {
        const token = localStorage.getItem("accessToken");
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const response = await fetch (url, options);
        const json = await response.json();
        listPost(json);
        listComments()
    } catch (error) {
        console.log(error);
    }
}

getPost(postsUrl);

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
        window.location.href = "../home.html";
    } catch (error) {
        console.log(error);
    }
}