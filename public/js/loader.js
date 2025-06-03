const flags = [
            'media/img/roman-empire.png',
            'media/img/byzantium.png',
            'media/img/ottoman.svg',
            'media/img/royal-french.webp'
        ];

        let progress = 0;
        const progressEl = document.getElementById('progress');
        const flagEl = document.getElementById('flag');
        const loader = document.getElementById('loader');
        const search = document.getElementById('search');

        const updateLoader = () => {
            progress += 1;
            progressEl.textContent = `${progress}%`;
            flagEl.src = flags[Math.floor(progress / 25) % flags.length];

            if (progress < 100) {
                setTimeout(updateLoader, 30); // adjust speed here
            } else {
                loader.style.display = 'none';
                search.style.display = 'flex';
                document.body.style.overflow = 'auto';
            }
        };

        window.onload = updateLoader;