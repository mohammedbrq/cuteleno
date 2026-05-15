document.addEventListener('DOMContentLoaded', () => {
    const contentArea = document.getElementById('content-area');

    const steps = [
        {
            type: 'question',
            text: 'hello👋',
            buttons: [{ text: 'hey❤️', next: 1 }],
            image: 'hk_wave.png'
        },
        {
            type: 'question',
            text: "i heard that its leen's birthday today, how old are you now ?",
            buttons: [{ text: '20👸', next: 2 }],
            image: 'hk_curious.png'
        },
        {
            type: 'question',
            text: 'omg, happy birthday to you, i guess you are a full moon now and forever🌝',
            buttons: [{ text: 'awwww', next: 3 }],
            image: 'hk_celebrate.png'
        },
        {
            type: 'question',
            text: 'oh wait! i forgot to tell you something',
            buttons: [{ text: 'What?', next: 4 }],
            image: 'hk_shy.png'
        },
        {
            type: 'winner',
            text: '',
            image: 'hk_love.png',
            buttons: []
        }
    ];

    function renderStep(stepIndex) {
        const step = steps[stepIndex];
        const kittyImg = document.querySelector('.kitty-img');

        const createNewContent = () => {
            const wrapper = document.createElement('div');
            wrapper.classList.add('fade-enter');

            const h1 = document.createElement('h1');
            h1.textContent = step.text;
            if (step.type === 'winner') h1.className = 'winner-text';
            wrapper.appendChild(h1);

            if (step.type === 'winner') {
                createConfetti();
            } else if (step.buttons) {
                const btnContainer = document.createElement('div');
                btnContainer.className = 'btn-container';
                step.buttons.forEach(btnConfig => {
                    const btn = document.createElement('button');
                    btn.className = 'btn';
                    btn.textContent = btnConfig.text;
                    btn.onclick = () => renderStep(btnConfig.next);
                    btnContainer.appendChild(btn);
                });
                wrapper.appendChild(btnContainer);
            }
            return wrapper;
        };

        // Transition Logic
        if (contentArea.children.length > 0) {
            const currentContent = contentArea.firstElementChild;
            currentContent.classList.add('fade-exit-active');
            if (kittyImg) kittyImg.classList.add('fade-out');

            currentContent.addEventListener('transitionend', () => {
                currentContent.remove();
                if (kittyImg && step.image) {
                    kittyImg.src = `images/${step.image}`;
                    kittyImg.onload = () => kittyImg.classList.remove('fade-out');
                }
                const newContent = createNewContent();
                contentArea.appendChild(newContent);
                void newContent.offsetWidth; 
                newContent.classList.add('fade-enter-active');
            }, { once: true });
        } else {
            // Initial Load
            if (kittyImg && step.image) kittyImg.src = `images/${step.image}`;
            const newContent = createNewContent();
            contentArea.appendChild(newContent);
            void newContent.offsetWidth;
            newContent.classList.add('fade-enter-active');
        }
    }

    function createConfetti() {
        const emojis = ['❤️', '💖', '🎀', '🌸', '🎁', '😻'];
        setInterval(() => {
            const el = document.createElement('div');
            el.innerText = emojis[Math.floor(Math.random() * emojis.length)];
            el.style.position = 'fixed';
            el.style.left = Math.random() * 100 + 'vw';
            el.style.top = '-50px';
            el.style.fontSize = (Math.random() * 20 + 20) + 'px';
            el.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
            el.style.zIndex = '1000';
            document.body.appendChild(el);
            setTimeout(() => el.remove(), 5000);
        }, 200);

        if (!document.getElementById('confetti-style')) {
            const style = document.createElement('style');
            style.id = 'confetti-style';
            style.innerHTML = `@keyframes fall { to { transform: translateY(110vh) rotate(360deg); } }`;
            document.head.appendChild(style);
        }
    }

    renderStep(0);
});
