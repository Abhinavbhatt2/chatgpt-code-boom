document.addEventListener("DOMContentLoaded", () => {
    // Function to animate numbers
    const animateValue = (element, start, end, duration, suffix) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * (end - start) + start);
            element.innerHTML = currentValue + suffix;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Intersection Observer to trigger the animation
    const statsSection = document.querySelector("#stats");
    const numbers = document.querySelectorAll(".stat-number");
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                numbers.forEach(numberEl => {
                    const goal = parseInt(numberEl.dataset.goal);
                    const suffix = numberEl.innerText.replace(/[0-9]/g, ''); // Get suffix like '+' or '%'
                    
                    // Reset to 0 to restart animation if user scrolls up and down
                    numberEl.innerHTML = "0" + suffix; 
                    
                    animateValue(numberEl, 0, goal, 2000, suffix);
                });
                // Unobserve after animating to prevent re-triggering
                observer.unobserve(statsSection);
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the section is visible
    });

    if (statsSection) {
        observer.observe(statsSection);
    }
});
