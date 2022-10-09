function docReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

const process = (tags) => {

    console.log('Running tag filter')
    const posts = document.getElementsByClassName('PostHeader__post-title-line');
    console.log(posts.length + ' posts to be checked')

    for (let post of posts) {
        tags.forEach(tag => {
            if (post.innerHTML.toLocaleLowerCase().includes(tag.toLocaleLowerCase())) {
                console.log('Removed one post for containing the word: ' + tag);
                post.
                    parentElement.
                    parentElement.
                    parentElement.style.display = 'none';
            }
        })

    }

}

docReady(() => {
    console.log('Document ready, loading tags')
    chrome.storage.sync.get({
        allTags: [],
    }, (items) => {
        console.log('Tags loaded:' + items.allTags)
        console.log('Hooking up observer')

        const parent = document.getElementsByClassName("PostsFromSubredditPage")[0]

        console.log('Observing: ' + parent)
        const config = { childList: true, subtree: true }

        const observer = new MutationObserver((mutationList, observer) => {
            for (const mutation of mutationList) {
                if (mutation.type === 'childList') {
                    console.log('Posts loaded, running tag filter')
                    process(items.allTags)
                }
            }
        })

        observer.observe(parent, config)
    });
});

