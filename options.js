let allTags = [];

const saveOptions = () => {
    chrome.storage.sync.set({ allTags }, () => {
        console.log('tag saved');
    });
}

const restoreOptions = () => {
    chrome.storage.sync.get({
        allTags: [],
    }, (items) => {
        allTags = items.allTags;
        populateUI();
    });
}

const addTag = () => {
    const input = document.getElementsByClassName('input')[0];

    if (!input.value) {
        return;
    }

    allTags.push(input.value);
    input.value = '';

    // Populate tags in UI
    populateUI();
    saveOptions();
}

const removeTag = (tag) => {
    allTags = allTags.filter(t => t !== tag);
    populateUI();
    saveOptions();
}

const populateUI = () => {
    const container = document.getElementsByClassName('tags')[0];
    container.innerHTML = '';
    for (var tag of allTags) {
        var span = document.createElement('span');
        span.innerHTML = tag;
        span.className = 'tag';
        span.addEventListener('click', (e) => removeTag(e.target.innerHTML));
        container.appendChild(span);
    }
}

const hookupEventListeners = () => {
    document.getElementsByClassName('add')[0].addEventListener('click', addTag);
    document.addEventListener('DOMContentLoaded', restoreOptions);
}

hookupEventListeners();
