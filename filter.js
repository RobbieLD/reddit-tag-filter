const posts = document.getElementsByTagName("h3");

const process = (tags) => {
    console.log(tags);
    for (let post of posts) {
        console.log('checking: ' + post.innerHTML);
        tags.forEach(tag => {
            if (post.innerHTML.toLocaleLowerCase().includes(tag.toLocaleLowerCase())) {
                console.log('Removed one post for containing the word: ' + tag);
                post.
                    parentElement.
                    parentElement.
                    parentElement.
                    parentElement.
                    parentElement.
                    parentElement.
                    parentElement.
                    parentElement.style.display = 'none';
            }
        })

    }

}

chrome.storage.sync.get({
    allTags: [],
}, (items) => {
    process(items.allTags);
});
