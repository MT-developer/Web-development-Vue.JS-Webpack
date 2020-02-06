let classes = {
    menu: [
        {
            topic: 'math',
            location: 'colindale',
            price: 80,
            length: "120",
            time: "9:00",
            reviewStars: "3"
        },
        {
            topic: 'math',
            location: 'brent cross',
            price: 90,
            length: "70",
            time: "11:00",
            reviewStars: "4"
        },
        {
            topic: 'math',
            location: 'golders green',
            price: 120,
            length: "30",
            time: "14:00",
            reviewStars: "1"
        },
        {
            topic: 'english',
            location: 'hendon',
            price: 110,
            length: "45",
            time: "13:00",
            reviewStars: "2"
        },
        {
            topic: 'english',
            location: 'colindale',
            price: 90,
            length: "75",
            time: "11:00",
            reviewStars: "4"
        },
        {
            topic: 'english',
            location: 'brent cross',
            price: 90,
            length: "100",
            time: "17:00",
            reviewStars: "2"
        },
        {
            topic: 'english',
            location: 'golders green',
            price: 130,
            length: "90",
            time: "15:00",
            reviewStars: "3"
        },
        {
            topic: 'piano',
            location: 'hendon',
            price: 120,
            length: "",
            time: "50",
            time: "13:00",
            reviewStars: "4"
        },
        {
            topic: 'piano',
            location: 'golders green',
            price: 140,
            length: "40",
            time: "12:00",
            reviewStars: "1"
        }
    ],
    input: {
        topic: '',
        location: 'All',
        topics: 'All',
        price: 'All',
        reviews: 'All',
        Sort: ""
    },
    newAry: [],
    otherAry: [],
    filterText: null,
    sortArray: ["Price(High to Low)", "Price(Low to High)", "Topic (Descending)", "Topic (Ascending)", "Review(High to Low)", "Review(Low to High)"],
    loginStates: false,
    regState: false,
    admin: false,
    loggedUser: '',
    clickedClassTopic: '',
    clickedClassLocation: '',
    clickedClassPrice: '',
    clickedClassProvider: ''
};

