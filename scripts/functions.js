function register(context) {
    let email = context.target[0].value;
    let password = context.target[1].value;
    let rePassword = context.target[2].value;

    if (password !== rePassword) {
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            let email = user.user.email;
            let uid = user.user.uid;

            localStorage.setItem('userInfo', JSON.stringify({ uid, email }));
            context.redirect('/home');
        })
        .catch((error) => {
            console.log(error);
        })
}

function login(context) {
    let email = context.target[0].value;
    let password = context.target[1].value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            let email = user.user.email;
            let uid = user.user.uid;

            localStorage.setItem('userInfo', JSON.stringify({ uid, email }));
            context.redirect('/home');
        })
        .catch((err) => { console.log(err); })
}

function logout(context) {
    firebase.auth().signOut()
        .then((response) => {
            localStorage.removeItem('userInfo');
            context.redirect('/home');
        })
        .catch((error) => { console.log(error); })
}

function createNewOffer(context) {
    let shoesName = context.target[0].value;
    let shoesPrice = context.target[1].value;
    let shoesImg = context.target[2].value;
    let shoesDescription = context.target[3].value;
    let shoesBrand = context.target[4].value;
    let shoesUser = JSON.parse(localStorage.getItem('userInfo'))
    
    if (shoesName === '' || shoesPrice === '' || shoesImg === '' || shoesDescription === '' || shoesBrand === '') {
        console.log('sorry');
        return
    }
    fetch(url, {
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ shoesName, shoesPrice, shoesDescription, shoesImg, shoesBrand,shoesUser})
    })
        .then((res) => {
            context.redirect('/home');
        }).catch((err) => {console.log(err)})
}

function loadInfoShoes(context) {
    fetch(`https://shoes-accce-default-rtdb.europe-west1.firebasedatabase.app/shoes/${window.id}.json`)
    .then((response) => response.json())
    .then((data) => {
        context.user = data.shoesUser
        context.shoesBrand = data.shoesBrand
        context.shoesDescription = data.shoesDescription
        context.shoesImg = data.shoesImg
        context.shoesName = data.shoesName
        context.shoesPrice = data.shoesPrice
    })
    .then(() => {
        let localeUser = JSON.parse(localStorage.getItem('userInfo'));

        if (context.user.uid == localeUser.uid) {
            context.isCreator = true
        } else {
            context.isCreator = false
        }

        if(localeUser) {
            context.email = localeUser.email;
            context.logedIn = true;
            context.notlogin = false;
        } else {
            context.notlogin = true;
        }
        
        context.loadPartials({
        'header': './templates/header.hbs',
        'footer': './templates/footer.hbs'
    })
        .then(function () {
            this.partial('./templates/info.hbs');
        })
    
})
    .catch((err) => { console.log(err)})
    
}
function editShoe(context) {
    fetch(`https://shoes-accce-default-rtdb.europe-west1.firebasedatabase.app/shoes/${window.id}.json`)
    .then((response) => response.json())
    .then((data) => {
        context.user = data.shoesUser
        context.shoesBrand = data.shoesBrand
        context.shoesDescription = data.shoesDescription
        context.shoesImg = data.shoesImg
        context.shoesName = data.shoesName
        context.shoesPrice = data.shoesPrice
        
    })
    .then(() => {
        let user = JSON.parse(localStorage.getItem('userInfo'));
        
        if(user) {
            context.email = user.email;
            context.logedIn = true;
            context.notlogin = false;
        } else {
            context.notlogin = true;
        }
        
        context.loadPartials({
            'header': './templates/header.hbs',
            'footer': './templates/footer.hbs'
        }).then(function () {
            this.partial('./templates/edit.hbs');
        });
    })
}

function edit(context) {
    console.log(context);
    let shoesName = context.target[0].value;
    let shoesPrice = context.target[1].value;
    let shoesImg = context.target[2].value;
    let shoesDescription = context.target[3].value;
    let shoesBrand = context.target[4].value;
    
    fetch(`https://shoes-accce-default-rtdb.europe-west1.firebasedatabase.app/shoes/${window.id}.json`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({shoesName, shoesPrice,shoesImg,shoesDescription, shoesBrand})
    })
    .then((response) => {
        context.redirect('/home');
    })
    .catch((err) => {console.log(err);})
}

function deleteShoes(context) {

    fetch(`https://shoes-accce-default-rtdb.europe-west1.firebasedatabase.app/shoes/${window.id}.json`,{
        headers: {
            'content-type': 'application/json'
        },
        method:'DELETE'
    })
    .then(res => res.json())
    .then(res => context.redirect('/home'))
    .catch(err => {console.log(err);})
}

function creatingShoes(context) {
    let user = JSON.parse(localStorage.getItem('userInfo'));
        
        if(user) {
            context.email = user.email;
            context.logedIn = true;
            context.notlogin = false;
        } else {
            context.notlogin = true;
        }

        context.loadPartials({
            'header': './templates/header.hbs',
            'footer': './templates/footer.hbs'
        }).then(function () {
            this.partial('./templates/createOffer.hbs');
        });
    };

    function buy() {
        document.getElementById('bought').style.display = 'inline-block';
    }