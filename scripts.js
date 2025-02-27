// 初始化 marked.js 和 highlight.js
marked.setOptions({
    breaks: true,
    highlight: function(code) {
        return hljs.highlightAuto(code).value;
    }
});

// 动态生成笔记列表
const notes = [
    { title: '示例笔记1', file: 'notes/note1.md' },
    { title: '示例笔记2', file: 'notes/note2.md' }
];

function initNotesList() {
    const notesList = document.querySelector('.notes-list');
    const ul = document.createElement('ul');
    
    notes.forEach(note => {
        const li = document.createElement('li');
        li.innerHTML = `
            <a href="#" class="note-link" data-md="${note.file}">
                ${note.title}
            </a>
        `;
        ul.appendChild(li);
    });
    
    notesList.appendChild(ul);
}

// 笔记加载功能（事件委托）
document.querySelector('.notes-list').addEventListener('click', async (e) => {
    const link = e.target.closest('.note-link');
    if (!link) return;

    e.preventDefault();
    link.classList.add('loading');
    
    try {
        const response = await fetch(link.dataset.md);
        const markdown = await response.text();
        const htmlContent = marked.parse(markdown);
        
        document.querySelector('.notes-list').classList.add('hidden');
        document.getElementById('note-content').innerHTML = htmlContent;
        document.getElementById('note-content').classList.remove('hidden');
        document.getElementById('back-button').classList.remove('hidden');
    } catch (error) {
        console.error('加载失败:', error);
        alert('笔记加载失败，请稍后重试');
    } finally {
        link.classList.remove('loading');
    }
});

// 返回按钮功能
document.getElementById('back-button').addEventListener('click', () => {
    document.querySelector('.notes-list').classList.remove('hidden');
    document.getElementById('note-content').classList.add('hidden');
    document.getElementById('back-button').classList.add('hidden');
});

// 汉堡菜单功能
document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// 关闭移动端菜单当点击导航项
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// 初始化
document.addEventListener('DOMContentLoaded', initNotesList);
