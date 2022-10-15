export let listPosts = (posts) => {
    const output = document.querySelector("#postsFeed");

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