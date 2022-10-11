const header = document.querySelector("#profileHeader");
const followers = document.querySelector("#profileFollowers");
const following = document.querySelector("#profileFollowing");
const posts = document.querySelector("#profilePosts");

let username = localStorage.getItem("username");

const API_BASE_URL = "https://nf-api.onrender.com";
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
        listProfile(json)
    }
    catch (error) {
        console.log(error);
    }
}

getProfile(profileUrl)

let listProfile = (profile) => {
    console.log(profile.followers);
    const placeholderImg = "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png";

    header.innerHTML = `
    <img src="${profile.avatar ? profile.avatar : placeholderImg}" alt="The profile picture of ${profile.name}" class="rounded-circle col-4">
    <h1 class="m-4 text-capitalize">${profile.name}</h1>
    `;

    if (profile.followers.length >= 1) {
        for (let follower of profile.followers) {
            followers.innerHTML += `
            <li><img src="${follower.avatar}" class="rounded-circle w-25 p-2" alt="${follower.name}s profile picture">${follower.name}</li>`
        }
    } else {
        followers.innerHTML = "No followers.."
    }

}