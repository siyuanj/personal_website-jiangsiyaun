// 动态加载 Markdown 文件并渲染
document.querySelectorAll('.notes-list a').forEach(link => {
    link.addEventListener('click', async (e) => {
        e.preventDefault();
        const mdFile = e.target.getAttribute('data-md');

        // 加载 Markdown 文件
        const response = await fetch(mdFile);
        const markdown = await response.text();

        // 渲染 Markdown 为 HTML
        const htmlContent = marked.parse(markdown);
        document.getElementById('note-content').innerHTML = htmlContent;
    });
});
