const output = document.querySelector("#postOutput");
const queryString = document.location.search;
const searchParams = new URLSearchParams(queryString);
const id = searchParams.get("id");

const updateBtn = document.querySelector("#updateButton");
const titleInput = document.querySelector("#titleInput");
const bodyInput = document.querySelector("#bodyInput");
const mediaInput = document.querySelector("#mediaInput");

const API_BASE_URL = "https://nf-api.onrender.com";
const postUrl = `${API_BASE_URL}/api/v1/social/posts/${id}?_author=true&_comments=true&_reactions=true`;

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
        console.log(response);
        const post = await response.json();
        console.log(post);

        titleInput.value = post.title;
        bodyInput.value = post.body;
        mediaInput.value = post.media;

    } catch (error) {
        console.log(error);
    }
}

getPost(postUrl);

async function updatePost (url) {
    const title = titleInput.value;
    const bodyValue = bodyInput.value;
    const media = mediaInput.value;
    
    const entry = {
        title,
        body: bodyValue,
        media,
    };

    console.log(entry);

    try {
        const token = localStorage.getItem("accessToken");
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(entry),
        };
        const response = await fetch (url, options);
        console.log(response);
        const json = await response.json();
        console.log(json);
        window.location.href = "../home.html";
    } catch (error) {
        console.log(error);
    };
};

updateBtn.addEventListener("click", () => {
    if (titleInput.value && bodyInput.value) {
        updatePost(postUrl);    
    }
})