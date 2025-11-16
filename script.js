const burger=document.getElementById('burger-menu');
        const nav=document.querySelector('nav');
        const overlay=document.getElementById('overlay');
        burger.addEventListener('click',()=>{
            nav.classList.toggle('show');
            burger.classList.toggle('active');
            overlay.classList.toggle('active');
        });