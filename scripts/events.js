let main = document.getElementById('main');
    
        main.addEventListener('click',function(e) {
            
            if (e.target.parentNode.className == 'shoe' && e.target.tagName == 'A') {
                window.id = e.target.id
            }
        })

