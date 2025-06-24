const searchForm = document.querySelector('form');
        const searchInput = document.querySelector('input[type="text"]');
        const recentList = document.getElementById('recent-searches');

        // Show stored recent searches
        function loadRecentSearches() {
            const searches = JSON.parse(localStorage.getItem('recentHistorySearches')) || [];
            recentList.innerHTML = '';
            searches.slice(0, 5).forEach(search => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = `/search?q=${encodeURIComponent(search)}`;
                a.textContent = search;
                li.appendChild(a);
                recentList.appendChild(li);
            });
        }

        function getTitleBySearchCount(count) {
            if (count >= 121) return "Emperor";
            if (count >= 91) return "King";
            if (count >= 61) return "Grand Duke";
            if (count >= 41) return "Duke";
            if (count >= 26) return "Count";
            if (count >= 16) return "Viscount";
            if (count >= 11) return "Baron";
            if (count >= 6) return "Knight";
            if (count >= 3) return "Squire";
            return "Peasant";
        }

        function updateUserTitle() {
            const count = parseInt(localStorage.getItem('searchCount') || '0');
            const title = getTitleBySearchCount(count);
            const titleEl = document.getElementById('user-title');
            titleEl.textContent = `🏰 Your Title: ${title} (${count} searches)`;
        }

        searchForm.addEventListener('submit', () => {
            const term = searchInput.value.trim();
            if (!term) return;

            let searches = JSON.parse(localStorage.getItem('recentHistorySearches')) || [];
            searches = [term, ...searches.filter(s => s !== term)];
            localStorage.setItem('recentHistorySearches', JSON.stringify(searches));

            let count = parseInt(localStorage.getItem('searchCount') || '0');
            localStorage.setItem('searchCount', ++count);
        });

        window.addEventListener('DOMContentLoaded', () => {
            loadRecentSearches();
            updateUserTitle();
        });


        // Store search when submitted
        searchForm.addEventListener('submit', () => {
            const term = searchInput.value.trim();
            if (!term) return;
            let searches = JSON.parse(localStorage.getItem('recentHistorySearches')) || [];
            searches = [term, ...searches.filter(s => s !== term)];
            localStorage.setItem('recentHistorySearches', JSON.stringify(searches));
        });

        // Load on page open
        window.addEventListener('DOMContentLoaded', loadRecentSearches);