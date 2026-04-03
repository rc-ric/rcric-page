document.addEventListener("DOMContentLoaded", () => {
    // Mobile Menu Toggle
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const openMenu = () => { 
        menuBtn?.classList.add("open"); 
        mobileMenu?.classList.add("open"); 
        document.body.style.overflow = "hidden"; 
    };
    const closeMenu = () => { 
        menuBtn?.classList.remove("open"); 
        mobileMenu?.classList.remove("open"); 
        document.body.style.overflow = ""; 
    };
    
    if (menuBtn) menuBtn.addEventListener("click", () => mobileMenu?.classList.contains("open") ? closeMenu() : openMenu());
    
    const closeX = mobileMenu?.querySelector(".mobile-menu-close");
    if (closeX) closeX.addEventListener("click", closeMenu);
    
    if (mobileMenu) {
        mobileMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));
    }

    // Session Toggle Logic
    const btn25 = document.getElementById("session-btn-25");
    const btn26 = document.getElementById("session-btn-26");
    const execNames = document.querySelectorAll(".exec-name");

    const resetButtonStyle = (btn) => {
        if (!btn) return;
        btn.classList.remove("active", "!text-white", "btn-active", "nav-btn-join");
        btn.classList.add("bg-white/5", "text-white/40", "border-white/10");
        btn.style.cssText = "";
    };

    const activateButtonStyle = (btn) => {
        if (!btn) return;
        btn.classList.add("active", "!text-white", "btn-active", "nav-btn-join");
        btn.classList.remove("bg-white/5", "text-white/40", "border-white/10");
        setTimeout(() => {
            btn.style.cssText = `
                background: linear-gradient(135deg, rgba(192, 132, 252, 1), rgba(147, 51, 234, 1)) !important;
                border-color: rgba(255, 255, 255, 0.8) !important;
                transform: translateY(-3px) scale(1.02) !important;
                box-shadow: 0 12px 30px rgba(147, 51, 234, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.4) !important;
                color: white !important;
            `;
        }, 10);
    };

    const updateSession = (session) => {
        if (!btn25 || !btn26) return;
        
        if (session === "25") {
            resetButtonStyle(btn26);
            activateButtonStyle(btn25);
        } else {
            resetButtonStyle(btn25);
            activateButtonStyle(btn26);
        }

        execNames.forEach(el => {
            el.style.opacity = "0";
            setTimeout(() => {
                if (session === "25") {
                    el.textContent = el.getAttribute("data-name");
                } else {
                    el.textContent = "[ VACANT ]";
                }
                el.style.opacity = "1";
            }, 300);
        });
    };

    if (btn25) btn25.addEventListener("click", () => updateSession("25"));
    if (btn26) btn26.addEventListener("click", () => updateSession("26"));

    // Initial state
    updateSession("25");

    // Scroll reveal
    const revealEls = document.querySelectorAll(".stagger-children, .fade-in-up");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { 
            if (entry.isIntersecting) { 
                entry.target.classList.add("in-view"); 
                observer.unobserve(entry.target); 
            } 
        });
    }, { threshold: 0.1 });
    revealEls.forEach(el => observer.observe(el));

    // Footer reveal
    const footerGlass = document.querySelector(".footer-glass");
    if (footerGlass) {
        const fObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => { 
                if (entry.isIntersecting) { 
                    footerGlass.classList.add("in-view"); 
                    fObs.unobserve(footerGlass); 
                } 
            });
        }, { threshold: 0.1 });
        fObs.observe(footerGlass);
    }
});
