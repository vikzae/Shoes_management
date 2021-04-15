let url = 'https://shoes-accce-default-rtdb.europe-west1.firebasedatabase.app/shoes.json';

let router = Sammy('#main', function() {
    this.use('Handlebars', 'hbs');
    
    this.get('/home', function(context) {  
        let user = JSON.parse(localStorage.getItem('userInfo'));
        
        if(user) {
            context.email = user.email;
            context.logedIn = true;
            context.notlogin = false;
        } else {
            context.notlogin = true;
        }

            fetch(url)
            .then((res) => res.json())
            .then((data) => {
                context.shoes = data
            })
            .then(() => {
                context.loadPartials({
                    'header': './templates/header.hbs',
                    'footer': './templates/footer.hbs',
                }).then(function () {
                    this.partial('./templates/home.hbs');
                }); 
            })
            .catch((err) =>{})
    });

    this.get('/register', function(context) {
        context.loadPartials({
            'header': './templates/header.hbs',
            'footer': './templates/footer.hbs'
        }).then(function () {
            this.partial('./templates/register.hbs');
        });
    });

    this.get('/login' , function(context) {
        context.loadPartials({
            'header': './templates/header.hbs',
            'footer': './templates/footer.hbs'
        }).then(function () {
            this.partial('./templates/login.hbs');
        });
    })
    
    this.get('/logout', function(context) {
        logout(context);
    })

    this.get('/create', function(context) {
        creatingShoes(context)
    });

    this.get('/info' , function(context) {
        loadInfoShoes(context)
    });

    this.get('/edit' , function(context) {
        editShoe(context)
    })
    
    this.get('/delete' , function(context) {
        deleteShoes(context)
    })
    
    this.post('/edit', function(context) {
        edit(context)
    })

    this.post('/register', function(context) {
        register(context);
    })

    this.post('/login', function(context) {
        login(context);
    })

    this.post('/create', function(context) {
        createNewOffer(context)
    })
})

router.run('/home');