var vueapp = new Vue({
    el: '#app',
    data:
    classes,

    mounted: async function () {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const data = await fetch('http://localhost:4000/classes', options);
        const dataRes = await data.json();
        console.log(dataRes);
        classes.menu = dataRes;
        newAry = classes;


    },
    methods: {
        saveClickedClass: async function () {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            var data = {}
        },

        getClassByID: async function (classID) {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const data = await fetch('http://localhost:4000/classes/' + classID, options);
            const dataRes = await data.json();
            console.log(dataRes.review);
        },

        getClassesByProvider: async function (providerName) {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const data = await fetch('http://localhost:4000/classes/provider/' + providerName, options);
            const dataRes = await data.json();
            console.log(dataRes);
            menu = dataRes;
        },

        getReviewByUser: async function (providerName) {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const data = await fetch('http://localhost:4000/classes/reviews/' + providerName, options);
            const dataRes = await data.json();
            console.log(dataRes);
            menu = dataRes;
        },

        getClasses: async function () {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const data = await fetch('http://localhost:4000/classes', options);
            const dataRes = await data.json();
            console.log(dataRes);
            menu = dataRes;
        },

        regButton: function () {
            regState = true;
        },

        register: async function (regEmail, regPassword, regType) {
            const data = {
                email: regEmail,
                password: regPassword,
                type: regType
            };
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };
            const regRes = await fetch('http://localhost:4000/user/register', options);
            const regResData = await regRes.json()
            console.log(regResData)
            if (regResData.status === 'success') {
                this.regState = false;
            }
        },

        login: async function (loginEmail, loginPassword, loginType) {

            const data = {
                email: loginEmail,
                password: loginPassword,
                type: loginType
            };
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };

            const response = await fetch('http://localhost:4000/user/login', options);
            const resData = await response.json();
            if (resData.status === 'success') {
                localStorage.setItem("userEmail", resData.email);
                localStorage.setItem("userType", resData.type);
                this.loginStates = true;
                this.loggedUser = resData.email
                localStorage.setItem("loginState", this.loginStates);
                if(resData.type === 'Provider') {
                    this.admin = true
                }
            }
            console.log(resData);
        },

        createClass: async function (addTopic, addPrice, addLocation, addProvider, addAuthor) {
            const data = {
                topic: addTopic,
                price: addPrice,
                location: addLocation,
                provider: addProvider,
                author: addAuthor
            };
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };
            const response = await fetch('http://localhost:4000/classes/add', options)
            const resData = await response.json();

        },

        modifyClass: async function (modId, modTopic, modPrice, modLocation, modProvider, modAuthor) {
            const data = {
                id: modId,
                topic: modTopic,
                price: modPrice,
                location: modLocation,
                provider: modProvider,
                author: modAuthor
            };
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };
            const response = await fetch('http://localhost:4000/classes/update', options);
            const resData = await response.json();

        },

        logout: async function () {
            this.loginStates = false;
            await localStorage.setItem("loginState", this.loginStates);
            localStorage.setItem("userEmail", "");
            localStorage.setItem("userType", "");

            localStorage.clear()

            this.loginStates = false;
            this.regState = false;
            this.admin = false;
            this.loggedUser = '';
            this.clickedClassTopic = '';
            this.clickedClassLocation = '';
            this.clickedClassPrice = '';
            this.clickedClassProvider = '';
        },
    },
    computed: {
        menuArrayReview() {
            let vm = this
            let array = new Set()
            vm.menu.forEach(function (item) {
                array.add(item.reviewStars)
            })
            console.log(array)
            return vm.newAry = Array.from(array)

        },
        menuArrayTopic() {
            let vm = this
            let array = new Set()
            vm.menu.forEach(function (item) {
                array.add(item.topic)
            })
            console.log(array)
            return vm.newAry = Array.from(array)

        },
        menuArrayPrice() {
            let vm = this
            let array = new Set()
            vm.menu.forEach(function (item) {
                array.add(item.price)
            })
            console.log(array)
            return vm.newAry = Array.from(array)

        },


        filterAry() {
            let vm = this
            if (vm.input.sort === "All") {
                return 0;
            }
            if (vm.input.sort === "Price(High to Low)") {
                vm.menu.sort(function (a, b) {
                    if (a.price < b.price) {
                        return 1;
                    }
                    if (a.price > b.price) {
                        return -1;
                    }
                    return 0;
                })
            }
            if (vm.input.sort === "Price(Low to High)") {
                vm.menu.sort(function (a, b) {
                    if (a.price < b.price) {
                        return -1;
                    }
                    if (a.price > b.price) {
                        return 1;
                    }
                    return 0;
                })
            }
            if (vm.input.sort === "Topic (Descending)") {
                vm.menu.sort(function (a, b) {
                    if (a.topic < b.topic) {
                        return 1;
                    }
                    if (a.topic > b.topic) {
                        return -1;
                    }
                    return 0;
                })
            }
            if (vm.input.sort === "Topic (Ascending)") {
                vm.menu.sort(function (a, b) {
                    if (a.topic < b.topic) {
                        return -1;
                    }
                    if (a.topic > b.topic) {
                        return 1;
                    }
                    return 0;
                })
            }
            if (vm.input.sort === "Review(High to Low)") {
                vm.menu.sort(function (a, b) {
                    if (a.reviewStars < b.reviewStars) {
                        return 1;
                    }
                    if (a.reviewStars > b.reviewStars) {
                        return -1;
                    }
                    return 0;
                })
            }
            if (vm.input.sort === "Review(Low to High)") {
                vm.menu.sort(function (a, b) {
                    if (a.reviewStars < b.reviewStars) {
                        return -1;
                    }
                    if (a.reviewStars > b.reviewStars) {
                        return 1;
                    }
                    return 0;
                })
            }

            return vm.menu.filter(function (value) {
                if (vm.input.topics.length && vm.input.topics != "All" && value.topic != vm.input.topics) return false
                if (vm.input.reviews.length && vm.input.reviews != "All" && value.reviewStars != vm.input.reviews) return false
                if (vm.input.price && vm.input.price != "All" && value.price != vm.input.price) return false
                if (vm.input.topic.length) {
                    return value.topic.indexOf(vm.input.topic) > -1
                }
                return true
            })

        },

    }
});


if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/scripts/sw.js')
}

var button = document.getElementById("testButton");
button.addEventListener('click', function(e) {
    Notification.requestPermission().then(function(result) {
        if(result === 'granted') {
            randomNotification();
        }
    });
});

function randomNotification() {
    var randomItem = Math.floor(Math.random()*games.length);
    var notifTitle = games[randomItem].name;
    var notifBody = 'Created by '+games[randomItem].author+'.';
    var notifImg = 'data/img/'+games[randomItem].slug+'.jpg';
    var options = {
        body: notifBody,
        icon: notifImg
    }
    var notif = new Notification(notifTitle, options);
    setTimeout(randomNotification, 30000);
}

