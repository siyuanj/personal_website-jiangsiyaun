// 初始化 marked.js
marked.setOptions({
    breaks: true,
    highlight: code => hljs.highlightAuto(code).value
});

// 动态加载笔记
document.querySelectorAll('.notes-list a').forEach(link => {
    link.addEventListener('click', async (e) => {
        e.preventDefault();
        const mdFile = e.target.dataset.md;

        // 显示加载状态
        e.target.classList.add('loading');

        try {
            const response = await fetch(mdFile);
            const markdown = await response.text();
            const htmlContent = marked.parse(markdown);

            // 更新界面
            document.querySelector('.notes-list').classList.add('hidden');
            document.getElementById('note-content').innerHTML = htmlContent;
            document.getElementById('note-content').classList.remove('hidden');
            document.getElementById('back-button').classList.remove('hidden');
        } catch (error) {
            console.error('Failed to load note:', error);
            alert('Failed to load note. Please try later.');
        } finally {
            e.target.classList.remove('loading');
        }
    });
});

// 返回按钮功能
document.getElementById('back-button').addEventListener('click', () => {
    document.querySelector('.notes-list').classList.remove('hidden');
    document.getElementById('note-content').classList.add('hidden');
    document.getElementById('back-button').classList.add('hidden');
});
