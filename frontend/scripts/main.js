Vue.component('modal', {
    template: '#modal-template'
})


let classes = {
    menu: [{
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
    sortArray: ["Price(High to Low)", "Price(Low to High)", "Topic (Descending)", "Topic (Ascending)", "Review(High to Low)", "Review(Low to High)"]
};


var main = new Vue({
    el: '#app',
    data: {
        loginButtonText: "Login/Register",
        username: "",
        password: "",
        regUsername: "",
        regEmail: "",
        regPassword: "",
        showModal: false
    },
    methods: {
        get_login_state : function () {
            console.log('get');
            return localStorage.getItem( 'loginState' );
        }
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
        isLoggedIn() {
            if (localStorage.getItem("loggedUser") === "true") {
                return true;
            } else {
                return false
            }
        },
        mounted: function () {
            newAry = classes;
        }
    }
})

