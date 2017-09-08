(function () {

    const parts = {
        header: [
            'nav',
            'user',
            'search'
        ],
        footer: [
            'site-footer'
        ]
    }

    Reveal.addEventListener('slidechanged', function (event) {
        // event.previousSlide, event.currentSlide, event.indexh, event.indexv
        showHideThemeParts(event.currentSlide, event.previousSlide);
        themeOnTop(event.currentSlide, event.previousSlide);
        hideHeaderFooter(event.currentSlide, event.previousSlide);
    });

    function hideHeaderFooter(currentSlide, previousSlide) {
        let header = document.querySelector('byu-header');
        let footer = document.querySelector('byu-footer');

        let hide = currentSlide && currentSlide.hasAttribute('hide-header');
        let wasHide = previousSlide && previousSlide.hasAttribute('hide-header');

        if (hide && wasHide || !hide && !wasHide) {
            return;
        }
        header.classList.toggle('hide', hide);
        footer.classList.toggle('hide', hide);
    }

    function themeOnTop(currentSlide, previousSlide) {
        let header = document.querySelector('byu-header');
        let footer = document.querySelector('byu-footer');

        let themeOnTop = currentSlide && currentSlide.hasAttribute('theme-on-top');
        let wasThemeOnTop = previousSlide && previousSlide.hasAttribute('theme-on-top');

        if (themeOnTop && wasThemeOnTop || !themeOnTop && !wasThemeOnTop) {
            return;
        }
        
        if (themeOnTop) {
            header.style.zIndex = '1000';
            footer.style.zIndex = '1000';
        } else {
            header.style.zIndex = null;
            footer.style.zIndex = null;
        }
    }

    function showHideThemeParts(currentSlide, previousSlide) {
        let showFullTheme = currentSlide && currentSlide.hasAttribute('show-theme-parts');
        let wasShowFullTheme = previousSlide && previousSlide.hasAttribute('show-theme-parts');


        if (!showFullTheme && !wasShowFullTheme) return;
        if (showFullTheme && wasShowFullTheme) return;

        let header = document.querySelector('byu-header');
        let footer = document.querySelector('byu-footer');
        if (showFullTheme && !wasShowFullTheme) {
            stampParts(header, parts.header);
            stampParts(footer, parts.footer);
        } else {
            document.querySelectorAll('.full-theme-part').forEach(it => {
                it.parentElement.removeChild(it);
            });
        }
    }

    function stampParts(target, parts) {
        parts.forEach(part => {
            let t = document.querySelector('#theme-part-' + part);
            for (let kid of t.content.children) {
                kid.classList.add('full-theme-part')
            }
            let clone = document.importNode(t.content, true);
            // clone.classList.add('full-theme-part')
            target.appendChild(clone);
        });
    }
})();