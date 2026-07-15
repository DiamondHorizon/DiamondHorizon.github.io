let posts = [];
let filteredPosts = [];
let currentPage = 1;
const postsPerPage = 5;

fetch("posts.json")
  .then(res => res.json())
  .then(data => {
    posts = data;
    filteredPosts = [...posts];
    renderPage();
    renderTagFilters();
  });

function renderPage() {
    const container = document.getElementById("recentPosts");
    container.innerHTML = "";

    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;

    const pagePosts = filteredPosts.slice(start, end);

    pagePosts.forEach(post => {
        container.innerHTML += `
            <div class="post-snippet">
                <h3><a href="post.html?post=${post.url}">${post.title}</a></h3>
                <p>${post.snippet}</p>
                <small>${post.date}</small>
            </div>
        `;
    });

    renderPaginationControls();
}

function renderPaginationControls() {
    const container = document.getElementById("paginationControls");
    container.innerHTML = "";

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    if (totalPages <= 1) return;

    if (currentPage > 1) {
        container.innerHTML += `<button onclick="prevPage()">← Prev</button>`;
    }

    container.innerHTML += ` <span>Page ${currentPage} of ${totalPages}</span> `;

    if (currentPage < totalPages) {
        container.innerHTML += `<button onclick="nextPage()">Next →</button>`;
    }
}

function nextPage() {
    currentPage++;
    renderPage();
}

function prevPage() {
    currentPage--;
    renderPage();
}

function renderTagFilters() {
    const container = document.getElementById("tagFilters");
    container.innerHTML = "";

    const tags = new Set(posts.flatMap(p => p.tags));

    tags.forEach(tag => {
        container.innerHTML += `
            <label>
                <input type="checkbox" value="${tag}" onchange="applyFilters()">
                ${tag}
            </label>
        `;
    });
}

function applyFilters() {
    const keyword = document.getElementById("searchInput").value.toLowerCase();
    const checkedTags = [...document.querySelectorAll("#tagFilters input:checked")]
        .map(cb => cb.value);

    filteredPosts = posts.filter(post => {
        const matchesKeyword =
            post.title.toLowerCase().includes(keyword) ||
            post.snippet.toLowerCase().includes(keyword);

        const matchesTags =
            checkedTags.length === 0 ||
            checkedTags.every(tag => post.tags.includes(tag));

        return matchesKeyword && matchesTags;
    });

    currentPage = 1;
    renderPage();
}

document.getElementById("searchInput").addEventListener("input", applyFilters);